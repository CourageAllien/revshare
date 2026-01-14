"use client";

import { motion } from "framer-motion";
import { Users, Target, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "We're not a vendor. We're your embedded sales team.",
    description:
      "We handle everything from first touch to closed deal—outreach, meeting prep, follow-ups, proposals. You just show up and close.",
  },
  {
    icon: Target,
    title: "Lifetime revenue share means true alignment.",
    description:
      "We don't just want you to close—we want your clients to stay. Our 15-30% is on lifetime revenue, so we're incentivized to bring you clients who stick around.",
  },
  {
    icon: ShieldCheck,
    title: "We're selective because we're betting on you.",
    description:
      "We only work with proven offers because our income depends on your success long-term. If you can't close and retain, we both lose.",
  },
];

export default function WhyThisWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
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
            Why This Model Works
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            It&apos;s not just different—it&apos;s better for both of us.
          </p>
        </motion.div>

        {/* Reasons */}
        <div className="space-y-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-start gap-6 bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
