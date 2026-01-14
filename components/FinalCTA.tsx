"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Button from "./ui/Button";

export default function FinalCTA() {
  return (
    <section
      id="book-call"
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        
        {/* Blue glow orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
            <span className="text-sm text-accent font-medium">
              Only 2 spots available for January
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to stop chasing
            <br />
            <span className="text-primary">and start closing?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Let&apos;s have a conversation about whether this makes sense for
            your business. No pressure, no pitch deck—just a real discussion.
          </p>

          {/* CTA Button */}
          <Button href="/book" size="lg" showArrow pulse>
            <Calendar className="w-5 h-5" />
            Book a Call
          </Button>

          {/* Trust note */}
          <p className="text-text-muted text-sm mt-6">
            15-minute call. No strings attached.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
