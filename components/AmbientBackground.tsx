"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Orb {
  x: number;
  y: number;
  r: number;
  color: string;
  dx: number;
  dy: number;
  phase: number;
}

interface Twinkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  phase: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const twinklesRef = useRef<Twinkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const initOrbs = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      orbsRef.current = [
        { x: w * 0.2, y: h * 0.3, r: Math.min(w, h) * 0.35, color: "168, 130, 255", dx: 0.15, dy: 0.1, phase: 0 },
        { x: w * 0.8, y: h * 0.6, r: Math.min(w, h) * 0.3, color: "100, 180, 255", dx: -0.12, dy: 0.18, phase: 2 },
        { x: w * 0.5, y: h * 0.8, r: Math.min(w, h) * 0.25, color: "255, 160, 180", dx: 0.1, dy: -0.08, phase: 4 },
        { x: w * 0.15, y: h * 0.7, r: Math.min(w, h) * 0.2, color: "255, 200, 140", dx: 0.08, dy: 0.12, phase: 1 },
      ];
    };

    const initTwinkles = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      twinklesRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      // Draw orbs
      orbsRef.current.forEach((orb) => {
        const ox = orb.x + Math.sin(t + orb.phase) * 40 * orb.dx * 10;
        const oy = orb.y + Math.cos(t * 0.7 + orb.phase) * 40 * orb.dy * 10;
        const breathe = 1 + Math.sin(t * 0.5 + orb.phase) * 0.08;

        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * breathe);
        gradient.addColorStop(0, `rgba(${orb.color}, 0.35)`);
        gradient.addColorStop(0.5, `rgba(${orb.color}, 0.12)`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r * breathe, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw twinkles
      twinklesRef.current.forEach((twinkle) => {
        const alpha = 0.3 + Math.sin(t * twinkle.speed * 100 + twinkle.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(twinkle.x, twinkle.y, twinkle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Cross sparkle for larger ones
        if (twinkle.size > 1.5) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 0.5;
          const s = twinkle.size * 3;
          ctx.beginPath();
          ctx.moveTo(twinkle.x - s, twinkle.y);
          ctx.lineTo(twinkle.x + s, twinkle.y);
          ctx.moveTo(twinkle.x, twinkle.y - s);
          ctx.lineTo(twinkle.x, twinkle.y + s);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    initOrbs();
    initTwinkles();
    draw();

    const handleResize = () => {
      resize();
      initOrbs();
      initTwinkles();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "#f5f3ef" }}>
      {/* Soft warm base */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #faf9f7 0%, #f2f0ec 100%)" }} />

      {/* Canvas for orbs + twinkles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.03) 100%)",
        }}
      />
    </div>
  );
}
