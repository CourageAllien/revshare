import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { format, parseISO } from "date-fns";
import { addBooking, getBookings, Booking } from "@/lib/storage";
import { researchCompanyAndGenerateContent } from "@/lib/claude";

// Email configuration - uses environment variables
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
    const { name, email, website, dealSize, currentChallenge, date, time } = body;

    // Validate required fields
    if (!name || !email || !website || !dealSize || !currentChallenge || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format date for display
    const formattedDate = format(parseISO(date), "EEEE, MMMM d, yyyy");

    // Generate AI research and playbook
    let research, personalizedHook, valueProposition, playbook;
    try {
      console.log("Generating AI research for:", website);
      const aiContent = await researchCompanyAndGenerateContent(
        website,
        dealSize,
        currentChallenge
      );
      research = aiContent.research;
      personalizedHook = aiContent.personalizedHook;
      valueProposition = aiContent.valueProposition;
      playbook = aiContent.playbook;
      console.log("AI research completed for:", research.companyName);
    } catch (aiError) {
      console.error("AI research failed, continuing without personalization:", aiError);
      // Continue without AI content if it fails
    }

    // Create booking
    const booking: Booking = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      website,
      dealSize,
      currentChallenge,
      date,
      time,
      createdAt: new Date().toISOString(),
      research,
      personalizedHook,
      valueProposition,
      playbook,
      confirmationSent: false,
      oneDayReminderSent: false,
      twoHourReminderSent: false,
      thirtyMinReminderSent: false,
    };

    // Save booking to persistent storage
    await addBooking(booking);

    // Send confirmation email with playbook
    try {
      const companyName = research?.companyName || "your company";
      
      await transporter.sendMail({
        from: `"RevShare" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
        to: email,
        subject: `You're confirmed! Strategy call on ${formattedDate} + Your Custom Playbook`,
        html: generateConfirmationEmail(name, formattedDate, time, companyName, personalizedHook),
        attachments: playbook ? [
          {
            filename: `RevShare_Playbook_${companyName.replace(/\s+/g, '_')}.html`,
            content: playbook,
            contentType: 'text/html',
          }
        ] : undefined,
      });

      // Also send notification to your email
      await transporter.sendMail({
        from: `"RevShare Bookings" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
        to: process.env.EMAIL_USER || "couragealison1@gmail.com",
        subject: `New Booking: ${name} from ${companyName}`,
        html: generateAdminNotificationEmail(name, email, website, dealSize, currentChallenge, formattedDate, time, research),
        attachments: playbook ? [
          {
            filename: `RevShare_Playbook_${companyName.replace(/\s+/g, '_')}.html`,
            content: playbook,
            contentType: 'text/html',
          }
        ] : undefined,
      });

      console.log("Confirmation emails sent successfully");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        date: formattedDate,
        time,
        companyName: research?.companyName,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

function generateConfirmationEmail(
  name: string,
  date: string,
  time: string,
  companyName: string,
  personalizedHook?: string
): string {
  const firstName = name.split(" ")[0];
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a;">
              <!-- Success Icon -->
              <div style="text-align: center; margin-bottom: 24px;">
                <div style="display: inline-block; width: 64px; height: 64px; background-color: rgba(16, 185, 129, 0.1); border-radius: 50%; line-height: 64px; font-size: 32px;">
                  ✓
                </div>
              </div>
              
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 16px 0; text-align: center;">
                You're All Set, ${firstName}! 🎉
              </h1>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
                Your strategy call has been confirmed. I'm excited to learn about 
                ${companyName} and explore how we can help fill your pipeline.
              </p>
              
              ${personalizedHook ? `
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
                <p style="color: #3b82f6; font-size: 16px; font-weight: 500; margin: 0;">
                  "${personalizedHook}"
                </p>
              </div>
              ` : ''}
              
              <!-- Meeting Details Box -->
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">📅 Meeting Details</h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Date:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">${date}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Time:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">${time} (EST)</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #71717a; font-size: 14px;">Duration:</span>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #ffffff; font-size: 14px; font-weight: 500;">15 minutes</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Playbook Callout -->
              <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h3 style="color: #10b981; font-size: 16px; margin: 0 0 8px 0;">🎁 Your Custom Playbook is Attached!</h3>
                <p style="color: #a1a1aa; font-size: 14px; margin: 0; line-height: 1.6;">
                  I've prepared a personalized outbound playbook for ${companyName} including target audience insights, 
                  technographic signals, and <strong style="color: #ffffff;">5 sample cold emails</strong> tailored to your business. 
                  Open the attached HTML file to review it before our call.
                </p>
              </div>
              
              <!-- What to Prepare -->
              <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">Before our call, have ready:</h3>
                <ul style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Review your custom playbook (attached)</li>
                  <li>A clear idea of your ideal client profile</li>
                  <li>1-2 case studies or client results</li>
                  <li>Questions about how revenue-share works</li>
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                Questions? Reply to this email.
              </p>
              <p style="color: #52525b; font-size: 12px; margin: 16px 0 0 0;">
                © ${new Date().getFullYear()} RevShare. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateAdminNotificationEmail(
  name: string,
  email: string,
  website: string,
  dealSize: string,
  challenge: string,
  date: string,
  time: string,
  research?: Booking['research']
): string {
  const companyName = research?.companyName || 'Unknown';
  
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111113; color: #fff; border-radius: 12px;">
  <h2 style="color: #3b82f6; margin-bottom: 20px;">🎉 New Strategy Call Booking</h2>
  
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Name</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Email</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Company</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${companyName}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Website</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;"><a href="${website}" style="color: #3b82f6;" target="_blank">${website}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Deal Size</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${dealSize}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Date</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${date}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Time</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${time} (EST)</td>
    </tr>
  </table>
  
  <div style="margin-top: 20px; padding: 15px; background: #0a0a0a; border-radius: 8px;">
    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">Their Challenge:</h3>
    <p style="color: #a1a1aa; margin: 0; font-size: 14px; line-height: 1.6;">${challenge}</p>
  </div>
  
  ${research ? `
  <div style="margin-top: 20px; padding: 15px; background: #0a0a0a; border-radius: 8px;">
    <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">AI Research Summary:</h3>
    <p style="color: #a1a1aa; margin: 0 0 10px 0; font-size: 14px;">${research.companyDescription}</p>
    <p style="color: #71717a; margin: 0; font-size: 12px;">
      Target Audience Pain Points: ${research.targetAudience.painPoints.slice(0, 3).join(', ')}
    </p>
  </div>
  ` : ''}
  
  <div style="margin-top: 20px; padding: 15px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.2);">
    <p style="margin: 0; color: #3b82f6; font-size: 14px;">
      📎 The custom playbook is attached. Review it before the call!
    </p>
  </div>
</div>
  `;
}

export async function GET() {
  // Return all bookings (for admin purposes)
  const bookings = await getBookings();
  return NextResponse.json({ bookings });
}
