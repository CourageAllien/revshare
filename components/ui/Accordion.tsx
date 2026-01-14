"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay?: number;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
  delay = 0,
}: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-primary transition-colors pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center transition-all group-hover:border-primary/50 group-hover:bg-primary/10">
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary" />
          ) : (
            <Plus className="w-4 h-4 text-text-secondary group-hover:text-primary" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-secondary leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="divide-border">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            delay={index * 0.08}
          />
        ))}
      </div>
    </div>
  );
}
