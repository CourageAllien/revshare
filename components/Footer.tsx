"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">
              REV<span className="text-primary">SHARE</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="/privacy"
              className="text-text-secondary hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-text-secondary hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>

          {/* Social & Contact */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@revshare.com"
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-text-muted text-sm">
            © {currentYear} RevShare. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
