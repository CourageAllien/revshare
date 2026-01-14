"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  pulse?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  showArrow = false,
  onClick,
  href,
  className = "",
  pulse = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 gap-2 relative overflow-hidden";

  const variants = {
    primary:
      "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:shadow-xl",
    secondary:
      "bg-card hover:bg-card-hover text-white border border-border hover:border-primary/50",
    ghost: "text-text-secondary hover:text-white",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {pulse && variant === "primary" && (
        <span className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${classes} group`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${classes} group`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
