'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, FileText, Shield, Cookie, FileCheck, AlertCircle, ScrollText } from 'lucide-react';

const legalPages = [
  { 
    title: 'Privacy Policy', 
    href: '/legal/privacy',
    icon: Shield,
    description: 'How we collect, use, and protect your data'
  },
  { 
    title: 'Terms of Service', 
    href: '/legal/tos',
    icon: FileText,
    description: 'Terms and conditions for using our services'
  },
  { 
    title: 'Cookie Policy', 
    href: '/legal/cookies',
    icon: Cookie,
    description: 'How we use cookies and tracking technologies'
  },
  { 
    title: 'Acceptable Use', 
    href: '/legal/acceptable-use',
    icon: FileCheck,
    description: 'Guidelines for appropriate platform usage'
  },
  { 
    title: 'End User License Agreement', 
    href: '/legal/eula',
    icon: ScrollText,
    description: 'Software licensing terms and conditions'
  },
  { 
    title: 'Legal Disclaimer', 
    href: '/legal/disclaimer',
    icon: AlertCircle,
    description: 'Important legal disclaimers and limitations'
  },
];

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function LegalLayout({ children, title }: LegalLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <Navigation />
      
      <div className="flex min-h-screen pt-24">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#060606]">
          <div className="sticky top-24 p-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors mb-8">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Legal Documents</h2>
            
            <nav className="space-y-2">
              {legalPages.map((page) => {
                const Icon = page.icon;
                const isActive = pathname === page.href;
                
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-brand-primary/10 text-brand-primary border-l-4 border-brand-primary" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    )}
                  >
                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{page.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile navigation */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 z-40">
          <div className="p-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <select
              value={pathname}
              onChange={(e) => window.location.href = e.target.value}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              {legalPages.map((page) => (
                <option key={page.href} value={page.href}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mb-12 mt-20"
          />
          
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-gray dark:prose-invert max-w-none"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">{title}</h1>
            {children}
          </motion.article>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}