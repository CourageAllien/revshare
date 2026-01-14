import { kv } from "@vercel/kv";

export interface Booking {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  dealSize: string;
  currentChallenge: string;
  date: string; // ISO string
  time: string; // e.g., "10:00 AM"
  createdAt: string;
  // Reminder tracking
  confirmationSent: boolean;
  oneDayReminderSent: boolean;
  twoHourReminderSent: boolean;
  thirtyMinReminderSent: boolean;
}

const BOOKINGS_KEY = "bookings";

// Check if we're in development (no KV available)
const isDev = process.env.NODE_ENV === "development" && !process.env.KV_REST_API_URL;

// In-memory fallback for development
let devBookings: Booking[] = [];

export async function getBookings(): Promise<Booking[]> {
  if (isDev) {
    return devBookings;
  }
  
  try {
    const bookings = await kv.get<Booking[]>(BOOKINGS_KEY);
    return bookings || [];
  } catch (error) {
    console.error("Error getting bookings from KV:", error);
    return [];
  }
}

export async function addBooking(booking: Booking): Promise<void> {
  if (isDev) {
    devBookings.push(booking);
    console.log("Dev: Added booking", booking);
    return;
  }
  
  try {
    const bookings = await getBookings();
    bookings.push(booking);
    await kv.set(BOOKINGS_KEY, bookings);
  } catch (error) {
    console.error("Error adding booking to KV:", error);
    throw error;
  }
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<void> {
  if (isDev) {
    const index = devBookings.findIndex(b => b.id === id);
    if (index !== -1) {
      devBookings[index] = { ...devBookings[index], ...updates };
    }
    return;
  }
  
  try {
    const bookings = await getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates };
      await kv.set(BOOKINGS_KEY, bookings);
    }
  } catch (error) {
    console.error("Error updating booking in KV:", error);
    throw error;
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings();
  return bookings.find(b => b.id === id) || null;
}
