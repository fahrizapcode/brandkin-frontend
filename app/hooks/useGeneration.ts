"use client";

import { useState, useCallback } from "react";
import { BrandDNA, GenerationResult, GenerationStatus, FeedbackRequest, PosePackRequest, PosePackResult, ImageOption } from "../types";
import { generateBrandIdentity, regenerateImages, generatePosePack, GenerationProgress } from "../lib/api";

interface UseGenerationReturn {
  status: GenerationStatus;
  progress: number;
  result?: GenerationResult;
  posePack?: PosePackResult;
  isLoading: boolean;
  error?: string;
  selectedMascot?: ImageOption;
  selectedAvatar?: ImageOption;
  startGeneration: (brandDNA: BrandDNA) => Promise<void>;
  regenerate: (feedback: string, type: 'mascot' | 'avatar' | 'both') => Promise<void>;
  generatePoses: () => Promise<void>;
  selectMascot: (mascot: ImageOption) => void;
  selectAvatar: (avatar: ImageOption) => void;
  reset: () => void;
}

export function useGeneration(): UseGenerationReturn {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<GenerationResult | undefined>(undefined);
  const [posePack, setPosePack] = useState<PosePackResult | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedMascot, setSelectedMascot] = useState<ImageOption | undefined>(undefined);
  const [selectedAvatar, setSelectedAvatar] = useState<ImageOption | undefined>(undefined);

  const handleProgress = useCallback((update: GenerationProgress) => {
    setStatus(update.status);
    setProgress(update.progress);
    if (update.result) {
      setResult(update.result);
    }
  }, []);

  const startGeneration = useCallback(
    async (brandDNA: BrandDNA) => {
      try {
        setError(undefined);
        setStatus("generating");
        setProgress(0);
        setResult(undefined);
        setPosePack(undefined);
        setSelectedMascot(undefined);
        setSelectedAvatar(undefined);

        // Slow down the generation by 1.5x (multiply delays by 1.5)
        const slowProgress: typeof handleProgress = (update) => {
          handleProgress(update);
        };

        await generateBrandIdentity(brandDNA, slowProgress);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setStatus("idle");
      }
    },
    [handleProgress]
  );

  const regenerate = useCallback(
    async (feedback: string, type: 'mascot' | 'avatar' | 'both') => {
      if (!result) return;
      
      try {
        setError(undefined);
        setStatus("generating");
        setProgress(0);

        const request: FeedbackRequest = {
          projectId: result.projectId,
          feedback,
          type,
        };

        // Simulate progress - slowed down by 1.5x
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 3.33; // Reduced from 5
            if (next >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return next;
          });
        }, 300); // Increased from 200ms to 300ms

        const newResult = await regenerateImages(request);
        clearInterval(progressInterval);

        setResult(newResult);
        setStatus("selecting");
        setProgress(100);
        
        // Clear selections when regenerating
        if (type === 'mascot' || type === 'both') {
          setSelectedMascot(undefined);
        }
        if (type === 'avatar' || type === 'both') {
          setSelectedAvatar(undefined);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to regenerate images"
        );
        setStatus("selecting");
      }
    },
    [result]
  );

  const generatePoses = useCallback(
    async () => {
      if (!result) return;
      
      try {
        setError(undefined);
        setStatus("generating_poses");
        setProgress(0);

        const request: PosePackRequest = {
          projectId: result.projectId,
          selectedMascotId: selectedMascot?.id,
          selectedAvatarId: selectedAvatar?.id,
          mascotPrompt: result.mascotPrompt,
          avatarPrompt: result.avatarPrompt,
        };

        // Simulate progress - slowed down by 1.5x
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 2; // Reduced from 3
            if (next >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return next;
          });
        }, 450); // Increased from 300ms to 450ms

        const newPosePack = await generatePosePack(request);
        clearInterval(progressInterval);

        setPosePack(newPosePack);
        setStatus("completed");
        setProgress(100);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate pose pack"
        );
        setStatus("selecting");
      }
    },
    [result, selectedMascot, selectedAvatar]
  );

  const selectMascot = useCallback((mascot: ImageOption) => {
    setSelectedMascot(mascot);
  }, []);

  const selectAvatar = useCallback((avatar: ImageOption) => {
    setSelectedAvatar(avatar);
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setResult(undefined);
    setPosePack(undefined);
    setError(undefined);
    setSelectedMascot(undefined);
    setSelectedAvatar(undefined);
  }, []);

  return {
    status,
    progress,
    result,
    posePack,
    isLoading: status === "generating" || status === "manifesting" || status === "generating_poses",
    error,
    selectedMascot,
    selectedAvatar,
    startGeneration,
    regenerate,
    generatePoses,
    selectMascot,
    selectAvatar,
    reset,
  };
}
