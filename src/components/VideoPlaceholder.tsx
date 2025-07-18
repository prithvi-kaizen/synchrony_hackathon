'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface VideoPlaceholderProps {
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  onPlayClick?: () => void;
  className?: string;
}

export function VideoPlaceholder({
  title,
  subtitle,
  thumbnailUrl,
  onPlayClick,
  className = '',
}: VideoPlaceholderProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Background - gradient fallback if image fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-accent" />

      {/* Thumbnail image */}
      {!imageError && (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => {
            console.warn('Thumbnail failed to load:', thumbnailUrl);
            setImageError(true);
          }}
          onLoad={() => {
            console.warn('Thumbnail loaded successfully');
            setImageError(false);
          }}
        />
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="top-2 left-2 absolute bg-black/50 p-1 rounded text-white text-xs">
          {imageError ? 'Image failed' : 'Image loading...'}
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Play button */}
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.button
          className="bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 backdrop-blur-sm p-6 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayClick}
          aria-label={`Play ${title}`}
        >
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.button>
      </div>

      {/* Video info */}
      <div className="right-4 bottom-4 left-4 absolute">
        <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg">
          <h4 className="font-semibold text-white text-sm">{title}</h4>
          {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
        </div>
      </div>

      {/* Loading indicator (when trying to play actual video) */}
      <div className="top-4 right-4 absolute opacity-0 transition-opacity">
        <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full">
          <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
