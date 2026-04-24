"use client";

import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <motion.div
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M8 12l3 3 5-6"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <motion.h2
        className="text-[28px] font-semibold text-[#1c1c1e] mb-3 tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Let&apos;s get you set up
      </motion.h2>

      <motion.p
        className="text-[16px] text-[#6e6e73] mb-2 max-w-[260px] leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        I&apos;ll ask you 9 quick questions so I know how you work.
      </motion.p>

      <motion.p
        className="text-[13px] text-[#a1a1a6] mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        No wrong answers. Just be real.
      </motion.p>

      <motion.button
        className="btn-premium w-full max-w-[280px]"
        onClick={onStart}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.97 }}
      >
        Start
      </motion.button>
    </div>
  );
}
