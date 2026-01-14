"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./ui/AnimatedCounter";

const stats = [
  { value: 340, prefix: "", suffix: "+", label: "Meetings Booked" },
  { value: 89, prefix: "", suffix: "%", label: "Show Rate" },
  { value: 6, prefix: "", suffix: " days", label: "To First Meeting" },
];

export default function StatsBar() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
