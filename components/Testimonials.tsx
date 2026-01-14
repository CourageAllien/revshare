"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "RevShare completely transformed how we approach sales. They booked 18 qualified meetings in our first month, and we closed 4 deals worth over $120k. The meeting prep alone is worth its weight in gold—I show up to calls feeling like I've known the prospect for years.",
    name: "Eunice Alison",
    role: "Co-founder",
    company: "Zizi",
    companyDesc: "AI Operations Consulting",
    result: "$120k+ closed",
    avatar: "EA",
  },
  {
    quote: "We tried three agencies before RevShare. All of them took our retainer and delivered garbage leads. With RevShare, we only pay when deals close—and they actually help us close them. The follow-up sequences and proposal support have been game-changing for our consulting arm.",
    name: "Seun Ojo",
    role: "CEO",
    company: "Zortcloud",
    companyDesc: "Software Development & Consulting",
    result: "3x pipeline growth",
    avatar: "SO",
  },
];

export default function Testimonials() {
  return (
    <section id="results" className="py-24 px-4 sm:px-6 lg:px-8">
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
            What Our Partners Say
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real results from real partners. No fluff.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Result badge */}
              <div className="absolute top-6 right-6">
                <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {testimonial.result}
                </span>
              </div>

              {/* Quote */}
              <p className="text-text-secondary leading-relaxed mt-4 mb-6 text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-text-secondary text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                  <div className="text-text-muted text-xs">{testimonial.companyDesc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
