'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
  placeholder?: string;
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2';
  priority?: boolean;
}

export function MediaImage({
  src,
  alt,
  className = '',
  placeholder,
  aspectRatio = '4/3',
  priority = false,
}: MediaImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!src || hasError) {
    // Placeholder when no image provided or error occurs
    return (
      <div
        className={`${aspectClasses[aspectRatio]} flex items-center justify-center rounded-brand-xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 ${className}`}
      >
        <div className="text-center">
          <ImageIcon className="mx-auto mb-4 h-16 w-16 text-brand-accent" />
          <p className="font-medium text-gray-600 dark:text-gray-400">
            {placeholder || 'Image Placeholder'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">(Image URL to be provided)</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`${aspectClasses[aspectRatio]} relative overflow-hidden rounded-brand-xl ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-accent/10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-accent border-t-transparent" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
      />
    </motion.div>
  );
}
