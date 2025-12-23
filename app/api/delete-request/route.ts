import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email notification to support
    await resend.emails.send({
      from: "Wishlist App <onboarding@resend.dev>",
      to: "wishlists.saas@gmail.com",
      subject: "Account Deletion Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d2a26; margin-bottom: 20px;">Account Deletion Request</h2>
          
          <div style="background-color: #faf8f5; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 0; color: #6b6560; font-size: 14px;">Requested by:</p>
            <p style="margin: 8px 0 0 0; color: #2d2a26; font-size: 18px; font-weight: 600;">${email}</p>
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
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send deletion request email:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
