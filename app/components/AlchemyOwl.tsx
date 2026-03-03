"use client";

import { motion } from "framer-motion";
import { GenerationStatus } from "../types";

interface AlchemyOwlProps {
  status: GenerationStatus;
}

export default function AlchemyOwl({ status }: AlchemyOwlProps) {
  const isActive = status === "generating" || status === "manifesting";
  const isCasting = status === "generating";

  return (
    <motion.div
      className="relative w-40 h-40"
      animate={isActive ? {
        filter: [
          "drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))",
          "drop-shadow(0 0 40px rgba(139, 92, 246, 0.7))",
          "drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))",
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Owl Body - Pure CSS */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32">
          {/* Owl Body */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 rounded-full"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}
          />
          
          {/* Owl Head */}
          <div 
            className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
            style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' }}
          />
          
          {/* Ear tufts */}
          <div className="absolute top-0 left-4 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-[#6D28D9]" />
          <div className="absolute top-0 right-4 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-[#6D28D9]" />
          
          {/* Eyes container */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-1">
            {/* Left eye */}
            <motion.div 
              className="w-7 h-7 rounded-full bg-[#1F1F2E] flex items-center justify-center relative"
              animate={isActive ? {
                boxShadow: [
                  "0 0 10px 2px rgba(252, 211, 77, 0.6), 0 0 20px 4px rgba(139, 92, 246, 0.4)",
                  "0 0 20px 4px rgba(252, 211, 77, 0.9), 0 0 40px 8px rgba(139, 92, 246, 0.7)",
                  "0 0 10px 2px rgba(252, 211, 77, 0.6), 0 0 20px 4px rgba(139, 92, 246, 0.4)",
                ]
              } : {
                boxShadow: "0 0 5px 1px rgba(252, 211, 77, 0.3)"
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'radial-gradient(circle, #FCD34D 0%, #F59E0B 100%)' }}
                animate={isActive ? {
                  filter: [
                    "brightness(1) drop-shadow(0 0 2px #FCD34D)",
                    "brightness(1.5) drop-shadow(0 0 8px #FCD34D)",
                    "brightness(1) drop-shadow(0 0 2px #FCD34D)",
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#1F1F2E]" />
              </motion.div>
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white opacity-90" />
            </motion.div>
            
            {/* Right eye */}
            <motion.div 
              className="w-7 h-7 rounded-full bg-[#1F1F2E] flex items-center justify-center relative"
              animate={isActive ? {
                boxShadow: [
                  "0 0 10px 2px rgba(252, 211, 77, 0.6), 0 0 20px 4px rgba(139, 92, 246, 0.4)",
                  "0 0 20px 4px rgba(252, 211, 77, 0.9), 0 0 40px 8px rgba(139, 92, 246, 0.7)",
                  "0 0 10px 2px rgba(252, 211, 77, 0.6), 0 0 20px 4px rgba(139, 92, 246, 0.4)",
                ]
              } : {
                boxShadow: "0 0 5px 1px rgba(252, 211, 77, 0.3)"
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'radial-gradient(circle, #FCD34D 0%, #F59E0B 100%)' }}
                animate={isActive ? {
                  filter: [
                    "brightness(1) drop-shadow(0 0 2px #FCD34D)",
                    "brightness(1.5) drop-shadow(0 0 8px #FCD34D)",
                    "brightness(1) drop-shadow(0 0 2px #FCD34D)",
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#1F1F2E]" />
              </motion.div>
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white opacity-90" />
            </motion.div>
          </div>
          
          {/* Beak */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-[#F59E0B]" />
          
          {/* Belly */}
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-14 rounded-full opacity-60"
            style={{ background: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 100%)' }}
          />
          
          {/* Left wing */}
          <div className="absolute top-14 -left-1 w-6 h-14 rounded-full bg-[#7C3AED] transform -rotate-12" />
          
          {/* Right wing - holds wand */}
          <motion.div 
            className="absolute top-10 -right-2 w-5 h-12 rounded-full bg-[#7C3AED] origin-top"
            animate={isCasting ? {
              rotate: [0, 20, 0],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: isCasting ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            {/* Magic Wand */}
            <motion.div 
              className="absolute -top-4 left-1/2 -translate-x-1/2"
              animate={isCasting ? {
                rotate: [0, 20, 0],
              } : {}}
              transition={{
                duration: 0.6,
                repeat: isCasting ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {/* Wand stick */}
              <div className="w-1 h-16 bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] rounded-full" />
              {/* Wand tip/star */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#FCD34D] text-lg">⭐</div>
              {/* Wand glow */}
              {isCasting && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(252, 211, 77, 0.8) 0%, transparent 70%)' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
          
          {/* Feet */}
          <div className="absolute -bottom-1 left-8 flex gap-4">
            <div className="w-3 h-4 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-4 rounded-full bg-[#F59E0B]" />
          </div>
        </div>
      </div>

      {/* Magic aura when generating */}
      {isActive && (
        <>
          {/* Outer aura ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-[rgba(139,92,246,0.4)]"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          
          {/* Inner aura ring */}
          <motion.div
            className="absolute inset-4 rounded-full border border-[rgba(252,211,77,0.5)]"
            animate={{ rotate: -360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#FCD34D]"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${10 + Math.floor(i / 4) * 70}%`,
                fontSize: `${8 + (i % 3) * 4}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-10, -40],
                x: [(i % 2 === 0 ? -10 : 10), (i % 2 === 0 ? -20 : 20)],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.div>
          ))}
          
          {/* Magic particles from wand */}
          {isCasting && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-[#FCD34D]"
                  style={{
                    right: '10%',
                    top: '20%',
                  }}
                  animate={{
                    x: [0, 50 + i * 20],
                    y: [0, -30 - i * 10],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </>
          )}
        </>
      )}
    </motion.div>
  );
}
