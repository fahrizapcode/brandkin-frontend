"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "User" }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[72px] bg-[#0B0C10] border-b border-[rgba(139,92,246,0.1)] flex items-center justify-between px-6 shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold text-white">Brandkin AI</h1>
          <p className="text-xs text-[#9CA3AF]">Digital Brand Alchemy</p>
        </div>
      </div>

      {/* User greeting */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-[#9CA3AF]">
          Welcome back, <span className="text-white font-medium">{userName}</span>
        </p>
        <motion.div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-white text-sm font-medium"
          whileHover={{ scale: 1.05 }}
        >
          {userName.charAt(0).toUpperCase()}
        </motion.div>
      </div>
    </motion.header>
  );
}
