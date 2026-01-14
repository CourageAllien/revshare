"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Users,
  Target,
  Zap
} from "lucide-react";
import Link from "next/link";
import { format, addDays, startOfWeek, isSameDay, isWeekend, isBefore, startOfDay } from "date-fns";

const benefits = [
  {
    icon: Target,
    text: "Learn how we've booked 340+ meetings for partners",
  },
  {
    icon: Zap,
    text: "Discover if your offer is a fit for cold email",
  },
  {
    icon: Users,
    text: "Get a custom strategy for your specific market",
  },
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    dealSize: "",
    currentChallenge: "",
  });

  // Generate next 14 days for calendar
  const today = startOfDay(new Date());
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i + 1));

  const handleDateSelect = (date: Date) => {
    if (!isWeekend(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate?.toISOString(),
          time: selectedTime,
        }),
      });

      if (response.ok) {
        // Redirect to confirmation page
        window.location.href = `/book/confirmed?name=${encodeURIComponent(formData.name)}&date=${encodeURIComponent(format(selectedDate!, "EEEE, MMMM d, yyyy"))}&time=${encodeURIComponent(selectedTime!)}`;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            REV<span className="text-primary">SHARE</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Sales Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">15-Minute Strategy Call</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Let&apos;s See If We Can Fill Your Pipeline
              </h1>

              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                This isn&apos;t a sales pitch. It&apos;s a real conversation about whether 
                our revenue-share model makes sense for your business. We&apos;ll discuss 
                your offer, your ideal clients, and whether cold email is the right channel.
              </p>

              {/* What you'll get */}
              <div className="space-y-4 mb-8">
                <h3 className="text-white font-semibold">In 15 minutes, you&apos;ll learn:</h3>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-text-secondary">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social proof */}
              <div className="p-6 bg-card border border-border rounded-xl">
                <p className="text-text-secondary italic mb-4">
                  &quot;The call was genuinely helpful. No pressure, just straight talk about 
                  whether this would work for my business. Two weeks later, we had our 
                  first meetings booked.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">EA</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Eunice Alison</div>
                    <div className="text-text-muted text-xs">Co-founder, Zizi</div>
                  </div>
                </div>
              </div>

              {/* Availability note */}
              <div className="mt-6 flex items-center gap-2 text-sm text-text-muted">
                <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
                <span>Only 2 spots left this week</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Booking Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              {step === 1 ? (
                <>
                  {/* Step 1: Select Date & Time */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Select a Date & Time</h2>
                      <p className="text-text-muted text-sm">15 min | Video call</p>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="mb-6">
                    <h3 className="text-white font-medium mb-3">Select a date</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center text-text-muted text-xs py-2">
                          {day}
                        </div>
                      ))}
                      {days.map((day, index) => {
                        const isDisabled = isWeekend(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        
                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day)}
                            disabled={isDisabled}
                            className={`
                              py-3 rounded-lg text-sm font-medium transition-all
                              ${isDisabled 
                                ? "text-text-muted/50 cursor-not-allowed" 
                                : isSelected
                                  ? "bg-primary text-white"
                                  : "bg-background border border-border text-white hover:border-primary/50"
                              }
                            `}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white font-medium mb-3">
                        Available times for {format(selectedDate, "EEEE, MMM d")}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`
                              py-3 px-4 rounded-lg text-sm font-medium transition-all
                              ${selectedTime === time
                                ? "bg-primary text-white"
                                : "bg-background border border-border text-white hover:border-primary/50"
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  {/* Step 2: Enter Details */}
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary text-sm mb-6 hover:underline"
                  >
                    ← Back to calendar
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Enter Your Details</h2>
                      <p className="text-text-muted text-sm">
                        {format(selectedDate!, "EEEE, MMMM d")} at {selectedTime}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Acme Consulting"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Company Website *
                      </label>
                      <input
                        type="url"
                        name="website"
                        required
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="https://acmeconsulting.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Average Deal Size *
                      </label>
                      <select
                        name="dealSize"
                        required
                        value={formData.dealSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                      >
                        <option value="">Select deal size</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k-50k">$25k - $50k</option>
                        <option value="50k-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        What&apos;s your biggest challenge with lead generation right now?
                      </label>
                      <textarea
                        name="currentChallenge"
                        rows={3}
                        value={formData.currentChallenge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
                        placeholder="Tell us about your current situation..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Scheduling..."
                      ) : (
                        <>
                          Confirm Booking
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-text-muted text-xs text-center">
                      By scheduling, you agree to our{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
