'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function ConfirmEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the hash fragment from the URL (Supabase puts tokens there)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'email' && accessToken) {
          // Set the session with the tokens
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (error) {
            console.error('Session error:', error);
            setStatus('error');
            setMessage('Failed to confirm email. Please try again.');
            return;
          }

          if (data.user?.email) {
            // Update the subscriber as confirmed
            const { error: updateError } = await supabase
              .from('email_subscribers')
              .update({ confirmed: true })
              .eq('email', data.user.email);

            if (updateError) {
              console.error('Update error:', updateError);
            }

            setStatus('success');
            setMessage('Email confirmed successfully! Welcome to our community.');
          } else {
            setStatus('error');
            setMessage('Invalid confirmation link.');
          }
        } else {
          setStatus('error');
          setMessage('Invalid or expired confirmation link.');
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setMessage('An error occurred while confirming your email.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
      >
        {status === 'loading' && (
          <>
            <div className="animate-spin w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Confirming Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we confirm your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Email Confirmed! 🎉
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  Check your email for your free resources!
                </span>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Confirmation Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need help? Contact our support team.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="animate-spin w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full"></div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  );
}