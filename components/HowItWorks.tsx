"use client";

import { motion } from "framer-motion";
import { MessageSquare, Rocket, Headphones, BadgeDollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "We Talk",
    description:
      "A short call to understand your offer, ideal client, and deal size. We need to know you're the real deal.",
  },
  {
    number: "02",
    icon: Rocket,
    title: "We Launch",
    description:
      "Campaigns go live within 2 weeks. We handle copy, targeting, infrastructure—everything outbound.",
  },
  {
    number: "03",
    icon: Headphones,
    title: "We Support",
    description:
      "Meeting prep, follow-ups, proposals, chasing next steps. We handle everything except the call itself.",
  },
  {
    number: "04",
    icon: BadgeDollarSign,
    title: "You Close & Keep",
    description:
      "You show up, close the deal, deliver results. We share 15-30% of that client's lifetime revenue.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative">
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
            How It Works
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Simple, transparent, and aligned with your success.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-card border border-border rounded-2xl p-6 h-full group hover:border-primary/30 transition-all duration-300">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-6 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/30">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 mt-2 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
