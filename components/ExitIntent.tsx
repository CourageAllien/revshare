"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "./ui/Button";

interface TodaysTopic {
  id: string;
  title: string;
  emoji: string;
}

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [todaysTopic, setTodaysTopic] = useState<TodaysTopic | null>(null);

  // Fetch today's topic on mount
  useEffect(() => {
    fetch("/api/todays-topic")
      .then((res) => res.json())
      .then((data) => setTodaysTopic(data))
      .catch(() => {
        // Fallback topic
        setTodaysTopic({
          id: "5-signs-ready",
          title: "5 Signs Your Offer is Ready for Cold Email",
          emoji: "🎯",
        });
      });
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setCompanyName(data.companyName || "your company");
    } catch (err) {
      setError("Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              {success ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Check your inbox! 📬
                  </h3>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Your personalized guide for <span className="text-white font-medium">{companyName}</span> is 
                    on its way. We&apos;ve analyzed your business and created custom insights just for you.
                  </p>

                  <Button onClick={handleClose} className="w-full">
                    Got it!
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">{todaysTopic?.emoji || "🎁"}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Wait—before you go
                  </h3>

                  <p className="text-text-secondary mb-2 leading-relaxed">
                    Not ready for a call yet? No problem. Get our free guide:
                  </p>
                  
                  <p className="text-primary font-semibold text-lg mb-6">
                    {todaysTopic?.title || "Loading..."}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your work email"
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                      />
                      {error && (
                        <div className="flex items-center gap-2 mt-2 text-left">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <p className="text-red-400 text-sm">{error}</p>
                        </div>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      showArrow 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Personalizing your guide...
                        </span>
                      ) : (
                        "Send Me the Guide"
                      )}
                    </Button>
                  </form>

                  <p className="text-text-muted text-xs mt-4">
                    🏢 Company email required • Personalized with AI
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
