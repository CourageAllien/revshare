"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, Video, ArrowRight, Mail, ExternalLink, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ZOOM_MEETING } from "@/lib/constants";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "there";
  const date = searchParams.get("date") || "your scheduled date";
  const time = searchParams.get("time") || "your scheduled time";
  const calendarUrl = searchParams.get("calendarUrl") || "";
  
  const [copied, setCopied] = useState(false);

  const copyZoomLink = () => {
    navigator.clipboard.writeText(ZOOM_MEETING.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            You&apos;re All Set, {name.split(" ")[0]}! 🎉
          </h1>

          <p className="text-text-secondary text-lg mb-8">
            Your strategy call has been scheduled. We&apos;re excited to learn about 
            your business and explore how we can help fill your pipeline.
          </p>

          {/* Booking Details Card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 text-left">
            <h2 className="text-white font-semibold mb-4">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-text-muted text-sm">Date</div>
                  <div className="text-white font-medium">{date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-text-muted text-sm">Time</div>
                  <div className="text-white font-medium">{time} (EST)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-text-muted text-sm">Meeting Type</div>
                  <div className="text-white font-medium">15-min Zoom Meeting</div>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom Meeting Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6 text-left">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Zoom Meeting Details
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-text-muted text-sm mb-1">Meeting Link</div>
                <div className="flex items-center gap-2">
                  <a 
                    href={ZOOM_MEETING.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm break-all flex-1"
                  >
                    {ZOOM_MEETING.link}
                  </a>
                  <button
                    onClick={copyZoomLink}
                    className="p-2 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                    title="Copy link"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4 text-text-muted" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div>
                  <div className="text-text-muted text-sm">Meeting ID</div>
                  <div className="text-white font-mono">{ZOOM_MEETING.meetingId}</div>
                </div>
                <div>
                  <div className="text-text-muted text-sm">Passcode</div>
                  <div className="text-white font-mono">{ZOOM_MEETING.passcode}</div>
                </div>
              </div>
            </div>

            <a
              href={ZOOM_MEETING.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Join Zoom Meeting
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Add to Calendar */}
          {calendarUrl && (
            <a
              href={decodeURIComponent(calendarUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 w-full py-3 bg-card border border-border hover:border-primary/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-primary" />
              Add to Google Calendar
            </a>
          )}

          {/* Email Notice */}
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-text-secondary text-sm text-left">
                A confirmation email has been sent to your inbox with all the meeting 
                details. Check your spam folder if you don&apos;t see it.
              </p>
            </div>
          </div>

          {/* What to Prepare */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <h3 className="text-white font-semibold mb-3">Before Our Call</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Have a clear idea of your ideal client profile
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Know your average deal size and sales cycle length
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Be ready to share 1-2 case studies or results
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Think about your current lead gen challenges
              </li>
            </ul>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
