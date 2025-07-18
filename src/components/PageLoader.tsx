'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl dark:bg-black/80" />
          
          {/* Loader content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10"
          >
            {/* Animated loader */}
            <div className="relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-brand-primary/20" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-24 w-24 rounded-full border-4 border-transparent border-t-brand-primary"
              />
              
              {/* Inner pulsing circle */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent opacity-20"
              />
              
              {/* Center dot */}
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-brand-primary"
              />
            </div>
            
            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Loading experience...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}