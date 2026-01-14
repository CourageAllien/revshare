"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, TrendingUp } from "lucide-react";

export default function Calculator() {
  const [dealSize, setDealSize] = useState(25000);
  const [dealsPerMonth, setDealsPerMonth] = useState(3);
  const [sharePercent, setSharePercent] = useState(20);

  const monthlyRevenue = dealSize * dealsPerMonth;
  const yourCut = monthlyRevenue * (1 - sharePercent / 100);
  const ourCut = monthlyRevenue * (sharePercent / 100);
  const yearlyRevenue = yourCut * 12;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-secondary">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <CalcIcon className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">ROI Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            See Your Potential
          </h2>
          <p className="text-text-secondary text-lg">
            Adjust the sliders to see what this could mean for your business.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          {/* Sliders */}
          <div className="space-y-8 mb-10">
            {/* Deal Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Average Deal Size</label>
                <span className="text-2xl font-bold text-primary">
                  ${dealSize.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={dealSize}
                onChange={(e) => setDealSize(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-text-muted text-sm mt-1">
                <span>$10k</span>
                <span>$100k</span>
              </div>
            </div>

            {/* Deals Per Month */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Deals Closed Per Month</label>
                <span className="text-2xl font-bold text-primary">{dealsPerMonth}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={dealsPerMonth}
                onChange={(e) => setDealsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-text-muted text-sm mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Revenue Share */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white font-medium">Revenue Share</label>
                <span className="text-2xl font-bold text-primary">{sharePercent}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="30"
                step="5"
                value={sharePercent}
                onChange={(e) => setSharePercent(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-text-muted text-sm mt-1">
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="border-t border-border pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="text-text-secondary text-sm mb-2">Monthly Revenue</div>
                <div className="text-2xl font-bold text-white">
                  ${monthlyRevenue.toLocaleString()}
                </div>
              </div>
              <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/20">
                <div className="text-primary text-sm mb-2 font-medium">You Keep</div>
                <div className="text-3xl font-bold text-white">
                  ${yourCut.toLocaleString()}
                </div>
                <div className="text-text-muted text-sm mt-1">/month</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="text-text-secondary text-sm mb-2">We Earn</div>
                <div className="text-2xl font-bold text-text-secondary">
                  ${ourCut.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Yearly projection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Yearly Projection</span>
              </div>
              <div className="text-4xl font-bold text-white">
                ${yearlyRevenue.toLocaleString()}
              </div>
              <div className="text-text-secondary text-sm mt-1">
                in your pocket (with zero retainer paid)
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
