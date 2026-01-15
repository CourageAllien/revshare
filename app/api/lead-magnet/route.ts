import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  isPersonalEmail,
  extractDomain,
  generateLeadMagnetContent,
  generateLeadMagnetEmailHTML,
  getTodaysLeadMagnet,
} from "@/lib/lead-magnet";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log("Lead magnet request for:", email);

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

    console.log("Extracted domain:", domain);

    // Check environment variables
    if (!process.env.CLAUDE_API_KEY) {
      console.error("CLAUDE_API_KEY is not set");
      return NextResponse.json(
        { error: "Service configuration error. Please try again later." },
        { status: 500 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error("Email credentials not set. EMAIL_USER:", !!process.env.EMAIL_USER, "EMAIL_APP_PASSWORD:", !!process.env.EMAIL_APP_PASSWORD);
      return NextResponse.json(
        { error: "Email service configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // Get today's topic for the response
    const todaysTopic = getTodaysLeadMagnet();
    console.log("Today's topic:", todaysTopic.title);

    // Generate personalized content with Claude
    console.log("Generating content with Claude...");
    const content = await generateLeadMagnetContent(email, domain);
    console.log("Content generated for:", content.companyName);

    // Generate email HTML
    const emailHtml = generateLeadMagnetEmailHTML(content);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Send the email
    console.log("Sending email to:", email);
    await transporter.sendMail({
      from: `"RevShare" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${content.emoji} ${content.title}`,
      html: emailHtml,
    });

    console.log("Email sent successfully to:", email);

    return NextResponse.json({
      success: true,
      companyName: content.companyName,
      topicTitle: todaysTopic.title,
    });
  } catch (error) {
    console.error("Lead magnet error:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json(
      { error: "Failed to generate and send your guide. Please try again." },
      { status: 500 }
    );
  }
}
