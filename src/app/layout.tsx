import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SubtleNodeBackground } from '@/components/SubtleNodeBackground';
import { EmailSubmissionProvider } from '@/contexts/EmailSubmissionContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ClarityProvider } from '@/components/ClarityProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeScript } from '@/components/ThemeScript';
// import { PageLoader } from '@/components/PageLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Your Brand - Modern Web Application',
  description:
    'Build amazing web applications with our comprehensive starter template. Featuring Next.js 15, TypeScript, Tailwind CSS, and modern development tools for creating production-ready applications.',
  keywords:
    'nextjs, react, typescript, tailwind css, web development, starter template, modern web app, full-stack, supabase, framer motion',
  authors: [{ name: 'Your Company' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Your Brand - Modern Web Application Starter',
    description: 'Professional web application starter template with modern tools and best practices. Perfect for building your next project.',
    url: 'https://your-domain.com',
    siteName: 'Your Brand',
    images: [
      {
        url: '/assets/images/og-banner-1280-720.jpeg',
        width: 1280,
        height: 720,
        alt: 'Your Brand - Modern Web Application Starter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Brand - Modern Web Application Starter',
    description: 'Professional web application starter template with modern tools and best practices.',
    images: ['/assets/images/og-banner-1280-720.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={cn(
          inter.className,
          'min-h-screen bg-white dark:bg-[#060606] text-gray-900 dark:text-gray-100 antialiased'
        )}
      >
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ToastProvider>
            <EmailSubmissionProvider>
              <ClarityProvider />
              <SubtleNodeBackground />
              {/* <PageLoader /> */}
              {children}
            </EmailSubmissionProvider>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QHK6F230J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QHK6F230J');
          `}
        </Script>
        
        {process.env.NODE_ENV === 'development' && (
          <Script id="dev-monitoring" strategy="afterInteractive">
            {`console.warn('🚀 Performance monitoring enabled for development');`}
          </Script>
        )}
      </body>
    </html>
  );
}
