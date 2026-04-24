"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleListProps {
  question: string;
  options: ToggleOption[];
  onAnswer: (answer: string[]) => void;
}

export function ToggleList({ question, options, onAnswer }: ToggleListProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    onAnswer(selected);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-[22px] font-semibold text-[#1c1c1e] mb-1 leading-snug">{question}</h3>
      <p className="text-[12px] text-[#a1a1a6] mb-5">Toggle what I can handle</p>

      <div className="space-y-2.5 mb-5">
        {options.map((option, i) => {
          const isSelected = selected.includes(option.value);
          return (
            <motion.button
              key={option.value}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                isSelected
                  ? "bg-[#6366f1]/5 ring-1 ring-[#6366f1]/20"
                  : "bg-white/30 ring-1 ring-black/5 hover:ring-black/10 hover:bg-white/50"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => toggle(option.value)}
            >
              <span className="text-[15px] text-[#1c1c1e] text-left pr-4 leading-snug">{option.label}</span>
              <div className={`toggle-glass-track flex-shrink-0 ${isSelected ? "toggle-glass-track-active" : ""}`}>
                <div className="toggle-glass-knob" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        className="btn-premium w-full"
        onClick={handleSubmit}
        whileTap={{ scale: 0.97 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
