"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroScreenProps {
  onStart: () => void;
}

export function HeroScreen({ onStart }: HeroScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      {/* Photo */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-32 h-32 rounded-[24px] overflow-hidden ring-1 ring-black/5 shadow-lg">
          <Image
            src="/tj-photo.jpg"
            alt="TJ Jude"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Soft orb glow behind photo */}
        <div
          className="absolute -inset-4 rounded-[32px] -z-10 opacity-50 blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(168,130,255,0.35) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.h1
        className="text-[40px] font-bold text-[#1c1c1e] mb-2 tracking-tight leading-tight"
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
        I&apos;m your new assistant.
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
