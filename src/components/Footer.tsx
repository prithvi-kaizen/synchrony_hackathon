'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Youtube, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

// Responsive logo component
function LogoSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mb-4 h-12 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className="mb-4">
      {/* Desktop: Show full typeface logo */}
      <div className="hidden xl:block">
        <Image
          src={isDark ? '/assets/logos/logo-dark.svg' : '/assets/logos/logo-light.svg'}
          alt="Your Brand"
          width={240}
          height={60}
          className="h-12 w-auto"
        />
      </div>
      
      {/* Mobile & Tablet: Show icon only */}
      <div className="xl:hidden">
        <Image
          src={isDark ? '/assets/logos/icon-dark.svg' : '/assets/logos/icon-light.svg'}
          alt="Your Brand"
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </div>
    </div>
  );
}

const footerLinks: Record<string, FooterLink[]> = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs', external: true },
    { label: 'Community', href: '/community', external: true },
    { label: 'Blog', href: '/blog', external: true },
    { label: 'Help Center', href: '/help', external: true },
  ],
  company: [
    { label: 'About Us', href: '/about', external: true },
    { label: 'Contact', href: '/contact', external: true },
    { label: 'Careers', href: '/careers' },
    { label: 'Enterprise', href: '/enterprise' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/tos' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Refund Policy', href: '/legal/refund' },
  ],
};

const socialLinks = [
  { icon: Youtube, href: 'https://youtube.com/@yourcompany', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/yourcompany', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/yourcompany', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://discord.gg/yourcompany', label: 'Discord' },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#060606] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <LogoSection />
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Build amazing web applications with our modern starter template. Featuring the latest 
              technologies and best practices for creating production-ready applications.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-brand bg-gray-100 transition-colors hover:bg-brand-accent hover:text-white dark:bg-gray-800"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-brand-accent dark:text-gray-400"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
