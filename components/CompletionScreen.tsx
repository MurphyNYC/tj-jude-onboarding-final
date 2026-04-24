"use client";

import { motion } from "framer-motion";

interface CompletionScreenProps {
  isSubmitting: boolean;
}

export function CompletionScreen({ isSubmitting }: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      {/* Checkmark */}
      <motion.div
        className="w-16 h-16 rounded-full bg-[#34c759]/10 flex items-center justify-center mb-6 ring-1 ring-[#34c759]/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
      >
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            stroke="#34c759"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M11 18l5 5 9-9"
            stroke="#34c759"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.55, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <motion.h2
        className="text-[32px] font-bold text-[#1c1c1e] mb-2 tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        All set
      </motion.h2>

      <motion.p
        className="text-[16px] text-[#6e6e73] mb-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        I know how you work now.
      </motion.p>

      <motion.p
        className="text-[13px] text-[#a1a1a6] mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        Shapiro is building your agent. You&apos;ll hear from him soon.
      </motion.p>

      {/* Status cards */}
      <motion.div
        className="w-full max-w-[320px] space-y-2.5"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/40 border border-black/5">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-indigo-500">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[13px] text-[#1c1c1e] font-medium">Your assistant is being built</p>
            <p className="text-[11px] text-[#a1a1a6]">Custom config generated</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/40 border border-black/5">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-500">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[13px] text-[#1c1c1e] font-medium">You&apos;ll get a welcome message</p>
            <p className="text-[11px] text-[#a1a1a6]">When it&apos;s ready</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/40 border border-black/5">
          <div className="w-8 h-8 rounded-full bg-[#34c759]/10 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#34c759]">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[13px] text-[#1c1c1e] font-medium">Ready soon</p>
            <p className="text-[11px] text-[#a1a1a6]">Typically within 24 hours</p>
          </div>
        </div>
      </motion.div>

      {isSubmitting && (
        <motion.p
          className="mt-6 text-[12px] text-[#a1a1a6]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Saving your answers...
        </motion.p>
      )}
    </div>
  );
}
