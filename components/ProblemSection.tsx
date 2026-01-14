"use client";

import { motion } from "framer-motion";
import { UserX, DollarSign, Clock, TrendingDown } from "lucide-react";
import Card from "./ui/Card";

const problems = [
  {
    icon: UserX,
    title: "Hired SDRs that didn't work out",
    description:
      "Training takes forever, turnover is constant, and you're still doing half the work yourself.",
  },
  {
    icon: DollarSign,
    title: "Paid agencies thousands upfront",
    description:
      "Big retainers, vague promises, and a trail of garbage leads that never close.",
  },
  {
    icon: Clock,
    title: "Doing outreach yourself at 11pm",
    description:
      "Between client work and prospecting, you're burning out fast.",
  },
  {
    icon: TrendingDown,
    title: "Pipeline feast or famine",
    description:
      "One month you're swamped, the next you're scrambling for new business.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/50 to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Sound Familiar?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            You&apos;re not alone. Most consultants face the same lead gen nightmare.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <Card key={problem.title} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-accent-red" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
