"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiChoiceOtherProps {
  question: string;
  options: Option[];
  onAnswer: (answer: string[]) => void;
}

export function MultiChoiceOther({ question, options, onAnswer }: MultiChoiceOtherProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [showOther, setShowOther] = useState(false);

  const toggleOption = (value: string) => {
    if (value === "other") {
      setShowOther(!selected.includes("other"));
    }
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    const finalAnswer = [...selected];
    if (selected.includes("other") && otherText.trim()) {
      finalAnswer.push(`other:${otherText.trim()}`);
    }
    onAnswer(finalAnswer);
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

      <div className="space-y-2.5 mb-5">
        {options.map((option, i) => {
          const isSelected = selected.includes(option.value);
          const isOther = option.value === "other";
          return (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className={`option-glass w-full flex items-center gap-3.5 ${
                  isSelected ? "option-glass-selected" : ""
                }`}
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
              </button>

              {isOther && isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    className="input-glass mt-2.5 ml-8"
                    placeholder="Tell me what it is..."
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    autoFocus
                  />
                </motion.div>
              )}
            </motion.div>
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
