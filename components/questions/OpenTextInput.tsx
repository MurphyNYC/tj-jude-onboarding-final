"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface OpenTextInputProps {
  question: string;
  placeholder?: string;
  onAnswer: (answer: string) => void;
}

export function OpenTextInput({ question, placeholder, onAnswer }: OpenTextInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (value.trim()) {
      onAnswer(value.trim());
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

      <textarea
        ref={textareaRef}
        className="input-glass mt-5 mb-4"
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <motion.button
        className="btn-premium w-full"
        onClick={handleSubmit}
        whileTap={{ scale: 0.97 }}
        disabled={!value.trim()}
        style={{ opacity: value.trim() ? 1 : 0.5 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
