'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useEmailSubscription } from '@/hooks/useEmailSubscription';
import { useEmailSubmission } from '@/contexts/EmailSubmissionContext';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';
import confetti from 'canvas-confetti';

export function HeroEmailCapture() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { subscribe, isLoading, error, success } = useEmailSubscription();
  const { setHasSubmittedEmail, setUserEmail } = useEmailSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !firstName.trim()) return;

    const result = await subscribe(email, 'hero', {
      firstName: firstName.trim(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      page: 'landing-hero',
    });

    // Check if the API call was successful 
    const isSuccessful = result.alreadySubscribed || (result.message && !result.error) || success;
    
    if (isSuccessful) {
      setIsSubmitted(true);
      setHasSubmittedEmail(true);
      setUserEmail(email);
      
      // Trigger confetti for successful submissions
      if (result.showConfetti) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#da3229', '#e0392f', '#ffffff'],
        });
      }
      
      // Clear form fields
      setEmail('');
      setFirstName('');
    }
  };

  if (isSubmitted || success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <TesseractLiquidGlass
          variant="interactive"
          enableShimmer={true}
          className="flex items-center justify-center gap-3 border border-green-200 bg-green-50 px-6 py-4 dark:border-green-800 dark:bg-green-900/20"
        >
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="font-medium text-green-700 dark:text-green-300">
            Thanks! Check your email for exclusive bonuses.
          </span>
        </TesseractLiquidGlass>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mx-auto max-w-2xl w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inline inputs with separator */}
          <div className="flex gap-0">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="h-12 flex-1 min-w-0 rounded-l-full border border-r-0 border-gray-200 bg-white/50 px-4 text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-brand-accent focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:z-10 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-800"
              required
              disabled={isLoading}
            />
            
            {/* Separator line */}
            <div className="w-px bg-gray-300 dark:bg-gray-600 self-stretch my-2"></div>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-12 flex-1 min-w-0 rounded-r-full border border-l-0 border-gray-200 bg-white/50 px-4 text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-brand-accent focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:z-10 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-800"
              required
              disabled={isLoading}
            />
          </div>

        <motion.button
          type="submit"
          disabled={isLoading || !email.trim() || !firstName.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative h-12 w-full overflow-hidden rounded-full bg-gradient-to-r from-brand-primary to-brand-accent font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="relative z-10 flex h-full w-full items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <span>Get Free Bonus Materials</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </div>
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Get instant access to 5 exclusive automation templates + course preview
        </p>
        </form>
    </motion.div>
  );
}
