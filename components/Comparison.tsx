"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisonData = [
  {
    feature: "Upfront cost",
    traditional: "$5-15k/month",
    revshare: "$0",
    revshareWins: true,
  },
  {
    feature: "Risk",
    traditional: "All on you",
    revshare: "Shared",
    revshareWins: true,
  },
  {
    feature: "Incentive alignment",
    traditional: "None",
    revshare: "100%",
    revshareWins: true,
  },
  {
    feature: "Sales support",
    traditional: "Just leads",
    revshare: "Full cycle",
    revshareWins: true,
  },
  {
    feature: "Meeting prep",
    traditional: "You do it",
    revshare: "We do it",
    revshareWins: true,
  },
  {
    feature: "Follow-up sequences",
    traditional: "Extra cost",
    revshare: "Included",
    revshareWins: true,
  },
  {
    feature: "When they get paid",
    traditional: "Regardless of results",
    revshare: "Only when you close",
    revshareWins: true,
  },
];

export default function Comparison() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
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
            RevShare vs. Traditional Agencies
          </h2>
          <p className="text-text-secondary text-lg">
            See why aligned incentives make all the difference.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-background-secondary">
            <div className="p-4 md:p-6 text-text-muted font-medium text-sm"></div>
            <div className="p-4 md:p-6 text-center">
              <span className="text-text-secondary font-semibold">Traditional Agency</span>
            </div>
            <div className="p-4 md:p-6 text-center bg-primary/10 border-l border-primary/20">
              <span className="text-primary font-bold">RevShare</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="grid grid-cols-3 border-t border-border"
            >
              <div className="p-4 md:p-6 text-white font-medium text-sm md:text-base">
                {row.feature}
              </div>
              <div className="p-4 md:p-6 text-center text-text-secondary text-sm md:text-base">
                {row.traditional}
              </div>
              <div className="p-4 md:p-6 text-center bg-primary/5 border-l border-primary/20">
                <span className="text-white font-medium text-sm md:text-base">
                  {row.revshare}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
