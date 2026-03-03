"use client";

import { useState } from "react";
import Header from "./components/Header";
import AlchemySidebar from "./components/AlchemySidebar";
import RitualStage from "./components/RitualStage";
import { useGeneration } from "./hooks/useGeneration";
import { BrandDNA, ImageOption } from "./types";

export default function Home() {
  const {
    status,
    progress,
    result,
    posePack,
    isLoading,
    selectedMascot,
    selectedAvatar,
    startGeneration,
    regenerate,
    generatePoses,
    selectMascot,
    selectAvatar,
    reset,
  } = useGeneration();
  const [generationType, setGenerationType] = useState<BrandDNA["generationType"]>("both");

  const handleSubmit = async (brandDNA: BrandDNA) => {
    setGenerationType(brandDNA.generationType);
    await startGeneration(brandDNA);
  };

  const handleSelectMascot = (mascot: ImageOption) => {
    selectMascot(mascot);
  };

  const handleSelectAvatar = (avatar: ImageOption) => {
    selectAvatar(avatar);
  };

  const handleRegenerate = (feedback: string, type: 'mascot' | 'avatar' | 'both') => {
    regenerate(feedback, type);
  };

  const handleGeneratePoses = () => {
    generatePoses();
  };

  const handleBackToSelection = () => {
    // Reset to selecting state
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex flex-col overflow-hidden">
      {/* Header */}
      <Header userName="Mohammad" />

      {/* Main Content - 35/65 Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - 35% */}
        <div className="w-full lg:w-[35%] xl:w-[400px] h-full">
          <AlchemySidebar
            status={status}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Right Content - 65% */}
        <div className="hidden lg:block lg:flex-1 h-full relative">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          
          <RitualStage
            status={status}
            progress={progress}
            result={result}
            posePack={posePack}
            generationType={generationType}
            selectedMascot={selectedMascot}
            selectedAvatar={selectedAvatar}
            onSelectMascot={handleSelectMascot}
            onSelectAvatar={handleSelectAvatar}
            onRegenerate={handleRegenerate}
            onGeneratePoses={handleGeneratePoses}
            onBackToSelection={handleBackToSelection}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
