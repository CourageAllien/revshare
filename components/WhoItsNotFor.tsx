"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const notForList = [
  {
    title: "Services priced below $10k",
    description: "The math doesn't work for smaller deals.",
  },
  {
    title: "Still figuring out your offer",
    description: "We need a proven, clear value proposition.",
  },
  {
    title: "No case studies or proof",
    description: "Cold email works best when you have results to show.",
  },
  {
    title: "Can't handle 10-20 new conversations/month",
    description: "Make sure you have the capacity to close.",
  },
];

export default function WhoItsNotFor() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Not a Fit If...
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We&apos;re selective because our success depends on yours.
          </p>
        </motion.div>

        {/* Not For List */}
        <div className="space-y-4">
          {notForList.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-card border border-border rounded-xl p-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center">
                <X className="w-5 h-5 text-accent-red" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
