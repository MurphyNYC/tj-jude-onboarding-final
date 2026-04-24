"use client";

import { motion } from "framer-motion";

interface ProgressPipProps {
  current: number;
  total: number;
}

export function ProgressPip({ current, total }: ProgressPipProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="pip"
          animate={{
            width: i === current - 1 ? 24 : 6,
            backgroundColor: i <= current - 1 ? "#1c1c1e" : "rgba(0,0,0,0.08)",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
