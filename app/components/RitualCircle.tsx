"use client";

import { motion } from "framer-motion";
import { GenerationStatus } from "../types";

interface RitualCircleProps {
  status: GenerationStatus;
}

// Fixed particle positions to avoid hydration mismatch
const CORE_PARTICLES = [
  // Layer 1 - very close, tiny gold (16 particles, dist 18-30)
  { angle: 0,   dist: 18, size: 3,   color: "#FCD34D", glow: "0 0 8px #FCD34D",  dur: 1.8, delay: 0.0 },
  { angle: 23,  dist: 26, size: 2,   color: "#ffffff", glow: "0 0 6px #fff",      dur: 2.0, delay: 0.2 },
  { angle: 45,  dist: 22, size: 2.5, color: "#C084FC", glow: "0 0 8px #C084FC",  dur: 1.6, delay: 0.4 },
  { angle: 68,  dist: 29, size: 2,   color: "#FCD34D", glow: "0 0 6px #FCD34D",  dur: 2.2, delay: 0.1 },
  { angle: 90,  dist: 20, size: 3,   color: "#F9A8D4", glow: "0 0 8px #F9A8D4",  dur: 1.9, delay: 0.5 },
  { angle: 113, dist: 27, size: 2,   color: "#C084FC", glow: "0 0 6px #C084FC",  dur: 2.1, delay: 0.3 },
  { angle: 135, dist: 19, size: 3,   color: "#FCD34D", glow: "0 0 8px #FCD34D",  dur: 1.7, delay: 0.6 },
  { angle: 158, dist: 25, size: 2,   color: "#ffffff", glow: "0 0 6px #fff",      dur: 2.3, delay: 0.15 },
  { angle: 180, dist: 21, size: 2.5, color: "#FCD34D", glow: "0 0 8px #FCD34D",  dur: 1.8, delay: 0.7 },
  { angle: 203, dist: 28, size: 2,   color: "#F9A8D4", glow: "0 0 6px #F9A8D4",  dur: 2.0, delay: 0.35 },
  { angle: 225, dist: 23, size: 3,   color: "#C084FC", glow: "0 0 8px #C084FC",  dur: 1.6, delay: 0.55 },
  { angle: 248, dist: 30, size: 2,   color: "#ffffff", glow: "0 0 6px #fff",      dur: 2.2, delay: 0.8 },
  { angle: 270, dist: 20, size: 2.5, color: "#FCD34D", glow: "0 0 8px #FCD34D",  dur: 1.9, delay: 0.0 },
  { angle: 293, dist: 26, size: 2,   color: "#C084FC", glow: "0 0 6px #C084FC",  dur: 2.1, delay: 0.45 },
  { angle: 315, dist: 22, size: 3,   color: "#F9A8D4", glow: "0 0 8px #F9A8D4",  dur: 1.7, delay: 0.25 },
  { angle: 338, dist: 28, size: 2,   color: "#FCD34D", glow: "0 0 6px #FCD34D",  dur: 2.3, delay: 0.65 },
  // Layer 2 - mid range (16 particles, dist 38-58)
  { angle: 11,  dist: 45, size: 2.5, color: "#F9A8D4", glow: "0 0 9px #F9A8D4",  dur: 2.5, delay: 0.7 },
  { angle: 34,  dist: 52, size: 3,   color: "#FCD34D", glow: "0 0 11px #FCD34D", dur: 2.2, delay: 0.9 },
  { angle: 56,  dist: 40, size: 2,   color: "#ffffff", glow: "0 0 7px #fff",      dur: 2.8, delay: 0.2 },
  { angle: 79,  dist: 55, size: 3,   color: "#C084FC", glow: "0 0 11px #C084FC", dur: 2.0, delay: 1.1 },
  { angle: 101, dist: 43, size: 2.5, color: "#FCD34D", glow: "0 0 9px #FCD34D",  dur: 2.6, delay: 0.4 },
  { angle: 124, dist: 50, size: 2,   color: "#F9A8D4", glow: "0 0 7px #F9A8D4",  dur: 2.3, delay: 0.8 },
  { angle: 146, dist: 58, size: 3,   color: "#ffffff", glow: "0 0 11px #fff",     dur: 1.9, delay: 1.3 },
  { angle: 169, dist: 41, size: 2.5, color: "#C084FC", glow: "0 0 9px #C084FC",  dur: 2.4, delay: 0.6 },
  { angle: 191, dist: 53, size: 2,   color: "#FCD34D", glow: "0 0 7px #FCD34D",  dur: 2.7, delay: 1.0 },
  { angle: 214, dist: 46, size: 3,   color: "#F9A8D4", glow: "0 0 11px #F9A8D4", dur: 2.1, delay: 0.3 },
  { angle: 236, dist: 38, size: 2.5, color: "#ffffff", glow: "0 0 9px #fff",      dur: 2.5, delay: 1.4 },
  { angle: 259, dist: 56, size: 2,   color: "#C084FC", glow: "0 0 7px #C084FC",  dur: 2.9, delay: 0.5 },
  { angle: 281, dist: 44, size: 3,   color: "#FCD34D", glow: "0 0 11px #FCD34D", dur: 2.2, delay: 1.2 },
  { angle: 304, dist: 51, size: 2.5, color: "#F9A8D4", glow: "0 0 9px #F9A8D4",  dur: 2.6, delay: 0.7 },
  { angle: 326, dist: 39, size: 2,   color: "#ffffff", glow: "0 0 7px #fff",      dur: 2.0, delay: 1.6 },
  { angle: 349, dist: 57, size: 3,   color: "#C084FC", glow: "0 0 11px #C084FC", dur: 2.4, delay: 0.1 },
  // Layer 3 - outer burst (18 particles, dist 70-110)
  { angle: 0,   dist: 78,  size: 3,   color: "#FCD34D", glow: "0 0 13px #FCD34D", dur: 3.2, delay: 0.0 },
  { angle: 20,  dist: 95,  size: 2,   color: "#ffffff", glow: "0 0 9px #fff",      dur: 2.9, delay: 1.5 },
  { angle: 40,  dist: 105, size: 3.5, color: "#C084FC", glow: "0 0 15px #C084FC", dur: 3.5, delay: 0.3 },
  { angle: 60,  dist: 82,  size: 2,   color: "#FCD34D", glow: "0 0 9px #FCD34D",  dur: 2.7, delay: 1.8 },
  { angle: 80,  dist: 110, size: 3,   color: "#F9A8D4", glow: "0 0 13px #F9A8D4", dur: 3.3, delay: 0.5 },
  { angle: 100, dist: 88,  size: 2.5, color: "#ffffff", glow: "0 0 11px #fff",     dur: 3.0, delay: 1.2 },
  { angle: 120, dist: 100, size: 3,   color: "#FCD34D", glow: "0 0 13px #FCD34D", dur: 3.4, delay: 0.7 },
  { angle: 140, dist: 75,  size: 2,   color: "#C084FC", glow: "0 0 9px #C084FC",  dur: 2.8, delay: 2.1 },
  { angle: 160, dist: 107, size: 3.5, color: "#F9A8D4", glow: "0 0 15px #F9A8D4", dur: 3.1, delay: 0.9 },
  { angle: 180, dist: 84,  size: 2,   color: "#FCD34D", glow: "0 0 9px #FCD34D",  dur: 3.6, delay: 0.2 },
  { angle: 200, dist: 98,  size: 3,   color: "#ffffff", glow: "0 0 13px #fff",     dur: 2.9, delay: 1.7 },
  { angle: 220, dist: 72,  size: 2.5, color: "#C084FC", glow: "0 0 11px #C084FC", dur: 3.2, delay: 0.6 },
  { angle: 240, dist: 103, size: 3,   color: "#FCD34D", glow: "0 0 13px #FCD34D", dur: 3.0, delay: 1.4 },
  { angle: 260, dist: 79,  size: 2,   color: "#F9A8D4", glow: "0 0 9px #F9A8D4",  dur: 2.7, delay: 2.3 },
  { angle: 280, dist: 108, size: 3.5, color: "#ffffff", glow: "0 0 15px #fff",     dur: 3.4, delay: 0.4 },
  { angle: 300, dist: 86,  size: 2.5, color: "#C084FC", glow: "0 0 11px #C084FC", dur: 3.1, delay: 1.1 },
  { angle: 320, dist: 96,  size: 3,   color: "#FCD34D", glow: "0 0 13px #FCD34D", dur: 2.8, delay: 0.8 },
  { angle: 340, dist: 73,  size: 2,   color: "#F9A8D4", glow: "0 0 9px #F9A8D4",  dur: 3.3, delay: 1.9 },
];

export default function RitualCircle({ status }: RitualCircleProps) {
  const isActive = status === "generating" || status === "manifesting";

  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {/* Main Portal Circle - Clean and Clear */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
        }}
        animate={isActive ? { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer Ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-[rgba(139,92,246,0.4)]"
        style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2), inset 0 0 40px rgba(139, 92, 246, 0.1)' }}
        animate={isActive ? { rotate: 360, scale: [1, 1.01, 1] } : {}}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Middle Ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-[rgba(139,92,246,0.3)]"
        style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)' }}
        animate={isActive ? { rotate: -360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute inset-10 rounded-full border border-[rgba(139,92,246,0.25)]"
        animate={isActive ? { rotate: 360 } : {}}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Portal Center Soft Glow */}
      <motion.div
        className="absolute inset-14 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(2px)',
        }}
        animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] } : { scale: 1, opacity: 0.7 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===================== LUXURIOUS CORE CENTER ===================== */}
      {/* Deep core glow - layered radial pulses */}
      {isActive && (
        <>
          {/* Pulse ring 1 */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 16, height: 16,
              background: 'radial-gradient(circle, rgba(252,211,77,0.6) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
            animate={{ scale: [1, 3.5, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut", delay: 0 }}
          />
          {/* Pulse ring 2 */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 14, height: 14,
              background: 'radial-gradient(circle, rgba(192,132,252,0.7) 0%, transparent 70%)',
              filter: 'blur(3px)',
            }}
            animate={{ scale: [1, 4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
          />
          {/* Pulse ring 3 */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 10, height: 10,
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
              filter: 'blur(3px)',
            }}
            animate={{ scale: [1, 5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
          />
        </>
      )}

      {/* Core Crystal */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 14, height: 14,
          background: 'radial-gradient(circle, #ffffff 0%, #C084FC 40%, rgba(139,92,246,0.8) 100%)',
          boxShadow: '0 0 20px rgba(252,211,77,0.9), 0 0 40px rgba(139,92,246,0.6), 0 0 70px rgba(192,132,252,0.3)',
        }}
        animate={isActive ? {
          scale: [1, 1.35, 1],
          opacity: [0.9, 1, 0.9],
          boxShadow: [
            '0 0 20px rgba(252,211,77,0.9), 0 0 40px rgba(139,92,246,0.6)',
            '0 0 35px rgba(252,211,77,1), 0 0 70px rgba(192,132,252,0.9)',
            '0 0 20px rgba(252,211,77,0.9), 0 0 40px rgba(139,92,246,0.6)',
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===================== RICH GLITTER PARTICLES ===================== */}
      {isActive && (
        <>
          {CORE_PARTICLES.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.dist;
            const ty = Math.sin(rad) * p.dist;
            // Small float offset for organic drifting
            const fx = Math.cos(rad + Math.PI / 2) * 6;
            const fy = Math.sin(rad + Math.PI / 2) * 6;
            return (
              <motion.div
                key={`cp-${i}`}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: p.glow,
                  x: tx,
                  y: ty,
                }}
                animate={{
                  x: [tx, tx + fx, tx - fx * 0.5, tx],
                  y: [ty, ty + fy, ty - fy * 0.5, ty],
                  opacity: [0, 0.85, 0.85, 0.85, 0],
                  scale: [0.2, 1.1, 1.0, 1.1, 0.2],
                }}
                transition={{
                  duration: p.dur * 1.5,
                  repeat: Infinity,
                  delay: p.delay,
                  times: [0, 0.2, 0.5, 0.8, 1],
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Star-burst cross glints — overlaid on core */}
          {[0, 45, 90, 135].map((angle, i) => (
            <motion.div
              key={`glint-${i}`}
              className="absolute"
              style={{
                width: 1.5,
                height: 28,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(252,211,77,0.9) 50%, transparent 100%)',
                borderRadius: 2,
                transformOrigin: 'center center',
                rotate: angle,
              }}
              animate={{ opacity: [0, 0.9, 0], scaleY: [0.3, 1.2, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            />
          ))}
        </>
      )}

      {/* Soft outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(139, 92, 246, 0.1)',
          boxShadow: '0 0 80px rgba(139, 92, 246, 0.15)',
        }}
        animate={isActive ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
