import assert from "node:assert/strict";
import test, { after, before, beforeEach } from "node:test";
import express from "express";
import type { AddressInfo } from "node:net";
import { registerRoutes } from "./routes";
import { MemoryInquiryRateLimiter } from "./inquiry-rate-limiter";
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
let now = 1_000_000;
const inquiryRateLimiter = new MemoryInquiryRateLimiter(() => now);

before(async () => {
  previousApiKey = process.env.SENDGRID_API_KEY;
  process.env.SENDGRID_API_KEY = "test-key";

  const app = express();
  app.set("trust proxy", true);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  server = await registerRoutes(app, {
    clientSubmissionMailService: mailService,
    inquiryRateLimiter,
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
  now = 1_000_000;
  inquiryRateLimiter.reset();
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
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "Too many requests. Please try again later.",
  });
  assert.equal(sentNotifications.length, 3);
});

test("rate limits are isolated between client identifiers", async () => {
  const limitedIp = "203.0.113.45";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    assert.equal((await submit(validPayload, limitedIp)).status, 200);
  }

  assert.equal((await submit(validPayload, limitedIp)).status, 429);
  assert.equal(
    (await submit(validPayload, "203.0.113.46")).status,
    200,
  );
});

test("rate limits expire after the one-minute window", async () => {
  const ip = "203.0.113.47";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    assert.equal((await submit(validPayload, ip)).status, 200);
  }

  assert.equal((await submit(validPayload, ip)).status, 429);
  now += 60_000;
  assert.equal((await submit(validPayload, ip)).status, 200);
});