"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { GenerationStatus, GenerationResult, GenerationType, PosePackResult, ImageOption } from "../types";
import { fetchGallery, GalleryItem } from "../lib/api";
import RitualCircle from "./RitualCircle";
import GenerationResultComponent from "./GenerationResult";
import PosePackResultComponent from "./PosePackResult";

// Rich sparkle particles configuration
const SPARKLE_CONFIGS = [
  // Inner ring sparkles - close to center
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `inner-${i}`,
    distance: 80 + Math.random() * 40,
    angle: (i * 45) + Math.random() * 20,
    size: 2 + Math.random() * 2,
    duration: 2 + Math.random() * 1,
    delay: i * 0.15,
    color: i % 2 === 0 ? "rgba(252, 211, 77, 0.9)" : "rgba(139, 92, 246, 0.8)",
    glow: i % 2 === 0 ? "0 0 8px rgba(252, 211, 77, 0.8)" : "0 0 8px rgba(139, 92, 246, 0.6)",
  })),
  // Middle ring sparkles
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `middle-${i}`,
    distance: 140 + Math.random() * 60,
    angle: (i * 30) + Math.random() * 15,
    size: 1.5 + Math.random() * 2,
    duration: 2.5 + Math.random() * 1.5,
    delay: i * 0.12 + 0.5,
    color: i % 3 === 0 ? "rgba(255, 255, 255, 0.9)" : i % 3 === 1 ? "rgba(252, 211, 77, 0.8)" : "rgba(139, 92, 246, 0.7)",
    glow: i % 3 === 0 ? "0 0 6px rgba(255, 255, 255, 0.6)" : i % 3 === 1 ? "0 0 6px rgba(252, 211, 77, 0.6)" : "0 0 6px rgba(139, 92, 246, 0.5)",
  })),
  // Outer ring sparkles
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `outer-${i}`,
    distance: 220 + Math.random() * 80,
    angle: (i * 22.5) + Math.random() * 10,
    size: 1 + Math.random() * 2,
    duration: 3 + Math.random() * 2,
    delay: i * 0.1 + 1,
    color: i % 4 === 0 ? "rgba(252, 211, 77, 0.7)" : i % 4 === 1 ? "rgba(139, 92, 246, 0.6)" : i % 4 === 2 ? "rgba(59, 130, 246, 0.6)" : "rgba(255, 255, 255, 0.7)",
    glow: "0 0 4px rgba(255, 255, 255, 0.4)",
  })),
  // Floating dust particles - very subtle
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `dust-${i}`,
    distance: 100 + Math.random() * 200,
    angle: Math.random() * 360,
    size: 0.5 + Math.random() * 1,
    duration: 4 + Math.random() * 3,
    delay: Math.random() * 3,
    color: "rgba(255, 255, 255, 0.4)",
    glow: "none",
  })),
];

interface RitualStageProps {
  status: GenerationStatus;
  progress: number;
  result?: GenerationResult;
  posePack?: PosePackResult;
  generationType: GenerationType;
  selectedMascot?: ImageOption;
  selectedAvatar?: ImageOption;
  onSelectMascot?: (mascot: ImageOption) => void;
  onSelectAvatar?: (avatar: ImageOption) => void;
  onRegenerate?: (feedback: string, type: 'mascot' | 'avatar' | 'both') => void;
  onGeneratePoses?: () => void;
  onBackToSelection?: () => void;
  isLoading?: boolean;
}

const progressTexts: Record<GenerationStatus, string[]> = {
  idle: ["Ready to begin the ritual..."],
  generating: [
    "Analyzing Brand Essence...",
    "Merging Visual Archetypes...",
    "Transmuting Identity...",
    "Synchronizing Dual Forms...",
  ],
  manifesting: [
    "Manifestation Almost Complete...",
    "Crystallizing Digital Assets...",
    "Finalizing Brand Identity...",
  ],
  selecting: ["Select your preferred images..."],
  generating_poses: [
    "Generating Pose Variations...",
    "Animating Characters...",
    "Creating Pose Pack...",
  ],
  completed: ["Your Pose Pack is Ready!"],
};

export default function RitualStage({
  status,
  progress,
  result,
  posePack,
  generationType,
  selectedMascot,
  selectedAvatar,
  onSelectMascot,
  onSelectAvatar,
  onRegenerate,
  onGeneratePoses,
  onBackToSelection,
  isLoading,
}: RitualStageProps) {
  const isIdle = status === "idle";
  const isGenerating = status === "generating";
  const isManifesting = status === "manifesting";
  const isSelecting = status === "selecting";
  const isGeneratingPoses = status === "generating_poses";
  const isCompleted = status === "completed";
  const isActive = isGenerating || isManifesting || isGeneratingPoses;

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    if (isIdle) {
      fetchGallery(6).then(setGalleryItems);
    }
  }, [isIdle]);

  // Get current progress text based on progress percentage
  const getCurrentText = () => {
    const texts = progressTexts[status];
    if (texts.length === 1) return texts[0];
    const index = Math.min(
      Math.floor((progress / 100) * texts.length),
      texts.length - 1
    );
    return texts[index];
  };

  return (
    <div className="relative w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100%' }}>
      {/* Mystical Portal Background - Clean and Elegant */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft ambient glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: isActive 
              ? "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {isIdle && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center px-8 py-8 overflow-y-auto max-h-full no-scrollbar"
          >
            {/* Clean mystical circle portal */}
            <motion.div
              className="relative w-32 h-32 mb-8 shrink-0 mt-30"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Outer ring */}
              <div 
                className="absolute inset-0 rounded-full border border-[rgba(139,92,246,0.3)]"
                style={{
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.2), inset 0 0 30px rgba(139, 92, 246, 0.1)",
                }}
              />
              {/* Inner glow */}
              <div 
                className="absolute inset-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
                }}
              />
              {/* Center crystal */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-4 h-4 rounded-full bg-[rgba(139,92,246,0.8)]" 
                  style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)" }}
                />
              </motion.div>
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-[#9CA3AF] bg-clip-text text-transparent">
              The Alchemy Awaits
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-md">
              Fill in your Brand DNA in the sidebar and click &quot;Abracadabra&quot; to begin the digital transmutation ritual.
            </p>

            {/* Previous Generations Gallery */}
            {galleryItems.length > 0 && (
              <motion.div
                className="mt-10 w-full max-w-lg mt-20"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-[#6B7280] text-xs uppercase tracking-widest mb-4 text-center">
                  Previously Summoned
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {galleryItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      className="relative aspect-square rounded-xl overflow-hidden group cursor-default"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + idx * 0.07, duration: 0.4 }}
                      style={{
                        boxShadow: "0 0 0 1px rgba(139,92,246,0.15), 0 4px 24px rgba(0,0,0,0.4)",
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.imageUrl}
                        alt={item.businessName || item.assetType}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                        {item.businessName && (
                          <p className="text-white text-[10px] font-medium truncate">{item.businessName}</p>
                        )}
                        <p className="text-[#9CA3AF] text-[9px] capitalize">{item.assetType}</p>
                      </div>
                      {/* Subtle border shimmer */}
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.25)" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {(isGenerating || isManifesting) && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center relative"
          >
            {/* Rich Sparkle Particles Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ width: '600px', height: '600px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              {SPARKLE_CONFIGS.map((sparkle) => {
                const rad = (sparkle.angle * Math.PI) / 180;
                const x = Math.cos(rad) * sparkle.distance;
                const y = Math.sin(rad) * sparkle.distance;
                
                return (
                  <motion.div
                    key={sparkle.id}
                    className="absolute rounded-full"
                    style={{
                      width: sparkle.size,
                      height: sparkle.size,
                      backgroundColor: sparkle.color,
                      boxShadow: sparkle.glow,
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      x: x, 
                      y: y, 
                      opacity: 0, 
                      scale: 0 
                    }}
                    animate={{ 
                      x: [x, x + (Math.random() - 0.5) * 30, x],
                      y: [y, y + (Math.random() - 0.5) * 30 - 20, y],
                      opacity: [0, 1, 0.8, 0],
                      scale: [0, 1.5, 1, 0],
                    }}
                    transition={{
                      duration: sparkle.duration,
                      repeat: Infinity,
                      delay: sparkle.delay,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            <RitualCircle status={status} />

            {/* Progress text */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p
                key={getCurrentText()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl font-medium text-white mb-4 glow-text"
              >
                {getCurrentText()}
              </motion.p>

              {/* Progress bar */}
              <div className="w-64 h-2 bg-[rgba(139,92,246,0.2)] rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              <p className="mt-3 text-[#6B7280] text-sm">
                {Math.round(progress)}%
              </p>
            </motion.div>
          </motion.div>
        )}

        {(isSelecting || (isCompleted && !posePack)) && result && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full overflow-y-auto overflow-x-hidden px-4 py-4"
            style={{ maxHeight: '100%' }}
          >
            <GenerationResultComponent
              result={result}
              generationType={generationType}
              selectedMascot={selectedMascot}
              selectedAvatar={selectedAvatar}
              onSelectMascot={onSelectMascot}
              onSelectAvatar={onSelectAvatar}
              onRegenerate={onRegenerate}
              onGeneratePoses={onGeneratePoses}
              isLoading={isLoading}
            />
          </motion.div>
        )}

        {(isGeneratingPoses || (isCompleted && posePack)) && (
          <motion.div
            key="pose-pack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full overflow-y-auto overflow-x-hidden px-4 py-4"
            style={{ maxHeight: '100%' }}
          >
            {posePack ? (
              <PosePackResultComponent
                posePack={posePack}
                generationType={generationType}
                selectedMascot={selectedMascot}
                selectedAvatar={selectedAvatar}
                onBack={onBackToSelection}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[rgba(139,92,246,0.2)] border-t-[#8B5CF6] animate-spin" />
                  <p className="text-white font-medium">Generating poses...</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle floor reflection - only when active */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          style={{
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}
    </div>
  );
}
