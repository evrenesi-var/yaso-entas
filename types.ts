
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  STUDIO = 'STUDIO',
  STORYBOARD = 'STORYBOARD',
  BRANDING = 'BRANDING'
}

// Define ImageSize as per Gemini API requirements for high-quality images
export type ImageSize = '1K' | '2K' | '4K';

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ResearchResult {
  text: string;
  sources: GroundingChunk[];
}

export interface VisualOutput {
  imageUrl: string;
  type: 'render' | 'technical' | 'storyboard' | 'moodboard';
}
