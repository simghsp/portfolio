// In-memory, per-instance rate limiting. This resets whenever the serverless
// function cold-starts and isn't shared across instances, so it's not a hard
// guarantee under real load — but for a low-traffic contact form it stops
// casual abuse/spam scripts without needing an external store (Redis/Upstash)
// just for this. If this form ever sees real abuse, swap this module for
// Upstash's rate limiter — the call site below wouldn't need to change.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const retryAfterMs = WINDOW_MS - (now - timestamps[0]);
    return { ok: false, retryAfterMs };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { ok: true };
}
