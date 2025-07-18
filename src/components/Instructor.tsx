'use client';

import { motion } from 'framer-motion';
import { Award, Building2, Users2, Briefcase } from 'lucide-react';

const achievements = [
  { icon: Award, label: '8 Years Product Development', value: 'AI & Legacy Software' },
  { icon: Building2, label: 'Alumni Programs', value: 'Antler NYC, Founder Institute' },
  { icon: Users2, label: 'Specialized AI Stacks', value: 'Privacy-First Agentic Systems' },
  { icon: Briefcase, label: 'Ex. Native Instruments', value: 'Plugin Alliance' },
];

export function Instructor() {
  return (
    <section className="bg-white dark:bg-[#060606] px-4 sm:px-6 lg:px-8 py-16 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="items-center gap-12 grid lg:grid-cols-2"
        >
          {/* Image Section */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-accent opacity-20 rounded-brand-xl" />
              <div className="relative flex justify-center items-center p-8 rounded-brand-xl h-full glass-effect">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-brand-primary to-brand-accent mx-auto mb-6 p-1 rounded-full w-48 h-48">
                    <div className="flex justify-center items-center bg-white dark:bg-brand-dark rounded-full w-full h-full overflow-hidden">
                      <img 
                        src="/assets/images/vadim-vozmitsel-tesseract-creator.png" 
                        alt="Vadim Vozmitsel - Tesseract Creator"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="mb-2 font-bold text-2xl tracking-tight">Vadim</h3>
                  <p className="text-gray-600 dark:text-gray-400">Full Stack Developer | AI Integration Engineer | Product Designer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl tracking-tight">
              Learn from a <span className="gradient-text">Product Creator & AI Builder</span>
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400 text-xl">
              For the past 8 years, I've been cultivating products and experiences in both AI-native and legacy software development. I specialize in personalized, privacy-first Agentic Stacks and Orchestrated Automations that produce higher quality outputs and are more cost-effective to scale.
            </p>

            <div className="gap-6 grid grid-cols-2 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <achievement.icon className="flex-shrink-0 mt-1 w-6 h-6 text-brand-accent" />
                  <div>
                    <p className="font-semibold">{achievement.label}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{achievement.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <blockquote className="p-6 border-brand-accent border-l-4 rounded-brand glass-effect">
              <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg italic">
                "AI is the ultimate tool for productizing yourself into an extendable and autonomous system. I spend a lot of time working with those who have specialized domain knowledge and want to enrich it with the latest that Machine Learning and AI have to offer."
              </p>
              <cite className="text-gray-600 dark:text-gray-400">— Vadim</cite>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
