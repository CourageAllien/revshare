import { NextResponse } from "next/server";
import { getTodaysLeadMagnet } from "@/lib/lead-magnet";

export async function GET() {
  const topic = getTodaysLeadMagnet();
  return NextResponse.json(topic);
}
