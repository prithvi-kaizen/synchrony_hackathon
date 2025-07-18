'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GitHubStats {
  stars: number;
  forks: number;
}

export function GitHubButton() {
  const [stats, setStats] = useState<GitHubStats>({ stars: 0, forks: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/tesseract-creator/nextjs-supabase-2025-starter', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats({
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
        });
      } catch {
        // Use realistic fallback values that won't be confused with real data
        setStats({ stars: 1, forks: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if in browser
    if (typeof window !== 'undefined') {
      fetchGitHubStats();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <motion.a
      href="https://github.com/tesseract-creator/nextjs-supabase-2025-starter"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
        "bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white hover:shadow-md",
        "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-primary dark:hover:text-white"
      )}
      aria-label="Star on GitHub"
    >
      <Star className="h-4 w-4" />
      <span className="hidden sm:inline">Fork This Repository</span>
      <span className={cn(
        "px-2 py-0.5 rounded-full text-xs font-semibold min-w-[1.5rem] text-center",
        "bg-gray-200 text-gray-700",
        "dark:bg-gray-700 dark:text-gray-300"
      )}>
        {isLoading ? '...' : stats.stars}
      </span>
    </motion.a>
  );
}