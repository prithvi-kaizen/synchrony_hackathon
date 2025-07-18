'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';
// import { SupportPopup } from './SupportPopup'; // Removed in template

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What technologies are included in this template?',
        a: 'The Tesseract template includes Next.js 15, TypeScript, Tailwind CSS, Framer Motion for animations, Supabase integration, email capture functionality, and a complete component library with dark mode support.',
      },
      {
        q: 'How quickly can I get my project up and running?',
        a: 'Most developers can have a fully functional application running within hours. The template includes all necessary configurations, components, and examples to accelerate your development process.',
      },
      {
        q: 'Do I need experience with these technologies?',
        a: "Basic knowledge of React and TypeScript is helpful, but the template includes comprehensive documentation and examples to help developers of all skill levels get started quickly.",
      },
    ],
  },
  {
    category: 'Features & Customization',
    questions: [
      {
        q: 'Can I customize the design and branding?',
        a: 'Absolutely! The template uses CSS custom properties and a flexible design system. You can easily customize colors, fonts, spacing, and all visual elements to match your brand identity.',
      },
      {
        q: 'What types of projects is this template suitable for?',
        a: 'SaaS applications, landing pages, e-commerce sites, portfolios, marketing websites, and any modern web application. The modular architecture makes it adaptable to various use cases.',
      },
      {
        q: 'Are the components production-ready?',
        a: 'Yes! All components are built with best practices, accessibility in mind, proper TypeScript types, and optimized for performance. They include error handling, loading states, and responsive design.',
      },
    ],
  },
  {
    category: 'Technical Details',
    questions: [
      {
        q: 'Is the template regularly updated?',
        a: 'Yes! We keep the template updated with the latest versions of Next.js, TypeScript, and other dependencies. You get access to all updates and improvements as they become available.',
      },
      {
        q: 'What kind of support do you provide?',
        a: "The template includes comprehensive documentation, code examples, and setup guides. For additional support, you can reach out through our contact channels for assistance with implementation.",
      },
      {
        q: 'How does this compare to building from scratch?',
        a: 'This template saves weeks of initial setup and configuration. Instead of spending time on boilerplate code, you can focus on your unique business logic and features while leveraging proven, tested components.',
      },
    ],
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  // Support popup removed in template

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="bg-white dark:bg-[#060606] px-4 sm:px-6 lg:px-8 py-16 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <TesseractLiquidGlass
            variant="interactive"
            enableShimmer={true}
            className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full font-medium text-sm"
          >
            <HelpCircle className="w-4 h-4 text-brand-accent" />
            <span>Frequently Asked Questions</span>
          </TesseractLiquidGlass>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl tracking-tight">Everything You Need to Know</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              Get answers to common questions about the template
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="mb-4 font-semibold text-brand-accent text-2xl tracking-tight">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((item, index) => {
                  const id = `${categoryIndex}-${index}`;
                  const isOpen = openItems.includes(id);

                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <TesseractLiquidGlass
                        variant="card"
                        enableScrollEffects={true}
                        enableShimmer={isOpen}
                        className="shadow-brand group-hover:shadow-brand-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:border-brand-primary rounded-brand-lg overflow-hidden transition-all duration-700"
                      >
                        <button
                          onClick={() => toggleItem(id)}
                          className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 px-6 py-4 w-full transition-colors"
                        >
                          <span className="font-medium text-left text-gray-900 dark:text-gray-100">{item.q}</span>
                          <ChevronDown
                            className={cn(
                              'ml-4 h-5 w-5 flex-shrink-0 transition-transform text-brand-accent',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-gray-200 dark:border-gray-700 border-t"
                            >
                              <div className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </TesseractLiquidGlass>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-brand-lg text-center glass-effect"
        >
          <h3 className="mb-4 font-semibold text-2xl tracking-tight">Still Have Questions?</h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Our team is here to help you make the right decision
          </p>
          <button 
            onClick={() => {
              // Add your contact page URL here
              // Example: window.location.href = '/contact';
            }}
            className="btn-secondary"
          >
            Contact Support
          </button>
        </motion.div>
      </div>

      {/* SupportPopup component removed in template */}
    </section>
  );
}
