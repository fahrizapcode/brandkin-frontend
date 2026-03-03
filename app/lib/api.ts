import { BrandDNA, GenerationResult, GenerationStatus, FeedbackRequest, PosePackRequest, PosePackResult, ImageOption } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface GenerationProgress {
  status: GenerationStatus;
  progress: number;
  result?: GenerationResult;
}

export type ProgressCallback = (progress: GenerationProgress) => void;

// Backend API response types
interface BackendInitResponse {
  projectId: string;
  mascotOptions: ImageOption[];
  avatarOptions: ImageOption[];
  brandStory: string;
  primaryColorHex: string;
  mascotPrompt?: string;
  avatarPrompt?: string;
}

// Initialize project and generate initial images
export async function initProject(brandDNA: BrandDNA): Promise<GenerationResult> {
  const response = await fetch(`${API_BASE_URL}/v1/project/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brandDNA),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to initialize project");
  }

  const data: BackendInitResponse = await response.json();

  return {
    id: data.projectId,
    projectId: data.projectId,
    mascotOptions: data.mascotOptions,
    avatarOptions: data.avatarOptions,
    brandStory: data.brandStory,
    primaryColor: data.primaryColorHex,
    mascotPrompt: data.mascotPrompt,
    avatarPrompt: data.avatarPrompt,
  };
}

// Regenerate images based on feedback
export async function regenerateImages(request: FeedbackRequest): Promise<GenerationResult> {
  const response = await fetch(`${API_BASE_URL}/v1/project/${request.projectId}/regenerate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to regenerate images");
  }

  const data: BackendInitResponse = await response.json();

  return {
    id: data.projectId,
    projectId: data.projectId,
    mascotOptions: data.mascotOptions,
    avatarOptions: data.avatarOptions,
    brandStory: data.brandStory,
    primaryColor: data.primaryColorHex,
    mascotPrompt: data.mascotPrompt,
    avatarPrompt: data.avatarPrompt,
  };
}

// Generate pose pack for selected images
export async function generatePosePack(request: PosePackRequest): Promise<PosePackResult> {
  const response = await fetch(`${API_BASE_URL}/v1/project/${request.projectId}/pose-pack`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to generate pose pack");
  }

  return await response.json();
}

// Gallery item type
export interface GalleryItem {
  id: number;
  imageUrl: string;
  assetType: 'mascot' | 'avatar';
  businessName?: string;
  createdAt?: string;
}

// Fetch latest generated images for gallery
export async function fetchGallery(limit = 6): Promise<GalleryItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/gallery?limit=${limit}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.items as GalleryItem[];
  } catch {
    return [];
  }
}

// Download image
export async function downloadImage(imageUrl: string, filename: string): Promise<void> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Main generation function with progress simulation
export async function generateBrandIdentity(
  brandDNA: BrandDNA,
  onProgress: ProgressCallback
): Promise<GenerationResult> {
  // Simulate progress during API call - slowed down by 1.5x
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 1.33; // Reduced from 2 to slow down progress
    if (progress >= 90) {
      clearInterval(progressInterval);
    }
    onProgress({
      status: progress < 50 ? "generating" : "manifesting",
      progress: Math.min(progress, 90),
    });
  }, 300); // Increased from 200ms to 300ms (1.5x slower)

  try {
    const result = await initProject(brandDNA);
    clearInterval(progressInterval);
    onProgress({
      status: "selecting",
      progress: 100,
      result,
    });
    return result;
  } catch (error) {
    clearInterval(progressInterval);
    throw error;
  }
}
