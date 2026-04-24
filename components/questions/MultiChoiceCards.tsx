"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

interface MultiChoiceCardsProps {
  question: string;
  options: Option[];
  allowMultiple?: boolean;
  onAnswer: (answer: string | string[]) => void;
}

export function MultiChoiceCards({ question, options, allowMultiple, onAnswer }: MultiChoiceCardsProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    if (allowMultiple) {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelected([value]);
    }
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onAnswer(allowMultiple ? selected : selected[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-[22px] font-semibold text-[#1c1c1e] mb-1 leading-snug">{question}</h3>
      {allowMultiple && (
        <p className="text-[12px] text-[#a1a1a6] mb-5">Select all that apply</p>
      )}

      <div className="space-y-2.5 mb-5">
        {options.map((option, i) => {
          const isSelected = selected.includes(option.value);
          return (
            <motion.button
              key={option.value}
              className={`option-glass w-full flex items-center gap-3.5 ${
                isSelected ? "option-glass-selected" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => toggleOption(option.value)}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "bg-[#6366f1] border-[#6366f1]"
                    : "border-[#d1d1d6]"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-[15px] text-[#1c1c1e] text-left leading-snug">{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        className="btn-premium w-full"
        onClick={handleSubmit}
        whileTap={{ scale: 0.97 }}
        disabled={selected.length === 0}
        style={{ opacity: selected.length > 0 ? 1 : 0.5 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
