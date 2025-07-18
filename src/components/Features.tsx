'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code2, Workflow, Link, Image, Database, FileCode, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';

const features = [
  {
    id: 1,
    title: 'Modern Development Stack',
    description: 'Built with Next.js 15, TypeScript, and Tailwind CSS for optimal performance',
    icon: 'code',
    highlights: ['TypeScript support', 'Responsive design', 'Performance optimized']
  },
  {
    id: 2,
    title: 'Beautiful UI Components',
    description: 'Pre-built components with animations and dark mode support',
    icon: 'workflow',
    highlights: ['Framer Motion animations', 'Dark/light themes', 'Mobile responsive']
  },
  {
    id: 3,
    title: 'Database Integration',
    description: 'Supabase integration ready for authentication and data management',
    icon: 'database',
    highlights: ['User authentication', 'Real-time data', 'Scalable backend']
  },
  {
    id: 4,
    title: 'Email & Analytics',
    description: 'Email capture with analytics tracking built-in',
    icon: 'chain',
    highlights: ['Email marketing', 'User analytics', 'Conversion tracking']
  },
  {
    id: 5,
    title: 'SEO Optimized',
    description: 'Built-in SEO optimization and meta tags for better search rankings',
    icon: 'image',
    highlights: ['Meta tags', 'Open Graph', 'Search optimization']
  },
  {
    id: 6,
    title: 'Developer Experience',
    description: 'Full TypeScript support with ESLint, Prettier, and testing setup',
    icon: 'schema',
    highlights: ['Code quality', 'Testing framework', 'Development tools']
  },
  {
    id: 7,
    title: 'Bubble APEX Interactive Landing Page',
    description: '🔥 80% OFF with code VAULT11 - Premium interactive landing page template',
    icon: 'workflow',
    highlights: ['Interactive animations', 'Modern design system', 'Conversion optimized'],
    promotion: {
      discount: '80% OFF',
      code: 'VAULT11',
      originalPrice: '$299',
      salePrice: '$59'
    }
  }
];

const iconMap = {
  workflow: Workflow,
  code: Code2,
  chain: Link,
  image: Image,
  database: Database,
  schema: FileCode,
  content: Layers
};

export function Features() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpanded = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Get Started
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive starter template with modern tools and best practices built-in.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Code2;
            const isExpanded = expandedItem === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TesseractLiquidGlass variant="card" className="overflow-hidden">
                  <button
                    onClick={() => toggleExpanded(feature.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                          {feature.promotion && (
                            <div className="flex items-center gap-2">
                              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md animate-pulse">
                                🔥 {feature.promotion.discount}
                              </span>
                              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md border border-green-400/50">
                                💎 {feature.promotion.code}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                        {feature.promotion && (
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm line-through text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {feature.promotion.originalPrice}
                            </span>
                            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {feature.promotion.salePrice}
                            </span>
                            <span className="text-xs text-gray-500 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                              Limited Time
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-gray-400 transition-transform",
                        isExpanded && "rotate-180"
                      )} 
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="p-6 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {feature.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-brand-accent rounded-full"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TesseractLiquidGlass>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}