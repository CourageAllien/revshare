import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getBookings, updateBooking, Booking } from "@/lib/storage";
import { generatePersonalizedReminderEmail } from "@/lib/claude";
import { parseISO, differenceInHours, differenceInMinutes, format } from "date-fns";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "couragealison1@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Convert time string like "10:00 AM" to hours and minutes
function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  
  return { hours, minutes };
}

// Get the full meeting datetime
function getMeetingDateTime(booking: Booking): Date {
  const date = parseISO(booking.date);
  const { hours, minutes } = parseTime(booking.time);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

async function sendReminderEmail(
  booking: Booking,
  type: "one-day" | "two-hours" | "thirty-min"
): Promise<boolean> {
  try {
    const formattedDate = format(parseISO(booking.date), "EEEE, MMMM d, yyyy");
    
    let emailContent: { subject: string; html: string };
    
    // If we have AI research, generate personalized email
    if (booking.research && booking.personalizedHook) {
      try {
        emailContent = await generatePersonalizedReminderEmail(
          type,
          booking.name,
          formattedDate,
          booking.time,
          booking.research,
          booking.personalizedHook
        );
      } catch (aiError) {
        console.error("AI email generation failed, using fallback:", aiError);
        emailContent = getFallbackReminderEmail(type, booking.name, formattedDate, booking.time);
      }
    } else {
      emailContent = getFallbackReminderEmail(type, booking.name, formattedDate, booking.time);
    }

    await transporter.sendMail({
      from: `"RevShare" <${process.env.EMAIL_USER || "couragealison1@gmail.com"}>`,
      to: booking.email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log(`Sent ${type} reminder to ${booking.email}`);
    return true;
  } catch (error) {
    console.error(`Error sending ${type} reminder:`, error);
    return false;
  }
}

function getFallbackReminderEmail(
  type: "one-day" | "two-hours" | "thirty-min",
  name: string,
  date: string,
  time: string
): { subject: string; html: string } {
  const firstName = name.split(" ")[0];
  
  const content = {
    "one-day": {
      subject: `Tomorrow: Your strategy call with RevShare`,
      body: `Hey ${firstName}! 👋<br><br>Just a friendly reminder that we have our strategy call scheduled for <strong>tomorrow at ${time}</strong>.<br><br>I've been reviewing your business and I'm genuinely excited to chat. Come prepared to share a bit about your offer and ideal clients – the more specific you can be, the more valuable our conversation will be.<br><br>Talk soon!<br><br>– The RevShare Team`,
    },
    "two-hours": {
      subject: `In 2 hours: Strategy call with RevShare`,
      body: `Hey ${firstName}!<br><br>Our call is coming up at <strong>${time}</strong>. Quick checklist:<br><br>✓ Quiet space with good internet<br>✓ Know your average deal size<br>✓ Have 1-2 case studies in mind<br>✓ Ready to describe your ideal client<br><br>Remember: this isn't a sales pitch. We're here to honestly assess if cold email makes sense for your business.<br><br>See you soon! 🚀`,
    },
    "thirty-min": {
      subject: `Starting in 30 mins! 🚀`,
      body: `Hey ${firstName}!<br><br>We're about to connect in <strong>30 minutes</strong> at ${time}.<br><br>Get ready to dive into your pipeline strategy! The meeting link should be in your calendar. If not, just reply to this email.<br><br>Let's make this call count. 💪`,
    },
  };

  const emailData = content[type];
  
  return {
    subject: emailData.subject,
    html: `
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
          <tr>
            <td style="padding-bottom: 30px;">
              <span style="font-size: 24px; font-weight: bold; color: #ffffff;">REV<span style="color: #3b82f6;">SHARE</span></span>
            </td>
          </tr>
          <tr>
            <td style="background-color: #111113; border-radius: 16px; padding: 40px; border: 1px solid #27272a;">
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.8; margin: 0;">
                ${emailData.body}
              </p>
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; margin-top: 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color: #71717a; font-size: 14px; padding: 8px 0;">Date:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right;">${date}</td>
                  </tr>
                  <tr>
                    <td style="color: #71717a; font-size: 14px; padding: 8px 0;">Time:</td>
                    <td style="color: #ffffff; font-size: 14px; padding: 8px 0; text-align: right;">${time} (EST)</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 30px; text-align: center;">
              <p style="color: #71717a; font-size: 14px; margin: 0;">
                Questions? Just reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron (in production)
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await getBookings();
    const now = new Date();
    const results = {
      processed: 0,
      oneDayReminders: 0,
      twoHourReminders: 0,
      thirtyMinReminders: 0,
      errors: 0,
    };

    for (const booking of bookings) {
      const meetingTime = getMeetingDateTime(booking);
      const hoursUntilMeeting = differenceInHours(meetingTime, now);
      const minutesUntilMeeting = differenceInMinutes(meetingTime, now);

      // Skip past meetings
      if (minutesUntilMeeting < 0) continue;

      results.processed++;

      // 1-day reminder (20-28 hours before)
      if (
        !booking.oneDayReminderSent &&
        hoursUntilMeeting >= 20 &&
        hoursUntilMeeting <= 28
      ) {
        const success = await sendReminderEmail(booking, "one-day");
        if (success) {
          await updateBooking(booking.id, { oneDayReminderSent: true });
          results.oneDayReminders++;
        } else {
          results.errors++;
        }
      }

      // 2-hour reminder (90-150 minutes before)
      if (
        !booking.twoHourReminderSent &&
        minutesUntilMeeting >= 90 &&
        minutesUntilMeeting <= 150
      ) {
        const success = await sendReminderEmail(booking, "two-hours");
        if (success) {
          await updateBooking(booking.id, { twoHourReminderSent: true });
          results.twoHourReminders++;
        } else {
          results.errors++;
        }
      }

      // 30-min reminder (20-45 minutes before)
      if (
        !booking.thirtyMinReminderSent &&
        minutesUntilMeeting >= 20 &&
        minutesUntilMeeting <= 45
      ) {
        const success = await sendReminderEmail(booking, "thirty-min");
        if (success) {
          await updateBooking(booking.id, { thirtyMinReminderSent: true });
          results.thirtyMinReminders++;
        } else {
          results.errors++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Reminder check complete",
      results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: "Failed to process reminders" },
      { status: 500 }
    );
  }
}
