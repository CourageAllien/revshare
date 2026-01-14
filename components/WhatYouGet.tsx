"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const weHandle = [
  "Cold outreach campaigns",
  "Lead list building & research",
  "Meeting scheduling",
  "Pre-call prep documents",
  "Follow-up sequences",
  "Proposal drafting",
  "Deal tracking & CRM management",
  "Chasing next steps",
];

const youHandle = [
  "Show up to the calls",
  "Close the deals",
  "Deliver your service",
];

export default function WhatYouGet() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What You Get
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We handle the entire sales engine. You focus on what you do best.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* We Handle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white">We Handle</h3>
            </div>
            <ul className="space-y-4">
              {weHandle.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* You Handle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white">You Handle</h3>
            </div>
            <ul className="space-y-4">
              {youHandle.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* That's it callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <p className="text-white font-semibold text-lg">That&apos;s it.</p>
              <p className="text-text-secondary mt-1">
                We handle everything else so you can focus on closing and delivering.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
