"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Smartphone, DollarSign, Calendar, Handshake, BarChart, Mail, Car } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  DollarSign,
  Calendar,
  Handshake,
  BarChart,
  Mail,
  Car,
};

interface Option {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

interface FeatureCardsProps {
  question: string;
  options: Option[];
  onAnswer: (answer: string[]) => void;
}

export function FeatureCards({ question, options, onAnswer }: FeatureCardsProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onAnswer(selected);
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
      <p className="text-[12px] text-[#a1a1a6] mb-5">Select all that apply</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
        {options.map((option, i) => {
          const isSelected = selected.includes(option.value);
          const Icon = option.icon ? iconMap[option.icon] : null;
          return (
            <motion.button
              key={option.value}
              className={`option-glass relative text-left ${
                isSelected ? "option-glass-selected" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => toggleOption(option.value)}
            >
              {isSelected && (
                <motion.div
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.div>
              )}
              <div className="flex flex-col gap-1.5">
                {Icon && <Icon className="w-5 h-5 text-[#6366f1] mb-0.5" />}
                <span className="text-[14px] text-[#1c1c1e] font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-[11px] text-[#a1a1a6]">{option.description}</span>
                )}
              </div>
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
