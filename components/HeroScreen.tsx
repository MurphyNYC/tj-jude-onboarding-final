"use client";

import { motion } from "framer-motion";

interface HeroScreenProps {
  onStart: () => void;
}

export function HeroScreen({ onStart }: HeroScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-8 sm:py-10">
      <motion.div
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[12px] font-medium text-[#6e6e73] shadow-sm"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Premium onboarding experience
      </motion.div>

      <motion.h1
        className="text-[42px] font-bold text-[#1c1c1e] mb-2 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Hey, TJ
      </motion.h1>

      <motion.p
        className="text-[17px] text-[#6e6e73] mb-1"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        I&apos;m your premium assistant.
      </motion.p>

      <motion.p
        className="text-[13px] text-[#a1a1a6] mb-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        Built by Shapiro
      </motion.p>

      <motion.button
        className="btn-premium w-full max-w-[280px]"
        onClick={onStart}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.97 }}
      >
        Get Started
      </motion.button>

      <motion.p
        className="text-[12px] text-[#a1a1a6] mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        Takes about 3 minutes
      </motion.p>
    </div>
  );
}
