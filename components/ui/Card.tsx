"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  delay = 0,
  glow = false,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`
        bg-card rounded-2xl border border-border p-6
        ${hover ? "card-glow cursor-pointer" : ""}
        ${glow ? "glow-blue" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
