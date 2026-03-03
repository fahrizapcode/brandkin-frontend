"use client";

import { motion } from "framer-motion";
import { PosePackResult, GenerationType, ImageOption } from "../types";
import { Download, Package, Sparkles, ArrowLeft } from "lucide-react";

interface PosePackResultProps {
  posePack: PosePackResult;
  generationType: GenerationType;
  selectedMascot?: ImageOption;
  selectedAvatar?: ImageOption;
  onBack?: () => void;
}

export default function PosePackResultComponent({
  posePack,
  generationType,
  selectedMascot,
  selectedAvatar,
  onBack,
}: PosePackResultProps) {

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

  const totalPoses = posePack.mascotPoses.length + posePack.avatarPoses.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Success header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] mb-2">
          <Package className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="text-xs text-[#10B981] font-medium">Pose Pack Ready</span>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#9CA3AF] bg-clip-text text-transparent">
          Your Pose Pack is Complete
        </h2>
        <p className="text-[#9CA3AF] text-xs mt-1">
          {totalPoses} unique poses generated for your brand characters
        </p>
      </motion.div>

      {/* Selected Images Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 p-4 bg-[rgba(139,92,246,0.05)] border border-[rgba(139,92,246,0.2)] rounded-xl"
      >
        <h3 className="text-xs font-medium text-[#9CA3AF] mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Base Characters
        </h3>
        <div className="flex gap-3">
          {selectedMascot && (
            <div className="flex items-center gap-2">
              <img
                src={selectedMascot.imageUrl}
                alt="Selected mascot"
                className="w-12 h-12 rounded-lg object-cover border border-[rgba(139,92,246,0.3)]"
              />
              <div>
                <p className="text-xs text-white font-medium">Mascot</p>
                <p className="text-[10px] text-[#9CA3AF]">Base character</p>
              </div>
            </div>
          )}
          {selectedAvatar && (
            <div className="flex items-center gap-2">
              <img
                src={selectedAvatar.imageUrl}
                alt="Selected avatar"
                className="w-12 h-12 rounded-lg object-cover border border-[rgba(59,130,246,0.3)]"
              />
              <div>
                <p className="text-xs text-white font-medium">Avatar</p>
                <p className="text-[10px] text-[#9CA3AF]">Base character</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mascot Poses */}
      {showMascots && posePack.mascotPoses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#8B5CF6]" />
            Mascot Poses
            <span className="text-[#9CA3AF] text-xs font-normal">({posePack.mascotPoses.length} poses)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {posePack.mascotPoses.map((pose, index) => (
              <motion.div
                key={pose.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="relative aspect-square rounded-xl overflow-hidden group bg-[rgba(139,92,246,0.1)]"
              >
                <img
                  src={pose.imageUrl}
                  alt={`Mascot pose ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Pose label */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium">
                  Pose {index + 1}
                </div>

                {/* Download button */}
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleDownload(pose.imageUrl, `mascot-pose-${index + 1}.png`)}
                    className="w-full py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Avatar Poses */}
      {showAvatars && posePack.avatarPoses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#3B82F6]" />
            Avatar Poses
            <span className="text-[#9CA3AF] text-xs font-normal">({posePack.avatarPoses.length} poses)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {posePack.avatarPoses.map((pose, index) => (
              <motion.div
                key={pose.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                className="relative aspect-square rounded-xl overflow-hidden group bg-[rgba(59,130,246,0.1)]"
              >
                <img
                  src={pose.imageUrl}
                  alt={`Avatar pose ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Pose label */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium">
                  Pose {index + 1}
                </div>

                {/* Download button */}
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleDownload(pose.imageUrl, `avatar-pose-${index + 1}.png`)}
                    className="w-full py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] text-white text-sm font-medium hover:bg-[rgba(139,92,246,0.2)] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Selection
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
