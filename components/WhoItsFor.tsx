"use client";

import { motion } from "framer-motion";
import { Handshake, UserCog, GraduationCap } from "lucide-react";
import Card from "./ui/Card";

const audiences = [
  {
    icon: Handshake,
    title: "Partnership Consultants",
    description:
      "You help companies build channel programs and strategic alliances. Your deals are complex but high-value.",
  },
  {
    icon: UserCog,
    title: "Fractional Executives",
    description:
      "Fractional CMOs, CROs, and COOs who deliver transformation. You need warm intros, not cold calls.",
  },
  {
    icon: GraduationCap,
    title: "Sales Training Firms",
    description:
      "You train enterprise sales teams. Your pipeline needs to reflect the caliber of your work.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Built For
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            High-ticket B2B service providers who know their value.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {audiences.map((audience, index) => (
            <Card key={audience.title} delay={index * 0.1} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <audience.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {audience.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {audience.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Minimum requirement note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-white font-medium">
              Minimum $10k deal size required
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
