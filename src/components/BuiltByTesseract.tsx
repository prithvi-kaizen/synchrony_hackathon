'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function BuiltByTesseract() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://tesseract-creator.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-0.5 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/25"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        
        {/* Animated sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative flex items-center gap-3 bg-gray-900/90 px-6 py-4 rounded-2xl backdrop-blur-sm">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Built by</span>
              <motion.div
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="h-3 w-3 text-white/70" />
              </motion.div>
            </div>
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-lg font-bold text-transparent">
              Tesseract
            </span>
          </div>
        </div>

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-white"
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.5, opacity: 0.1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: '25%', top: '15%' },
          { left: '70%', top: '80%' },
          { left: '45%', top: '50%' }
        ].map((position, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}