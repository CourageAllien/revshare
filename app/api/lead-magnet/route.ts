import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  isPersonalEmail,
  extractDomain,
  generateLeadMagnetContent,
  generateLeadMagnetEmailHTML,
} from "@/lib/lead-magnet";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "couragealison1@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email exists
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if it's a personal email
    if (isPersonalEmail(email)) {
      return NextResponse.json(
        { 
          error: "Please use your company email address. Personal emails (Gmail, Yahoo, etc.) are not accepted.",
          isPersonalEmail: true 
        },
        { status: 400 }
      );
    }

    // Extract domain
    const domain = extractDomain(email);
    if (!domain) {
      return NextResponse.json(
        { error: "Invalid email domain" },
        { status: 400 }
      );
    }

    console.log(`Generating lead magnet for: ${email} (domain: ${domain})`);

    // Generate personalized content using AI
    const content = await generateLeadMagnetContent(email, domain);
    
    console.log(`Generated content for: ${content.companyName}`);

    // Generate email HTML
    const emailHTML = generateLeadMagnetEmailHTML(content);

    // Send the email
    await transporter.sendMail({
      from: `"RevShare" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
      to: email,
      subject: `🎯 5 Signs ${content.companyName} is Ready for Cold Email`,
      html: emailHTML,
    });

    // Also notify yourself
    await transporter.sendMail({
      from: `"RevShare Leads" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
      to: process.env.EMAIL_USER || "couragealison1@gmail.com",
      subject: `New Lead Magnet Download: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Lead Magnet Download</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${content.companyName}</p>
          <p><strong>Domain:</strong> ${domain}</p>
          <p><strong>Description:</strong> ${content.companyDescription}</p>
          <hr>
          <p>They received a personalized "5 Signs" guide. Follow up!</p>
        </div>
      `,
    });

    console.log(`Lead magnet sent to: ${email}`);

    return NextResponse.json({
      success: true,
      message: "Guide sent successfully!",
      companyName: content.companyName,
    });
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json(
      { error: "Failed to send guide. Please try again." },
      { status: 500 }
    );
  }
}
