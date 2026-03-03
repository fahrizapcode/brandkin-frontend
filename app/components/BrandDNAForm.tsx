"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BrandDNA, BrandTone } from "../types";
import { Sparkles, Building2, Palette, Users, MessageSquare } from "lucide-react";

interface BrandDNAFormProps {
  onSubmit: (data: BrandDNA) => void;
  isLoading: boolean;
}

const industries = [
  "Technology",
  "Fashion",
  "Food & Beverage",
  "Healthcare",
  "Education",
  "Finance",
  "Entertainment",
  "E-commerce",
  "Travel",
  "Other",
];

const brandTones: { value: BrandTone; label: string; icon: string }[] = [
  { value: "Playful", label: "Playful", icon: "🎮" },
  { value: "Professional", label: "Professional", icon: "💼" },
  { value: "Mystic", label: "Mystic", icon: "🔮" },
  { value: "Bold", label: "Bold", icon: "⚡" },
];

export default function BrandDNAForm({ onSubmit, isLoading }: BrandDNAFormProps) {
  const [formData, setFormData] = useState<BrandDNA>({
    businessName: "",
    industry: "",
    brandTone: "Mystic",
    primaryColor: "#8B5CF6",
    targetAudience: "",
    specialNotes: "",
    generationType: "both",
    numberOfGenerations: 2,
  });

  // Get available number of generations based on type
  const getNumberOptions = () => {
    if (formData.generationType === 'both') {
      return [2, 4]; // For both: 2 (1 each) or 4 (2 each)
    }
    return [1, 2, 3, 4]; // For single type: 1-4
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit(formData);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all duration-300 text-sm";

  return (
    <motion.form
      id="brand-dna-form"
      onSubmit={handleSubmit}
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Brand Name */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Brand Name
        </label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          placeholder="Enter your brand name"
          className={inputClasses}
          required
        />
      </div>

      {/* Industry */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <Building2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Industry
        </label>
        <select
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className={`${inputClasses} appearance-none cursor-pointer`}
          required
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
            backgroundSize: "14px",
          }}
        >
          <option value="" disabled className="bg-[#0F0F1A]">
            Select your industry
          </option>
          {industries.map((industry) => (
            <option key={industry} value={industry} className="bg-[#0F0F1A]">
              {industry}
            </option>
          ))}
        </select>
      </div>

     
      {/* Primary Color */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <div
            className="w-3.5 h-3.5 rounded-full border border-[rgba(255,255,255,0.2)]"
            style={{ backgroundColor: formData.primaryColor }}
          />
          Primary Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={formData.primaryColor}
            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            className="w-10 h-9 rounded-lg cursor-pointer border-0 bg-transparent"
          />
          <input
            type="text"
            value={formData.primaryColor}
            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            className={`${inputClasses} flex-1 uppercase`}
            maxLength={7}
          />
        </div>
      </div>

      {/* Target Audience */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Target Audience
        </label>
        <input
          type="text"
          value={formData.targetAudience}
          onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          placeholder="e.g., Young professionals, Gen Z, etc."
          className={inputClasses}
          required
        />
      </div>

      {/* Brand Tone - Horizontal row layout */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <Palette className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Brand Tone
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {brandTones.map((tone) => (
            <motion.button
              key={tone.value}
              type="button"
              onClick={() => setFormData({ ...formData, brandTone: tone.value })}
              className={`px-2 py-2 rounded-lg border transition-all duration-300 flex flex-col items-center gap-1 ${
                formData.brandTone === tone.value
                  ? "bg-[rgba(139,92,246,0.2)] border-[#8B5CF6] text-white"
                  : "bg-[rgba(139,92,246,0.05)] border-[rgba(139,92,246,0.2)] text-[#9CA3AF] hover:border-[rgba(139,92,246,0.4)]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">{tone.icon}</span>
              <span className="text-[10px] font-medium">{tone.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Number of Generations */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Number of Variations
          <span className="text-[10px] text-[#6B7280] ml-1">
            ({formData.generationType === 'both' ? '2 or 4 (split between mascot & avatar)' : '1-4 options'})
          </span>
        </label>
        <div className="flex gap-2">
          {getNumberOptions().map((num) => (
            <motion.button
              key={num}
              type="button"
              onClick={() => setFormData({ ...formData, numberOfGenerations: num })}
              className={`flex-1 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                formData.numberOfGenerations === num
                  ? "bg-[rgba(139,92,246,0.2)] border-[#8B5CF6] text-white"
                  : "bg-[rgba(139,92,246,0.05)] border-[rgba(139,92,246,0.2)] text-[#9CA3AF] hover:border-[rgba(139,92,246,0.4)]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF]">
          <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
          Special Notes (Optional)
        </label>
        <textarea
          value={formData.specialNotes}
          onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
          placeholder="Any specific requirements..."
          className={`${inputClasses} min-h-[50px] resize-none`}
          rows={2}
        />
      </div>

    </motion.form>
  );
}
