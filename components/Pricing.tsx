"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Button from "./ui/Button";

const features = [
  "Zero retainer—ever",
  "Zero setup fees",
  "Lifetime revenue share on clients we generate",
  "Full sales cycle support (except the call itself)",
  "Meeting prep, follow-ups, everything",
  "Cancel anytime—no strings",
];

export default function Pricing() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The Numbers
          </h2>
          <p className="text-text-secondary text-lg">
            One simple, transparent model. No surprises.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-card border border-border rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-6 right-6">
            <Sparkles className="w-6 h-6 text-primary/40" />
          </div>

          {/* Main number */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-primary">
              15-30%
            </span>
            <p className="text-xl md:text-2xl text-text-secondary mt-2">
              of lifetime client revenue
            </p>
            <p className="text-base text-text-muted mt-1">
              For every client we bring you—forever
            </p>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-border mx-auto mb-8" />

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 text-left"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-text-secondary">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <Button href="/book" size="lg" showArrow>
            Let&apos;s Talk Partnership
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
