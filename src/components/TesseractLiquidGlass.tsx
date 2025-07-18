'use client';

import React, { useEffect, useRef } from 'react';
import { getGlassScrollManager, LiquidGlassColorAdapter } from '@/lib/liquid-glass';
import { cn } from '@/lib/utils';

interface TesseractLiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'nav' | 'card' | 'interactive';
  enableScrollEffects?: boolean;
  enableColorAdaptation?: boolean;
  enableShimmer?: boolean;
}

export const TesseractLiquidGlass = React.memo(function TesseractLiquidGlass({
  children,
  className = '',
  variant = 'card',
  enableScrollEffects = true,
  enableColorAdaptation = false,
  enableShimmer = false,
}: TesseractLiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorAdapterRef = useRef<LiquidGlassColorAdapter | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Debounce scroll effects initialization
    const initializeEffects = () => {
      // Initialize scroll effects with reduced frequency
      if (enableScrollEffects) {
        const scrollManager = getGlassScrollManager();
        scrollManager.observe(container);
      }

      // Initialize color adaptation with throttling
      if (enableColorAdaptation) {
        if (!colorAdapterRef.current) {
          colorAdapterRef.current = new LiquidGlassColorAdapter();
        }
        colorAdapterRef.current.adaptToBackground(container);

        // Throttled resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (colorAdapterRef.current) {
              colorAdapterRef.current.adaptToBackground(container);
            }
          }, 100); // 100ms throttle
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimeout);
        };
      }
    };

    // Delay initialization to avoid blocking main thread
    const initTimeout = setTimeout(initializeEffects, 16); // Next frame
    return () => clearTimeout(initTimeout);
  }, [enableScrollEffects, enableColorAdaptation]);

  const glassClasses = cn(
    'liquid-glass',
    'performance-glass',
    'liquid-glass-accessible',
    `liquid-glass-${variant}`,
    {
      'glass-layer-stack': variant === 'hero' || variant === 'interactive',
      'glass-shimmer': enableShimmer,
      'liquid-glass-interactive': variant === 'interactive',
    },
    className
  );

  return (
    <div ref={containerRef} className={glassClasses}>
      {children}
    </div>
  );
});
