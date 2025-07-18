'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock } from 'lucide-react';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.warn('Email submitted:', email);
  };

  return (
    <section className="bg-white dark:bg-[#060606] px-4 sm:px-6 lg:px-8 py-16 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TesseractLiquidGlass
              variant="hero"
              enableColorAdaptation={true}
              enableShimmer={true}
              className="shadow-brand-xl p-8 sm:p-12 rounded-brand-xl"
            >
              {/* Commented out for now - Join automation pioneers section */}
              {/*
              <div className="mb-8 text-center">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-4 font-bold text-3xl sm:text-4xl tracking-tight">
                    Join 109 Automation Pioneers
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Get instant access to the full course and start building today
                  </p>
                </div>
              </div>
              */}

              {/* Countdown Timer */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 bg-brand-accent/10 px-6 py-3 rounded-brand font-mono text-brand-accent text-xl">
                  <Clock className="w-5 h-5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Email Form */}
              <form
                onSubmit={handleSubmit}
                className="flex sm:flex-row flex-col gap-4 mx-auto max-w-lg"
              >
                <div className="relative flex-1">
                  <Mail className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-white dark:bg-brand-dark py-4 pr-4 pl-12 border border-gray-200 dark:border-gray-700 rounded-brand focus:outline-none focus:ring-2 focus:ring-brand-accent w-full"
                  />
                </div>
                <button type="submit" className="whitespace-nowrap btn-primary">
                  Get Instant Access
                </button>
              </form>

              <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                🔒 Your information is 100% secure. No spam, ever.
              </p>
            </TesseractLiquidGlass>
          </motion.div>
        </div>
      </section>
  );
}
