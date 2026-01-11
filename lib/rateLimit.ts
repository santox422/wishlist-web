/**
 * Shared rate limiting utility for Next.js API routes
 * Uses Vercel KV (Redis) for distributed rate limiting across instances
 * Falls back to in-memory store if KV is not available (development only)
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory fallback for development (not suitable for production)
const memoryStore = new Map<string, RateLimitRecord>();

// Lazy load Vercel KV to avoid errors if not installed
async function getKV() {
  if (!process.env.KV_REST_API_URL) {
    return null;
  }

  try {
    // Dynamic import to avoid errors if @vercel/kv is not installed
    const kvModule = await import("@vercel/kv");
    return kvModule.kv || kvModule.default || null;
  } catch {
    // KV not available, will use memory store as fallback
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[RateLimit] @vercel/kv not available in production. Install @vercel/kv and set KV_REST_API_URL environment variable.",
      );
    }
    return null;
  }
}

/**
 * Check and increment rate limit
 * Returns true if within limit, false if exceeded
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<boolean> {
  const now = Date.now();

  const kv = await getKV();
  if (kv) {
    // Use Vercel KV (Redis) for distributed rate limiting
    try {
      const recordKey = `rateLimit:${key}`;
      const record = await kv.get<RateLimitRecord>(recordKey);

      if (!record || now > record.resetTime) {
        // First request or window expired - create new record
        await kv.set(recordKey, {
          count: 1,
          resetTime: now + windowMs,
        });
        // Set expiration to auto-cleanup
        await kv.expire(recordKey, Math.ceil(windowMs / 1000));
        return true;
      }

      if (record.count >= maxRequests) {
        return false; // Rate limit exceeded
      }

      // Increment count
      await kv.set(recordKey, {
        count: record.count + 1,
        resetTime: record.resetTime,
      });
      return true;
    } catch (error) {
      console.error("[RateLimit] KV error, falling back to memory:", error);
      // Fall through to memory store
    }
  }

  // Fallback to in-memory store (development only)
  const record = memoryStore.get(key);

  // Clean up expired entries
  if (record && now > record.resetTime) {
    memoryStore.delete(key);
  }

  const currentRecord = memoryStore.get(key);

  if (!currentRecord) {
    // First request
    memoryStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (currentRecord.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Increment count
  currentRecord.count++;
  return true;
}
