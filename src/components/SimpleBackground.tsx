'use client';

import { motion } from 'framer-motion';

export default function SimpleBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* Simple gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#060606] dark:via-[#0a0a0a] dark:to-[#0f0f0f]" />
      
      {/* Subtle geometric pattern */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(224, 57, 47, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(218, 50, 41, 0.08) 0%, transparent 50%),
            linear-gradient(45deg, transparent 45%, rgba(224, 57, 47, 0.03) 50%, transparent 55%)
          `,
          backgroundSize: '400px 400px, 600px 600px, 100px 100px'
        }}
      />
      
      {/* Light overlay for final toning */}
      <div className="absolute inset-0 bg-white/50 dark:bg-[#060606]/55" />
    </motion.div>
  );
}