'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Gift, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollEmailModalProps {
  onEmailSubmit?: (email: string) => Promise<void>;
}

export function ScrollEmailModal({ onEmailSubmit }: ScrollEmailModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;

      // Get the third component (assuming it's Features after Hero and VideoPreview)
      const components = document.querySelectorAll('main > div, main > section');
      const thirdComponent = components[2]; // 0: Hero, 1: VideoPreview, 2: Features

      if (thirdComponent) {
        const rect = thirdComponent.getBoundingClientRect();
        const isPassedThirdComponent = rect.top <= window.innerHeight;

        if (isPassedThirdComponent && !hasShown) {
          setIsVisible(true);
          setHasShown(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      if (onEmailSubmit) {
        await onEmailSubmit(email);
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (error) {
      console.error('Email submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md"
            >
              <div className={cn(
                "relative w-full p-6 rounded-2xl",
                "bg-white dark:bg-gray-900",
                "border border-gray-200 dark:border-gray-700",
                "shadow-2xl"
              )}>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>

              {!isSuccess ? (
                <div className="text-center">
                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full flex items-center justify-center mb-4">
                    <Gift className="h-8 w-8 text-white" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Get Free Resources! 🎁
                  </h2>
                  
                  {/* Subheading */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Join our community and get exclusive access to:
                  </p>

                  {/* Benefits List */}
                  <div className="text-left mb-6 space-y-2">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-brand-accent flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Free starter templates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-brand-accent flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Exclusive updates and features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-brand-accent flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Early access to new releases</span>
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className={cn(
                          "w-full pl-10 pr-4 py-3 rounded-lg border",
                          "bg-white dark:bg-gray-800",
                          "border-gray-300 dark:border-gray-600",
                          "text-gray-900 dark:text-gray-100",
                          "placeholder-gray-500 dark:placeholder-gray-400",
                          "focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                          "transition-all duration-200"
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300",
                        "bg-brand-primary text-white",
                        "hover:bg-brand-secondary hover:shadow-lg hover:shadow-brand-accent/25 hover:-translate-y-0.5",
                        "active:scale-95",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-primary disabled:hover:transform-none"
                      )}
                    >
                      {isSubmitting ? 'Getting Your Resources...' : 'Get Free Resources'}
                    </button>
                  </form>

                  {/* Trust Badge */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    No spam, unsubscribe anytime. Join 1000+ developers.
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Welcome to the community! 🎉
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Check your email for your free resources and confirmation link.
                  </p>
                </div>
              )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}