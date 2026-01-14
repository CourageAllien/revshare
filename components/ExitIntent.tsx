"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import Button from "./ui/Button";

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
          >
            <div className="bg-card border border-border rounded-2xl p-8 mx-4 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-primary/50 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Wait—before you go
                </h3>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  Not ready for a call yet? No problem. Get our free guide on the
                  <span className="text-white font-medium"> 5 signs your offer is ready for cold email</span>.
                </p>

                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <Button className="w-full" showArrow>
                    Send Me the Guide
                  </Button>
                </div>

                <p className="text-text-muted text-sm mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
