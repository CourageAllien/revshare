"use client";

import { motion } from "framer-motion";
import Accordion from "./ui/Accordion";

const faqItems = [
  {
    question: "How does the 15-30% work exactly?",
    answer:
      "You pay us 15-30% of all revenue from clients we bring you—for the lifetime of that client relationship. If we generate a client who pays you $10k/month for 2 years, we share in that entire revenue stream. The exact percentage depends on your deal size and industry. No upfront costs, no hidden fees.",
  },
  {
    question: "What do you actually handle?",
    answer:
      "Everything sales-related except getting on the call itself. We run outreach, book meetings, prep you for calls, handle follow-ups, chase down next steps, send proposals, and stay on top of the deal until it closes. You just show up and close.",
  },
  {
    question: "What counts as a client you brought?",
    answer:
      "Any client that originated from our outreach efforts. We use unique tracking, dedicated email threads, and CRM tagging to maintain clear attribution. There's no ambiguity—if they came through our campaigns, they're ours for revenue share purposes.",
  },
  {
    question: "Why lifetime revenue share?",
    answer:
      "Because we're not just booking meetings—we're building your client base. Our incentive is to bring you clients who stick around, not just names who close once and churn. When you win long-term, we win long-term. That's real alignment.",
  },
  {
    question: "What if I'm not happy with the leads?",
    answer:
      "If lead quality isn't where it should be, we iterate on targeting and messaging until it is. But remember—we only get paid when you close and keep clients. Bad leads hurt us too. Our incentive is to send you closeable, retainable opportunities.",
  },
  {
    question: "How quickly can we start?",
    answer:
      "From our first call to live campaigns is typically 2-3 weeks. That includes strategy, copywriting, building your sending infrastructure, and warming up domains. We move fast because every week without campaigns is revenue left on the table.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Questions?
          </h2>
          <p className="text-text-secondary text-lg">
            Everything you need to know about how this works.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
