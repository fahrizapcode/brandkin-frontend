"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GenerationStatus, BrandDNA, BrandTone, GenerationType } from "../types";
import BrandDNAForm from "./BrandDNAForm";
import AlchemyOwl from "./AlchemyOwl";
import { Palette, Sparkles, Wand2 } from "lucide-react";

interface AlchemySidebarProps {
  status: GenerationStatus;
  onSubmit: (data: BrandDNA) => void;
  isLoading: boolean;
}

const brandTones: { value: BrandTone; label: string; icon: string }[] = [
  { value: "Playful", label: "Playful", icon: "🎮" },
  { value: "Professional", label: "Professional", icon: "💼" },
  { value: "Mystic", label: "Mystic", icon: "🔮" },
  { value: "Bold", label: "Bold", icon: "⚡" },
];

const generationTypes: { value: GenerationType; label: string }[] = [
  { value: "mascot_only", label: "Mascot Only" },
  { value: "avatar_only", label: "Avatar Only" },
  { value: "both", label: "Both" },
];

export default function AlchemySidebar({
  status,
  onSubmit,
  isLoading,
}: AlchemySidebarProps) {
  const [brandTone, setBrandTone] = useState<BrandTone>("Mystic");
  const [generationType, setGenerationType] = useState<GenerationType>("both");

  const handleFormSubmit = (data: BrandDNA) => {
    onSubmit({ ...data, brandTone, generationType });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-[calc(100vh-72px)] flex flex-col bg-gradient-to-b from-[#0F0F1A] via-[#0C0C18] to-[#141428] border-r border-[rgba(139,92,246,0.1)] overflow-hidden"
    >
      {/* Generate Type & Owl Section - Outside scroll area */}
      <div className="px-6 py-3 shrink-0 h-48">
        <div className="flex gap-1">
          {/* Generate Type - Vertical flex column (3 rows) */}
          <div className="flex-1 space-y-[5px]">
            <label className="flex items-center gap-[6px] text-[13px] font-medium text-[#9CA3AF]">
              <Wand2 className="w-4 h-4 text-[#8B5CF6]" />
              Generate
            </label>
            <div className="flex flex-col gap-[5px]">
              {generationTypes.map((type) => (
                <motion.button
                  key={type.value}
                  type="button"
                  onClick={() => setGenerationType(type.value)}
                  className={`px-[11px] py-[11px] rounded-lg border transition-all duration-300 flex items-center justify-center ${
                    generationType === type.value
                      ? "bg-[rgba(139,92,246,0.2)] border-[#8B5CF6] text-white"
                      : "bg-[rgba(139,92,246,0.05)] border-[rgba(139,92,246,0.2)] text-[#9CA3AF] hover:border-[rgba(139,92,246,0.4)]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-[11px] font-medium">{type.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Owl Mascot */}
          <div className="w-[180px] flex flex-col items-center justify-start pt-6 shrink-0">
            <div className="scale-[0.7] origin-top">
              <AlchemyOwl status={status} />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-[rgba(139,92,246,0.3)] to-transparent shrink-0" />

      {/* Brand DNA Form Section - Fill available space */}
      <div className="flex-1 px-6 py-3 min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="h-full flex flex-col"
        >
          <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-2 shrink-0">
            Brand DNA
          </h3>
          <div className="flex-1 overflow-y-auto min-h-0">
            <BrandDNAForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </motion.div>
      </div>

      {/* Abracadabra Button - Outside scroll area */}
      <div className="px-6 py-3 shrink-0">
        <motion.button
          type="submit"
          form="brand-dna-form"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white font-semibold text-base relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Casting Spell...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Abracadabra
              </>
            )}
          </span>
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: "-200%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8 }}
          />
        </motion.button>
      </div>

      {/* Bottom decoration */}
      <div className="px-6 py-2 shrink-0">
        <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280]">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
          AI Powered by Brandkin
        </div>
      </div>
    </motion.div>
  );
}
