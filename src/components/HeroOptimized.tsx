'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { HeroEmailCapture } from './HeroEmailCapture';
import { TesseractLiquidGlassOptimized } from './TesseractLiquidGlassOptimized';
import { ContainerScroll } from './ui/container-scroll-animation-optimized';

// Node network background for visual appeal
const NodeNetworkBackground = dynamic(() => import('./NodeNetworkBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-white/80 dark:bg-[#060606]/80" />
});

// Dynamic import for MuxPlayer - commented out as placeholder
// const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-full w-full bg-gradient-to-br from-brand-primary to-brand-accent rounded-lg flex items-center justify-center">
//       <div className="text-white text-center">
//         <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
//         <p className="text-sm">Loading video...</p>
//       </div>
//     </div>
//   )
// });

export function HeroOptimized() {
  const [titleNumber, setTitleNumber] = useState(0);
  const rotatingTexts = useMemo(() => [
    'MODERN APPS',
    'SAAS PRODUCTS', 
    'LANDING PAGES',
    'WEB PLATFORMS',
    'DIGITAL PRODUCTS'
  ], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === rotatingTexts.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, rotatingTexts]);

  const titleComponent = (
    <div className="pt-2 sm:pt-4"> {/* Much smaller top padding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TesseractLiquidGlassOptimized
          variant="interactive"
          enableShimmer={true}
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium"
        >
          <Sparkles className="h-3 w-3 text-brand-accent" />
          <span className="text-gray-900 dark:text-gray-100">Tesseract Creator Template</span>
        </TesseractLiquidGlassOptimized>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-2 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl text-center tracking-tight"
      >
        <div className="mb-1">Build</div>
        <div className="relative flex justify-center overflow-hidden py-1" style={{ height: '3.5rem' }}>
          &nbsp;
          {rotatingTexts.map((text, index) => (
            <motion.span
              key={index}
              className="absolute font-black gradient-text text-2xl sm:text-3xl lg:text-4xl tracking-tight"
              style={{ top: '0.4rem' }}
              initial={{ opacity: 0, y: "-100" }}
              transition={{ type: "spring", stiffness: 50 }}
              animate={
                titleNumber === index
                  ? {
                      y: 0,
                      opacity: 1,
                    }
                  : {
                      y: titleNumber > index ? -150 : 150,
                      opacity: 0,
                    }
              }
            >
              {text}
            </motion.span>
          ))}
        </div>
        <div className="-mt-1">That Users Love</div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mb-3 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg"
      >
The ultimate Next.js 15 starter template with TypeScript, Tailwind CSS, and Supabase integration. Build modern SaaS applications, landing pages, and digital products with our comprehensive development framework.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 flex justify-center"
      >
        <TesseractLiquidGlassOptimized variant="interactive" enableShimmer={true}>
          <button 
            className="btn-primary group"
            onClick={() => {
              // Add your project URL here
              // Example: window.location.href = '/pricing';
            }}
          >
Get Started Now
            <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </TesseractLiquidGlassOptimized>
      </motion.div>
    </div>
  );

  return (
    <section className="relative overflow-hidden pb-4">
      <NodeNetworkBackground />

      <ContainerScroll titleComponent={titleComponent}>
        <div className="h-full w-full rounded-lg overflow-hidden">
          {/* Replace with your video */}
          <div className="h-full w-full bg-gradient-to-br from-brand-primary to-brand-accent rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-lg font-medium">Your Product Demo</p>
              <p className="text-sm opacity-75 mt-2">Add your showcase video or interactive demo here</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
      
      {/* Email capture overlapping video frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-20 -mt-14 flex justify-center px-4 pb-12"
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 p-6 max-w-2xl w-full">
          <HeroEmailCapture />
        </div>
      </motion.div>
      
    </section>
  );
}