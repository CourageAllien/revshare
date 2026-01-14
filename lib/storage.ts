import { Redis } from "@upstash/redis";

import { CompanyResearch } from "./claude";

export interface Booking {
  id: string;
  name: string;
  email: string;
  website: string;
  dealSize: string;
  currentChallenge: string;
  date: string; // ISO string
  time: string; // e.g., "10:00 AM"
  createdAt: string;
  // AI-generated content
  research?: CompanyResearch;
  personalizedHook?: string;
  valueProposition?: string;
  playbook?: string; // HTML playbook
  // Reminder tracking
  confirmationSent: boolean;
  oneDayReminderSent: boolean;
  twoHourReminderSent: boolean;
  thirtyMinReminderSent: boolean;
}

const BOOKINGS_KEY = "bookings";

// Check if we're in development without Redis configured
const isDev = process.env.NODE_ENV === "development" && !process.env.UPSTASH_REDIS_REST_URL;

// In-memory fallback for development
let devBookings: Booking[] = [];

// Initialize Redis client (only if env vars are available)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export async function getBookings(): Promise<Booking[]> {
  if (isDev || !redis) {
    return devBookings;
  }
  
  try {
    const bookings = await redis.get<Booking[]>(BOOKINGS_KEY);
    return bookings || [];
  } catch (error) {
    console.error("Error getting bookings from Redis:", error);
    return [];
  }
}

export async function addBooking(booking: Booking): Promise<void> {
  if (isDev || !redis) {
    devBookings.push(booking);
    console.log("Dev: Added booking", booking);
    return;
  }
  
  try {
    const bookings = await getBookings();
    bookings.push(booking);
    await redis.set(BOOKINGS_KEY, bookings);
  } catch (error) {
    console.error("Error adding booking to Redis:", error);
    throw error;
  }
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<void> {
  if (isDev || !redis) {
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
      await redis.set(BOOKINGS_KEY, bookings);
    }
  } catch (error) {
    console.error("Error updating booking in Redis:", error);
    throw error;
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings();
  return bookings.find(b => b.id === id) || null;
}
