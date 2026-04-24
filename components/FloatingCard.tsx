"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface FloatingCardProps {
  onStart: () => void;
}

export function FloatingCard({ onStart }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax (max 5° tilt per PRD)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Ambient glow color shift
  const glowColor = useMotionValue("rgba(99, 102, 241, 0.3)");

  useEffect(() => {
    const colors = [
      "rgba(99, 102, 241, 0.3)",   // indigo
      "rgba(139, 92, 246, 0.3)",    // purple
      "rgba(16, 185, 129, 0.2)",    // emerald
      "rgba(99, 102, 241, 0.3)",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % colors.length;
      glowColor.set(colors[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, [glowColor]);

  return (
    <motion.div
      className="relative w-full max-w-[380px] mx-auto"
      style={{ perspective: 1000 }}
    >
      {/* Ambient glow behind card */}
      <motion.div
        className="absolute -inset-4 rounded-[24px] blur-2xl"
        style={{ backgroundColor: glowColor }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        ref={cardRef}
        className="relative glass-strong rounded-[16px] p-6 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
      >
        {/* Profile photo with ring */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #10b981)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src="/tj-photo.jpg"
              alt="TJ Jude"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Analytics preview */}
        <div className="text-center mb-6">
          <p className="text-caption text-text-secondary">
            144K followers · 8.2M views · 3 revenue streams
          </p>
        </div>

        {/* CTA */}
        <motion.button
          className="w-full py-4 px-6 rounded-button font-button text-background-primary"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 40px rgba(99, 102, 241, 0.5)",
              "0 0 20px rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        {/* Subtitle */}
        <p className="text-center text-caption text-text-secondary mt-4">
          Your new assistant. No downloads. No setup.
        </p>
      </motion.div>
    </motion.div>
  );
}
