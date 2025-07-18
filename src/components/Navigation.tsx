'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { StarBorder } from './ui/star-border';
import { GitHubButton } from './GitHubButton';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const externalLinks = [
    { 
      label: 'Vault', 
      href: 'https://autoagentflow.com/',
      external: true
    },
    { 
      label: 'Academy', 
      href: 'https://academy.tesseract.nexus/',
      external: true
    }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50" role="banner">
      <div className={cn(
        'w-full backdrop-blur-md transition-all duration-300 border-b',
        'bg-white/90 dark:bg-gray-900/90',
        'border-gray-200/50 dark:border-gray-700/50',
        scrolled ? 'shadow-sm bg-white/95 dark:bg-gray-900/95' : ''
      )}>
        <div className="w-full px-6">
          <div className="flex h-16 items-center sm:h-20">
            {/* Left Side: Logo, Theme Toggle, and GitHub Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <Link href="/" aria-label="Your Company homepage">
                  {/* Logo Text */}
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center mr-2 sm:mr-3">
                      <span className="text-white font-bold text-sm sm:text-lg">T</span>
                    </div>
                    <span className="hidden md:block text-lg xl:text-xl font-bold text-gray-900 dark:text-gray-100">
                      Your Brand
                    </span>
                  </div>
                </Link>
              </motion.div>
              
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-md px-2 sm:px-3 py-2 text-sm font-medium transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-primary dark:hover:text-white border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              
              {/* GitHub Button - hide on smallest screens */}
              <div className="hidden sm:block">
                <GitHubButton />
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Right Side: Navigation Links and Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center gap-4" role="navigation">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-900 transition-colors hover:text-brand-accent dark:text-gray-100 font-medium text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* External Link Buttons - hide on smaller screens */}
              <div className="hidden xl:flex items-center gap-2">
                {externalLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 min-w-[4rem] whitespace-nowrap",
                      "bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white hover:shadow-md",
                      "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-primary dark:hover:text-white",
                      "border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              {/* Get Started Button - responsive sizing */}
              <a
                href="#pricing"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  "bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white hover:shadow-md",
                  "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-primary dark:hover:text-white",
                  "border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
                )}
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)} 
              className="inline-flex items-center justify-center rounded-md p-2 lg:hidden transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-primary dark:hover:text-white border border-gray-200/50 dark:border-gray-700/50 shadow-sm ml-2"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 md:hidden"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="space-y-4 px-4 py-6">
              {/* GitHub Button in Mobile - show only on small screens */}
              <div className="pb-2 border-b border-gray-200 dark:border-gray-700 sm:hidden">
                <GitHubButton />
              </div>
              
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  {item.label}
                </a>
              ))}
              
              {/* External Links in Mobile */}
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-lg font-medium transition-colors",
                    "bg-gray-100 hover:bg-gray-200 text-gray-900",
                    "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  {link.label}
                </a>
              ))}
              
              <StarBorder 
                as="a"
                href="#pricing"
                color="rgb(224, 57, 47)"
                speed="8s"
                className="no-underline w-full"
              >
                Get Started
              </StarBorder>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}