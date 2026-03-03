"use client";

import { motion } from "framer-motion";
import { GenerationStatus } from "../types";

interface RitualCircleProps {
  status: GenerationStatus;
}

export default function RitualCircle({ status }: RitualCircleProps) {
  const isActive = status === "generating" || status === "manifesting";

  return (
    <div className="relative w-56 h-56 flex items-center justify-center">
      {/* Main Portal Circle - Clean and Clear */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
        }}
        animate={isActive ? {
          scale: [1, 1.02, 1],
          opacity: [0.8, 1, 0.8],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer Ring - Elegant and Clean */}
      <motion.div
        className="absolute inset-2 rounded-full border border-[rgba(139,92,246,0.4)]"
        style={{
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.2), inset 0 0 40px rgba(139, 92, 246, 0.1)',
        }}
        animate={isActive ? {
          rotate: 360,
          scale: [1, 1.01, 1],
        } : {}}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Middle Ring - Subtle rotation */}
      <motion.div
        className="absolute inset-6 rounded-full border border-[rgba(139,92,246,0.3)]"
        style={{
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)',
        }}
        animate={isActive ? { rotate: -360 } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Ring - Delicate */}
      <motion.div
        className="absolute inset-10 rounded-full border border-[rgba(139,92,246,0.25)]"
        animate={isActive ? { rotate: 360 } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Portal Center - Soft Glow */}
      <motion.div
        className="absolute inset-14 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          filter: 'blur(2px)',
        }}
        animate={isActive ? {
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        } : {
          scale: 1,
          opacity: 0.7,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Core Crystal */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[rgba(139,92,246,0.9)]"
        style={{
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)',
        }}
        animate={isActive ? {
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sparkle Particles - Like scattered glitter powder */}
      {isActive && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 
                  ? 'rgba(252, 211, 77, 0.9)' 
                  : i % 3 === 1 
                    ? 'rgba(139, 92, 246, 0.8)' 
                    : 'rgba(255, 255, 255, 0.9)',
                boxShadow: i % 3 === 0 
                  ? '0 0 6px rgba(252, 211, 77, 0.8)' 
                  : i % 3 === 1 
                    ? '0 0 6px rgba(139, 92, 246, 0.6)' 
                    : '0 0 6px rgba(255, 255, 255, 0.6)',
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: Math.cos(i * 30 * Math.PI / 180) * (60 + Math.random() * 40),
                y: Math.sin(i * 30 * Math.PI / 180) * (60 + Math.random() * 40) + 20,
                opacity: [0, 0.9, 0.6, 0],
                scale: [0, 1.2, 0.8, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
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
        animate={isActive ? {
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
