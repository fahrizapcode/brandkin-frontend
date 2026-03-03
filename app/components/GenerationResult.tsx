"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GenerationResult, GenerationType, ImageOption } from "../types";
import { Download, Check, Sparkles, Wand2, RefreshCw, Package } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

interface GenerationResultProps {
  result: GenerationResult;
  generationType: GenerationType;
  selectedMascot?: ImageOption;
  selectedAvatar?: ImageOption;
  onSelectMascot?: (mascot: ImageOption) => void;
  onSelectAvatar?: (avatar: ImageOption) => void;
  onRegenerate?: (feedback: string, type: 'mascot' | 'avatar' | 'both') => void;
  onGeneratePoses?: () => void;
  isLoading?: boolean;
}

// Magic beam effect component
function MagicBeam({ isActive, delay = 0 }: { isActive: boolean; delay?: number }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay }}
        >
          {/* Top magic beam from owl */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-1"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.8), rgba(252, 211, 77, 0.9), transparent)',
              filter: 'blur(2px)',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 150, opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          />
          
          {/* Sparkle burst */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-[#FCD34D]"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: (i - 3) * 30,
                y: [0, 40, 80],
                opacity: [1, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1,
                delay: delay + 0.3 + i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Purple energy rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-xl border-2 border-[rgba(139,92,246,0.6)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1.5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.2, delay: delay + 0.4, ease: "easeOut" }}
          />
          
          {/* Yellow glow burst */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(252, 211, 77, 0.9) 0%, rgba(139, 92, 246, 0.5) 50%, transparent 70%)',
              filter: 'blur(10px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 3], opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: delay + 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GenerationResultComponent({
  result,
  generationType,
  selectedMascot,
  selectedAvatar,
  onSelectMascot,
  onSelectAvatar,
  onRegenerate,
  onGeneratePoses,
  isLoading,
}: GenerationResultProps) {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'mascot' | 'avatar' | 'both'>('both');
  const [showMagicEffect, setShowMagicEffect] = useState(true);

  // Trigger magic effect when result changes
  useEffect(() => {
    setShowMagicEffect(true);
    const timer = setTimeout(() => setShowMagicEffect(false), 3000);
    return () => clearTimeout(timer);
  }, [result]);

  const handleMascotSelect = (mascot: ImageOption) => {
    onSelectMascot?.(mascot);
  };

  const handleAvatarSelect = (avatar: ImageOption) => {
    onSelectAvatar?.(avatar);
  };

  const openFeedbackModal = (type: 'mascot' | 'avatar' | 'both') => {
    setFeedbackType(type);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    onRegenerate?.(feedback, feedbackType);
    setFeedbackModalOpen(false);
  };

  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      // For external URLs, open in new tab
      // Since external URLs may have CORS issues, direct download may not work
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = filename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const showMascots = generationType === "mascot_only" || generationType === "both";
  const showAvatars = generationType === "avatar_only" || generationType === "both";

  // Determine if user can generate poses (needs selection based on type)
  const canGeneratePoses = 
    (generationType === "mascot_only" && selectedMascot) ||
    (generationType === "avatar_only" && selectedAvatar) ||
    (generationType === "both" && selectedMascot && selectedAvatar);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Success header - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs text-[#10B981] font-medium">Manifestation Complete</span>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#9CA3AF] bg-clip-text text-transparent">
            Your Brand Identity is Ready
          </h2>
          <p className="text-[#9CA3AF] text-xs mt-1 line-clamp-2">
            {result.brandStory}
          </p>
        </motion.div>

        {/* Mascot Options - Compact Grid */}
        {showMascots && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-[#8B5CF6]" />
                Mascot Options
                <span className="text-[#9CA3AF] text-xs font-normal">({result.mascotOptions.length} generated)</span>
              </h3>
              <button
                onClick={() => openFeedbackModal('mascot')}
                disabled={isLoading}
                className="text-xs text-[#8B5CF6] hover:text-[#A78BFA] flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className="w-3 h-3" />
                Reroll
              </button>
            </div>
            <div className={`grid gap-2 ${result.mascotOptions.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {result.mascotOptions.map((mascot, index) => (
                <motion.div
                  key={mascot.id}
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(20px) brightness(2)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
                  transition={{ 
                    delay: 0.3 + index * 0.15, 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onClick={() => handleMascotSelect(mascot)}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                    selectedMascot?.id === mascot.id
                      ? "ring-2 ring-[#8B5CF6] ring-offset-2 ring-offset-[#0B0C10]"
                      : "hover:ring-2 hover:ring-[rgba(139,92,246,0.5)]"
                  }`}
                >
                  {/* Magic beam effect from owl */}
                  <MagicBeam isActive={showMagicEffect} delay={index * 0.15} />
                  
                  {/* Aura glow effect behind image */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0.3] }}
                    transition={{ 
                      delay: 0.3 + index * 0.15,
                      duration: 1.5,
                      ease: "easeOut"
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
                      filter: 'blur(20px)',
                      transform: 'scale(1.2)',
                    }}
                  />
                                
                  {/* Real image */}
                  <motion.img
                    src={mascot.imageUrl}
                    alt={`Mascot option ${index + 1}`}
                    className="w-full h-full object-cover relative z-10"
                    loading="lazy"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.3 + index * 0.15, 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Selection indicator */}
                  {selectedMascot?.id === mascot.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#8B5CF6] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(mascot.imageUrl, `mascot-${mascot.id}.png`);
                      }}
                      className="w-full py-1 rounded bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      PNG
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Avatar Options - Compact Grid */}
        {showAvatars && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-[#3B82F6]" />
                Avatar Options
                <span className="text-[#9CA3AF] text-xs font-normal">({result.avatarOptions.length} generated)</span>
              </h3>
              <button
                onClick={() => openFeedbackModal('avatar')}
                disabled={isLoading}
                className="text-xs text-[#3B82F6] hover:text-[#60A5FA] flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className="w-3 h-3" />
                Reroll
              </button>
            </div>
            <div className={`grid gap-2 ${result.avatarOptions.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {result.avatarOptions.map((avatar, index) => (
                <motion.div
                  key={avatar.id}
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(20px) brightness(2)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
                  transition={{ 
                    delay: 0.5 + index * 0.15, 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                    selectedAvatar?.id === avatar.id
                      ? "ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-[#0B0C10]"
                      : "hover:ring-2 hover:ring-[rgba(59,130,246,0.5)]"
                  }`}
                >
                  {/* Magic beam effect from owl */}
                  <MagicBeam isActive={showMagicEffect} delay={0.2 + index * 0.15} />
                  
                  {/* Aura glow effect behind image */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0.3] }}
                    transition={{ 
                      delay: 0.5 + index * 0.15,
                      duration: 1.5,
                      ease: "easeOut"
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)',
                      filter: 'blur(20px)',
                      transform: 'scale(1.2)',
                    }}
                  />
                                
                  {/* Real image */}
                  <motion.img
                    src={avatar.imageUrl}
                    alt={`Avatar option ${index + 1}`}
                    className="w-full h-full object-cover relative z-10"
                    loading="lazy"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.15, 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Selection indicator */}
                  {selectedAvatar?.id === avatar.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(avatar.imageUrl, `avatar-${avatar.id}.png`);
                      }}
                      className="w-full py-1 rounded bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      PNG
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3"
        >
          {/* Generate Pose Pack Button */}
          <motion.button
            whileHover={{ scale: canGeneratePoses ? 1.02 : 1 }}
            whileTap={{ scale: canGeneratePoses ? 0.98 : 1 }}
            onClick={onGeneratePoses}
            disabled={!canGeneratePoses || isLoading}
            className={`w-full px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
              canGeneratePoses
                ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:shadow-lg hover:shadow-[#8B5CF6]/25"
                : "bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            <Package className="w-4 h-4" />
            {isLoading ? "Generating..." : "Generate Pose Pack"}
            {!canGeneratePoses && !isLoading && (
              <span className="text-xs opacity-70">
                (Select {generationType === "both" ? "both images" : "an image"} first)
              </span>
            )}
          </motion.button>

          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openFeedbackModal('both')}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] text-white text-sm font-medium hover:bg-[rgba(139,92,246,0.2)] transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4 inline mr-1.5" />
              Regenerate All
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        type={feedbackType}
        isLoading={isLoading}
      />
    </>
  );
}
