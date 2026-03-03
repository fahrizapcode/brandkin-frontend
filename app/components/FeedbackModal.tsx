"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  type: 'mascot' | 'avatar' | 'both';
  isLoading?: boolean;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  type,
  isLoading,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() && !isLoading) {
      onSubmit(feedback.trim());
      setFeedback("");
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'mascot':
        return 'Mascot';
      case 'avatar':
        return 'Avatar';
      case 'both':
        return 'All Images';
      default:
        return 'Images';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'mascot':
        return "e.g., Make it more friendly, add a wizard hat, change the color to blue...";
      case 'avatar':
        return "e.g., Make it more professional, add glasses, younger look...";
      case 'both':
        return "e.g., More vibrant colors, modern style, friendlier expression...";
      default:
        return "Describe what you'd like to change...";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-[#0F0F1A] border border-[rgba(139,92,246,0.3)] rounded-2xl p-6 shadow-2xl shadow-[#8B5CF6]/10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(139,92,246,0.2)] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Provide Feedback</h3>
                    <p className="text-[#9CA3AF] text-xs">Regenerate {getTypeLabel()}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4 text-[#9CA3AF]" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm text-[#9CA3AF] mb-2">
                    What would you like to change?
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="w-full px-4 py-3 bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all duration-300 resize-none"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-medium hover:bg-[rgba(255,255,255,0.1)] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!feedback.trim() || isLoading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit & Regenerate
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
