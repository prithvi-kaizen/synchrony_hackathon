'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
// import Image from 'next/image'
import { useState } from 'react';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';

const testimonials = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Full-Stack Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    content:
      'This template saved me weeks of setup time. The component architecture is excellent and the TypeScript integration is seamless. Perfect foundation for modern web applications.',
    rating: 5,
    project: 'SaaS Platform',
    timeToLaunch: '2 weeks',
  },
  {
    id: 2,
    name: 'Jordan Smith',
    role: 'Product Designer & Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    content:
      'The design system and component library are incredibly well thought out. I was able to build a beautiful, responsive product in record time. The animations are smooth and professional.',
    rating: 5,
    project: 'E-commerce Site',
    timeToLaunch: '3 weeks',
  },
  {
    id: 3,
    name: 'Taylor Martinez',
    role: 'Startup Founder',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    content:
      'As a non-technical founder, this template gave me everything I needed to build our MVP. The documentation is clear and the setup process is straightforward.',
    rating: 5,
    project: 'Tech Startup MVP',
    timeToLaunch: '1 month',
  },
];

export const Testimonials = React.memo(function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white dark:bg-[#060606] px-4 py-16 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">Trusted by Developers Worldwide</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See how developers are building amazing products with our template
            </p>
          </div>
        </motion.div>

        <div className="mb-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <TesseractLiquidGlass
                variant="card"
                enableScrollEffects={true}
                enableShimmer={activeIndex === index}
                className="group relative overflow-hidden p-8 transition-all duration-300 hover:shadow-brand-xl"
              >
                <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-accent/20" />

                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-brand-primary to-brand-accent p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-brand-dark">
                      <span className="gradient-text text-xl font-bold">
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-brand-accent text-brand-accent" />
                  ))}
                </div>

                <p className="mb-6 text-gray-700 dark:text-gray-300">"{testimonial.content}"</p>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project Type</p>
                    <p className="font-bold text-brand-accent">{testimonial.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Time to Launch</p>
                    <p className="font-bold">{testimonial.timeToLaunch}</p>
                  </div>
                </div>
              </TesseractLiquidGlass>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonial CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="btn-secondary group">
View More Case Studies
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
});
