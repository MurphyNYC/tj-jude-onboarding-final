"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

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

  return (
    <motion.div
      className="relative"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft diffuse shadow — the card is floating */}
      <motion.div
        className="absolute -inset-2 rounded-[40px] -z-10"
        animate={{
          boxShadow: isHovered
            ? "0 40px 100px rgba(0,0,0,0.12), 0 15px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)"
            : "0 30px 80px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Colored glow behind — subtle Apple Intelligence vibe */}
      <motion.div
        className="absolute -inset-8 rounded-[48px] -z-20 blur-3xl opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(168,130,255,0.3), transparent 60%)",
            "radial-gradient(circle at 70% 40%, rgba(100,180,255,0.3), transparent 60%)",
            "radial-gradient(circle at 40% 70%, rgba(255,160,180,0.3), transparent 60%)",
            "radial-gradient(circle at 30% 30%, rgba(168,130,255,0.3), transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main glass card */}
      <motion.div
        ref={cardRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(40px) saturate(160%)",
          WebkitBackdropFilter: "blur(40px) saturate(160%)",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          borderTop: "1px solid rgba(255, 255, 255, 0.85)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(0,0,0,0.02)",
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Inner edge reflection — the glass refraction highlight */}
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
          }}
        />

        {/* Subtle shimmer sweep on hover */}
        <motion.div
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 0.08 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            width: "50%",
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </motion.div>
  );
}
