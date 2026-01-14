import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { format, parseISO } from "date-fns";
import { getConfirmationEmail } from "@/lib/email-templates";
import { addBooking, getBookings, Booking } from "@/lib/storage";

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
    const { name, email, company, website, dealSize, currentChallenge, date, time } = body;

    // Validate required fields
    if (!name || !email || !company || !website || !dealSize || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create booking
    const booking: Booking = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      company,
      website,
      dealSize,
      currentChallenge: currentChallenge || "",
      date,
      time,
      createdAt: new Date().toISOString(),
      confirmationSent: false,
      oneDayReminderSent: false,
      twoHourReminderSent: false,
      thirtyMinReminderSent: false,
    };

    // Save booking to persistent storage
    await addBooking(booking);

    // Format date for emails
    const formattedDate = format(parseISO(date), "EEEE, MMMM d, yyyy");

    // Email data
    const emailData = {
      name,
      email,
      company,
      date: formattedDate,
      time,
    };

    // Send confirmation email
    try {
      const confirmationEmail = getConfirmationEmail(emailData);
      
      await transporter.sendMail({
        from: `"RevShare" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
        to: email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
      });

      // Also send notification to your email
      await transporter.sendMail({
        from: `"RevShare Bookings" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
        to: process.env.EMAIL_USER || "couragealison1@gmail.com",
        subject: `New Booking: ${name} from ${company}`,
        html: `
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
                <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${company}</td>
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
                <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #71717a;">Time</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #27272a; color: #fff;">${time} (EST)</td>
              </tr>
              ${currentChallenge ? `
              <tr>
                <td style="padding: 10px 0; color: #71717a; vertical-align: top;">Challenge</td>
                <td style="padding: 10px 0; color: #a1a1aa;">${currentChallenge}</td>
              </tr>
              ` : ''}
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #0a0a0a; border-radius: 8px;">
              <p style="margin: 0; color: #71717a; font-size: 14px;">
                📅 Add this meeting to your calendar and prepare to discuss their offer.
              </p>
            </div>
          </div>
        `,
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

export async function GET() {
  // Return all bookings (for admin purposes)
  const bookings = await getBookings();
  return NextResponse.json({ bookings });
}
