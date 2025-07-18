// Media configuration and helpers

export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  url?: string;
  muxPlaybackId?: string;
  alt?: string;
  title?: string;
  description?: string;
}

// Placeholder media assets - replace with actual URLs when available
export const mediaAssets: Record<string, MediaAsset> = {
  // Ebook Resources
  'ebook-hero': {
    id: 'ebook-hero',
    type: 'image',
    url: '', // To be provided
    alt: 'Free Implementation Ebooks Collection',
    title: 'Comprehensive Automation Guides',
  },

  // Flowise Tools
  'flowise-tools': {
    id: 'flowise-tools',
    type: 'image',
    url: '', // To be provided
    alt: 'Flowise Agents and Custom Tools Pack',
    title: 'Premium Automation Tools',
  },

  // Nodeverse Graphic Novel
  'nodeverse-cover': {
    id: 'nodeverse-cover',
    type: 'image',
    url: '', // To be provided
    alt: 'Nodeverse: Adventures of Tesseractian McMartian',
    title: 'Interactive Graphic Novel',
  },

  // Course Preview Video
  'course-preview': {
    id: 'course-preview',
    type: 'video',
    muxPlaybackId: '', // To be provided
    title: 'n8n Masterclass Preview',
    description: "Get a sneak peek of what you'll learn",
  },

  // Additional video content
  'demo-workflow': {
    id: 'demo-workflow',
    type: 'video',
    muxPlaybackId: '', // To be provided
    title: 'Live Workflow Demo',
    description: 'See automation in action',
  },
};

// Helper function to get media asset
export function getMediaAsset(id: string): MediaAsset | undefined {
  return mediaAssets[id];
}

// Helper function to check if media is available
export function isMediaAvailable(asset: MediaAsset): boolean {
  if (asset.type === 'image') {
    return !!asset.url;
  }
  if (asset.type === 'video') {
    return !!asset.muxPlaybackId;
  }
  return false;
}
