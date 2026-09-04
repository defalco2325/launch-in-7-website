import assert from "node:assert/strict";
import test, { after, before, beforeEach } from "node:test";
import express from "express";
import type { AddressInfo } from "node:net";
import {
  registerRoutes,
  resetClientSubmissionRateLimits,
} from "./routes";
import { shouldNavigateToClientSuccess } from "../client/src/lib/client-submission";

const sentNotifications: any[] = [];
const mailService = {
  async send(message: unknown) {
    sentNotifications.push(message);
    return [{} as any, {} as any] as any;
  },
};

let server: Awaited<ReturnType<typeof registerRoutes>>;
let baseUrl: string;
let previousApiKey: string | undefined;

before(async () => {
  previousApiKey = process.env.SENDGRID_API_KEY;
  process.env.SENDGRID_API_KEY = "test-key";

  const app = express();
  app.set("trust proxy", true);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  server = await registerRoutes(app, {
    clientSubmissionMailService: mailService,
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
  if (previousApiKey === undefined) {
    delete process.env.SENDGRID_API_KEY;
  } else {
    process.env.SENDGRID_API_KEY = previousApiKey;
  }
});

beforeEach(() => {
  sentNotifications.length = 0;
  resetClientSubmissionRateLimits();
});

async function submit(
  fields: Record<string, string>,
  ip = "203.0.113.10",
) {
  return fetch(`${baseUrl}/api/clients/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Forwarded-For": ip,
    },
    body: new URLSearchParams(fields),
  });
}

const validPayload = {
  businessName: "Example Systems",
  website: "https://example.com",
  shortDescription: "Connected business services",
  biggestChallenge: "Manual follow-up",
  contactName: "Alex Example",
  email: "alex@example.com",
  phone: "555-0100",
  solutionsInterested: "CRM & Automation Systems, AI Business Tools",
  objectives: "Automate follow-up, Track performance & ROI",
  timeline: "4-8-weeks",
  budget: "growth-4500",
};

test("valid project intake sends every current project field and returns the redirect contract", async () => {
  const response = await submit(validPayload);
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(result, { ok: true });
  assert.equal(sentNotifications.length, 1);

  const notification = sentNotifications[0];
  for (const value of Object.values(validPayload)) {
    assert.match(notification.html, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.equal(shouldNavigateToClientSuccess(response.ok, result), true);
  assert.equal(shouldNavigateToClientSuccess(false, result), false);
  assert.equal(shouldNavigateToClientSuccess(true, { ok: false }), false);
});

test("invalid project intake is rejected without sending a notification", async () => {
  const response = await submit({
    businessName: "Example Systems",
    contactName: "",
    email: "not-an-email",
  });

  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
  assert.equal(sentNotifications.length, 0);
});

test("honeypot submissions are rejected without sending a notification", async () => {
  const response = await submit({ ...validPayload, "bot-field": "spam" });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { ok: false, message: "Invalid request" });
  assert.equal(sentNotifications.length, 0);
});

test("a fourth submission from the same IP is rate limited", async () => {
  const ip = "203.0.113.44";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await submit(validPayload, ip);
    assert.equal(response.status, 200);
  }

  const response = await submit(validPayload, ip);
  assert.equal(response.status, 429);
  assert.equal((await response.json()).ok, false);
  assert.equal(sentNotifications.length, 3);
});