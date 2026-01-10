import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting store (in production, use Redis or similar)
// Maps IP/email to { count, resetTime }
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  IP_MAX_REQUESTS: 3, // Max requests per IP per time window
  IP_WINDOW_MS: 60 * 60 * 1000, // 1 hour window for IP
  EMAIL_MAX_REQUESTS: 5, // Max requests per email per time window
  EMAIL_WINDOW_MS: 24 * 60 * 60 * 1000, // 24 hour window for email
};

function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitStore.delete(key);
  }

  const currentRecord = rateLimitStore.get(key);

  if (!currentRecord) {
    // First request
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (currentRecord.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Increment count
  currentRecord.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check IP-based rate limit first
    if (
      !checkRateLimit(
        `ip:${clientIp}`,
        RATE_LIMIT.IP_MAX_REQUESTS,
        RATE_LIMIT.IP_WINDOW_MS,
      )
    ) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check email-based rate limit
    if (
      !checkRateLimit(
        `email:${normalizedEmail}`,
        RATE_LIMIT.EMAIL_MAX_REQUESTS,
        RATE_LIMIT.EMAIL_WINDOW_MS,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "A deletion request for this email has already been submitted recently. Please wait before trying again.",
        },
        { status: 429 },
      );
    }

    // Send email notification to support
    await resend.emails.send({
      from: "Wishlist App <onboarding@resend.dev>",
      to: "wishii.help@gmail.com",
      subject: "Account Deletion Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d2a26; margin-bottom: 20px;">Account Deletion Request</h2>
          
          <div style="background-color: #faf8f5; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 0; color: #6b6560; font-size: 14px;">Requested by:</p>
            <p style="margin: 8px 0 0 0; color: #2d2a26; font-size: 18px; font-weight: 600;">${normalizedEmail}</p>
          </div>
          
          <p style="color: #6b6560; font-size: 14px; line-height: 1.6;">
            A user has requested to delete their account and all associated data. 
            Please process this request within 30 days as per GDPR requirements.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e8e5e0; margin: 24px 0;" />
          
          <p style="color: #999; font-size: 12px;">
            Request submitted: ${new Date().toLocaleString("de-DE", {
              dateStyle: "full",
              timeStyle: "short",
            })}
            <br />
            Request IP: ${clientIp}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send deletion request email:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
