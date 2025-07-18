'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TesseractLiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'nav' | 'card' | 'interactive';
  enableScrollEffects?: boolean;
  enableColorAdaptation?: boolean;
  enableShimmer?: boolean;
}

export function TesseractLiquidGlassOptimized({
  children,
  className = '',
  variant = 'card',
  enableScrollEffects = false, // Disabled by default for performance
  enableShimmer = false,
}: Omit<TesseractLiquidGlassProps, 'enableColorAdaptation'>) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Only add scroll effects if explicitly enabled and not on hero variant
  useEffect(() => {
    if (!enableScrollEffects || variant === 'hero') return;

    const container = containerRef.current;
    if (!container) return;

    // Simple intersection observer for visibility only
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('liquid-glass-visible');
          } else {
            entry.target.classList.remove('liquid-glass-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [enableScrollEffects, variant]);

  const glassClasses = useMemo(() => cn(
    'liquid-glass-optimized',
    `liquid-glass-${variant}`,
    {
      'glass-layer-simple': variant === 'hero',
      'glass-shimmer': enableShimmer,
      'liquid-glass-interactive': variant === 'interactive',
    },
    className
  ), [variant, enableShimmer, className]);

  return (
    <div ref={containerRef} className={glassClasses}>
      {children}
    </div>
  );
}