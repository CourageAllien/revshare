import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getOneDayReminderEmail,
  getTwoHourReminderEmail,
  getThirtyMinReminderEmail,
} from "@/lib/email-templates";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "couragealison1@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

// This endpoint can be called by a cron job or manually to send reminder emails
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, company, date, time } = body;

    if (!type || !name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailData = { name, email, company, date, time };

    let emailContent;
    switch (type) {
      case "one-day":
        emailContent = getOneDayReminderEmail(emailData);
        break;
      case "two-hours":
        emailContent = getTwoHourReminderEmail(emailData);
        break;
      case "thirty-min":
        emailContent = getThirtyMinReminderEmail(emailData);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid reminder type" },
          { status: 400 }
        );
    }

    await transporter.sendMail({
      from: `"RevShare" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    return NextResponse.json({ success: true, type });
  } catch (error) {
    console.error("Error sending reminder:", error);
    return NextResponse.json(
      { error: "Failed to send reminder" },
      { status: 500 }
    );
  }
}
