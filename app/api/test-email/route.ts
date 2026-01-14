import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_APP_PASSWORD;
  const claudeKey = process.env.CLAUDE_API_KEY;

  // Check if credentials exist (don't expose actual values)
  const config = {
    EMAIL_USER: emailUser ? `Set (${emailUser.substring(0, 5)}...)` : "NOT SET",
    EMAIL_APP_PASSWORD: emailPass ? `Set (${emailPass.length} chars)` : "NOT SET",
    CLAUDE_API_KEY: claudeKey ? `Set (${claudeKey.substring(0, 15)}...)` : "NOT SET",
  };

  // Try to send a test email
  if (!emailUser || !emailPass) {
    return NextResponse.json({
      config,
      error: "Email credentials not configured",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Verify the connection
    await transporter.verify();

    // Send test email
    await transporter.sendMail({
      from: `"RevShare Test" <${emailUser}>`,
      to: emailUser,
      subject: "✅ RevShare Email Test - Success!",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #3b82f6;">Email Configuration Working! 🎉</h1>
          <p>Your email setup is correct. Emails will now be sent successfully.</p>
          <p>Tested at: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return NextResponse.json({
      config,
      success: true,
      message: "Test email sent successfully! Check your inbox.",
    });
  } catch (error: unknown) {
    const err = error as Error & { code?: string; command?: string };
    return NextResponse.json({
      config,
      error: "Failed to send email",
      details: {
        message: err.message,
        code: err.code,
        command: err.command,
      },
    });
  }
}
