'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ContainerScroll } from './ui/container-scroll-animation-optimized';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';
import useEmblaCarousel from 'embla-carousel-react';

// Dynamic import for MuxPlayer
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), {
  ssr: false,
});

export const VideoPreview = React.memo(function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const titleComponent = (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">
        See Your <span className="gradient-text">Application</span> in Action
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Experience the power of our modern web application template with real-world functionality and beautiful design
      </p>
    </div>
  );

  return (
    <section className="pt-12 pb-20 bg-white dark:bg-[#060606]">
      <ContainerScroll titleComponent={titleComponent}>
        <div className="h-full w-full rounded-lg overflow-hidden">
          {!isPlaying ? (
            <div className="relative h-full">
              {/* Video Thumbnail */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group flex h-24 w-24 items-center justify-center rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                >
                  <Play className="ml-1 h-10 w-10 text-white transition-transform group-hover:scale-110" />
                </button>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  Live Build: Sequential Orchestration Pipeline™
                </h3>
                <div className="flex flex-wrap gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    12 min preview
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    2.8K students
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    4.9/5 rating
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <MuxPlayer
              playbackId="3TrhHX1Lr00IseXZdb3oOVyP7WnMvpUyVDL8wh99c8YQ"
              primaryColor="#da3229"
              accentColor="#ffffff"
              secondaryColor="#00000e"
              autoPlay={true}
              muted={true}
              controls={true}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      </ContainerScroll>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Workflow Images Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 px-4"
        >
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">
            See the <span className="gradient-text">Features in Action</span>
          </h2>
          
          <div className="relative mx-auto max-w-4xl px-4 sm:px-8 lg:px-12 py-8">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {[
                  { 
                    image: '/assets/images/feature-showcase-1.webp',
                    title: 'Modern Dashboard Interface',
                    description: 'Clean and intuitive user interface design'
                  },
                  { 
                    image: '/assets/images/feature-showcase-2.webp',
                    title: 'Responsive Mobile Design',
                    description: 'Perfect mobile experience across all devices'
                  },
                  { 
                    image: '/assets/images/feature-showcase-3.webp',
                    title: 'Advanced Data Management',
                    description: 'Powerful data handling and visualization'
                  },
                  { 
                    image: '/assets/images/feature-showcase-4.webp',
                    title: 'Integration Capabilities',
                    description: 'Seamless third-party service integration'
                  },
                  { 
                    image: '/assets/images/feature-showcase-5.webp',
                    title: 'Production-Ready Architecture',
                    description: 'Scalable and maintainable code structure'
                  },
                ].map((workflow, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="group cursor-pointer transition-transform hover:scale-[1.02]">
                      <TesseractLiquidGlass
                        variant="card"
                        enableScrollEffects={false}
                        enableShimmer={false}
                        className="overflow-hidden border border-gray-200/50 shadow-brand transition-all duration-700 group-hover:border-brand-primary group-hover:shadow-brand-lg dark:border-gray-700/50"
                      >
                        <div className="aspect-video relative overflow-hidden rounded-t-brand">
                          <img
                            src={workflow.image}
                            alt={workflow.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {workflow.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {workflow.description}
                          </p>
                        </div>
                      </TesseractLiquidGlass>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-all hover:bg-white hover:scale-110 dark:bg-gray-800/90 dark:hover:bg-gray-800 z-10"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-all hover:bg-white hover:scale-110 dark:bg-gray-800/90 dark:hover:bg-gray-800 z-10"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
