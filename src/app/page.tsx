'use client';

import { Navigation } from '@/components/Navigation';
import { HeroOptimized as Hero } from '@/components/HeroOptimized';
import { VideoPreview } from '@/components/VideoPreview';
import { Features } from '@/components/Features';
import { TechStack } from '@/components/TechStack';
import { Testimonials } from '@/components/Testimonials';
import { Instructor } from '@/components/Instructor';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { EmailCapture } from '@/components/EmailCapture';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { ScrollEmailModal } from '@/components/ScrollEmailModal';
import { BuiltByTesseract } from '@/components/BuiltByTesseract';
import { useToast } from '@/contexts/ToastContext';

export default function Home() {
  const { showToast } = useToast();

  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      showToast({
        type: 'success',
        title: 'Successfully Subscribed! 🎉',
        message: 'Check your email for confirmation and free resources.',
        duration: 6000,
      });

      return data;
    } catch (error) {
      console.error('Email submission error:', error);
      showToast({
        type: 'error',
        title: 'Subscription Failed',
        message: 'Please try again later or contact support.',
        duration: 6000,
      });
      throw error;
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 sm:pt-20">
        <Hero />
        <VideoPreview />
        <Features />
        <TechStack />
        <Testimonials />
        <Instructor />
        <Pricing />
        <FAQ />
        <EmailCapture />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollEmailModal onEmailSubmit={handleEmailSubmit} />
      <BuiltByTesseract />
    </>
  );
}
