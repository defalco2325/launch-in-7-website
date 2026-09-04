import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import test from "node:test";
import { neon } from "@neondatabase/serverless";
import { PostgresInquiryRateLimiter } from "./inquiry-rate-limiter";

const databaseUrl =
  process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL;

test(
  "PostgreSQL shares, isolates, and expires inquiry rate limits atomically",
  { skip: databaseUrl ? false : "No test database is configured" },
  async () => {
    const sql = neon(databaseUrl!);
    const sharedIdentifier = `rate-limit-test-${randomUUID()}`;
    const isolatedIdentifier = `rate-limit-test-${randomUUID()}`;
    const identifierHashes = [sharedIdentifier, isolatedIdentifier].map(
      (identifier) =>
        createHash("sha256").update(identifier).digest("hex"),
    );
    const windowMs = 2_000;

    try {
      const firstInstance = new PostgresInquiryRateLimiter(sql, 3, windowMs);
      const restartedInstance = new PostgresInquiryRateLimiter(sql, 3, windowMs);

      const concurrentResults = await Promise.all([
        firstInstance.consume(sharedIdentifier),
        firstInstance.consume(sharedIdentifier),
        restartedInstance.consume(sharedIdentifier),
        restartedInstance.consume(sharedIdentifier),
      ]);

      assert.equal(
        concurrentResults.filter(Boolean).length,
        3,
        "exactly three concurrent requests should be accepted",
      );
      assert.equal(
        await firstInstance.consume(isolatedIdentifier),
        true,
        "a distinct identifier should have its own limit",
      );

      await new Promise((resolve) => setTimeout(resolve, windowMs + 100));

      assert.equal(
        await restartedInstance.consume(sharedIdentifier),
        true,
        "a shared limit should reopen after expiry",
      );
    } finally {
      await sql`
        DELETE FROM inquiry_rate_limits
        WHERE identifier_hash = ANY(${identifierHashes})
      `;
    }
  },
);