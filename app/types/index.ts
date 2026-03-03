export type GenerationType = 'mascot_only' | 'avatar_only' | 'both';
export type BrandTone = 'Playful' | 'Professional' | 'Mystic' | 'Bold';
export type GenerationStatus = 'idle' | 'generating' | 'manifesting' | 'selecting' | 'generating_poses' | 'completed';

export interface BrandDNA {
  businessName: string;
  industry: string;
  brandTone: BrandTone;
  primaryColor: string;
  targetAudience: string;
  specialNotes?: string;
  generationType: GenerationType;
  numberOfGenerations?: number; // 1-4 for single type, 2 or 4 for both
}

export interface ImageOption {
  id: string;
  imageUrl: string;
  seed: number;
  prompt: string;
  type: 'mascot' | 'avatar';
}

export interface GenerationResult {
  id: string;
  projectId: string;
  mascotOptions: ImageOption[];
  avatarOptions: ImageOption[];
  brandStory: string;
  primaryColor: string;
  mascotPrompt?: string;
  avatarPrompt?: string;
}

// Keep for backward compatibility
export interface MascotOption extends ImageOption {}
export interface AvatarOption extends ImageOption {}

export interface Project {
  id: string;
  brandDNA: BrandDNA;
  status: GenerationStatus;
  result?: GenerationResult;
  createdAt: Date;
}

export type PoseType = 'standing' | 'waving' | 'thumbsUp' | 'holdingLaptop' | 'thinking' | 'celebrating';

export interface PosePack {
  mascotPoses: Pose[];
  avatarPoses: Pose[];
}

export interface Pose {
  type: PoseType;
  imageUrl: string;
}

export interface FeedbackRequest {
  projectId: string;
  feedback: string;
  type: 'mascot' | 'avatar' | 'both';
  currentPrompt?: string;
}

export interface PosePackRequest {
  projectId: string;
  selectedMascotId?: string;
  selectedAvatarId?: string;
  mascotPrompt?: string;
  avatarPrompt?: string;
}

export interface PosePackResult {
  projectId: string;
  mascotPoses: ImageOption[];
  avatarPoses: ImageOption[];
}
