import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getBookings, updateBooking, Booking } from "@/lib/storage";
import {
  getOneDayReminderEmail,
  getTwoHourReminderEmail,
  getThirtyMinReminderEmail,
} from "@/lib/email-templates";
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
    const emailData = {
      name: booking.name,
      email: booking.email,
      company: booking.company,
      date: format(parseISO(booking.date), "EEEE, MMMM d, yyyy"),
      time: booking.time,
    };

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
