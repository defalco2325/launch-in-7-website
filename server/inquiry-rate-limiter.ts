import { createHash } from "node:crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export interface InquiryRateLimiter {
  consume(clientIdentifier: string): Promise<boolean>;
}

export const INQUIRY_RATE_LIMIT_MAX_REQUESTS = 3;
export const INQUIRY_RATE_LIMIT_WINDOW_MS = 60_000;

type Clock = () => number;

export class MemoryInquiryRateLimiter implements InquiryRateLimiter {
  private readonly entries = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly now: Clock = Date.now,
    private readonly maxRequests = INQUIRY_RATE_LIMIT_MAX_REQUESTS,
    private readonly windowMs = INQUIRY_RATE_LIMIT_WINDOW_MS,
  ) {}

  async consume(clientIdentifier: string): Promise<boolean> {
    const now = this.now();
    const entry = this.entries.get(clientIdentifier);

    if (!entry || entry.resetAt <= now) {
      this.entries.set(clientIdentifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count += 1;
    return true;
  }

  reset(): void {
    this.entries.clear();
  }
}

export class PostgresInquiryRateLimiter implements InquiryRateLimiter {
  constructor(
    private readonly sql: NeonQueryFunction<false, false>,
    private readonly maxRequests = INQUIRY_RATE_LIMIT_MAX_REQUESTS,
    private readonly windowMs = INQUIRY_RATE_LIMIT_WINDOW_MS,
  ) {}

  async consume(clientIdentifier: string): Promise<boolean> {
    const identifierHash = createHash("sha256")
      .update(clientIdentifier)
      .digest("hex");

    const rows = await this.sql`
      WITH expired_limits AS (
        DELETE FROM inquiry_rate_limits
        WHERE reset_at <= NOW()
      )
      INSERT INTO inquiry_rate_limits (identifier_hash, request_count, reset_at)
      VALUES (
        ${identifierHash},
        1,
        NOW() + (${this.windowMs} * INTERVAL '1 millisecond')
      )
      ON CONFLICT (identifier_hash) DO UPDATE
      SET
        request_count = CASE
          WHEN inquiry_rate_limits.reset_at <= NOW() THEN 1
          ELSE LEAST(
            inquiry_rate_limits.request_count + 1,
            ${this.maxRequests + 1}
          )
        END,
        reset_at = CASE
          WHEN inquiry_rate_limits.reset_at <= NOW()
            THEN NOW() + (${this.windowMs} * INTERVAL '1 millisecond')
          ELSE inquiry_rate_limits.reset_at
        END
      RETURNING request_count <= ${this.maxRequests} AS allowed
    `;

    return rows[0]?.allowed === true;
  }
}

function createProductionRateLimiter(): InquiryRateLimiter {
  const databaseUrl =
    process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "NEON_DATABASE_URL or DATABASE_URL is required for inquiry rate limiting",
    );
  }

  return new PostgresInquiryRateLimiter(neon(databaseUrl));
}

let productionRateLimiter: InquiryRateLimiter | undefined;

export function getProductionInquiryRateLimiter(): InquiryRateLimiter {
  productionRateLimiter ??= createProductionRateLimiter();
  return productionRateLimiter;
}