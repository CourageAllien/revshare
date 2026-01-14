import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  isPersonalEmail,
  extractDomain,
  generateLeadMagnetContent,
  generateLeadMagnetEmailHTML,
  getTodaysLeadMagnet,
} from "@/lib/lead-magnet";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email is provided
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if it's a personal email
    if (isPersonalEmail(email)) {
      return NextResponse.json(
        { error: "Please use your company email address to receive personalized insights." },
        { status: 400 }
      );
    }

    // Extract domain
    const domain = extractDomain(email);
    if (!domain) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get today's topic for the response
    const todaysTopic = getTodaysLeadMagnet();

    // Generate personalized content with Claude
    const content = await generateLeadMagnetContent(email, domain);

    // Generate email HTML
    const emailHtml = generateLeadMagnetEmailHTML(content);

    // Send the email
    await transporter.sendMail({
      from: `"RevShare" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${content.emoji} ${content.title} - Personalized for ${content.companyName}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      companyName: content.companyName,
      topicTitle: todaysTopic.title,
    });
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json(
      { error: "Failed to generate and send your guide. Please try again." },
      { status: 500 }
    );
  }
}
