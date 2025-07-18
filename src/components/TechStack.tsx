'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Cloud, Workflow, Sparkles } from 'lucide-react';

const technologies = [
  { icon: Code2, name: 'Next.js 15', description: 'React framework for production' },
  { icon: Cpu, name: 'TypeScript', description: 'Type-safe development' },
  { icon: Database, name: 'Supabase', description: 'Database and authentication' },
  { icon: Cloud, name: 'Vercel', description: 'Seamless deployment' },
  { icon: Workflow, name: 'Tailwind CSS', description: 'Utility-first styling' },
  { icon: Sparkles, name: 'Framer Motion', description: 'Beautiful animations' },
];

export function TechStack() {
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
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">
              Built with <span className="gradient-text">Modern Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Production-ready technologies for scalable applications
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-effect group cursor-pointer rounded-brand-lg p-6 text-center border border-gray-200/50 shadow-sm hover:shadow-md dark:border-gray-700/50 transition-all duration-300"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-brand bg-brand-accent/10 transition-colors group-hover:bg-brand-accent/20">
                <tech.icon className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{tech.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Workflow Visualization Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="mb-4 text-3xl font-bold tracking-tight">
              Beautiful <span className="gradient-text">Finished Results</span>
            </h3>
            <p className="mb-12 text-xl text-gray-600 dark:text-gray-400">
              Professional outputs created by your automated workflows
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-brand-xl p-4"
            >
              <img
                src="/assets/images/finished-result-preview-1.png"
                alt="Professional Content Generation Result"
                className="w-full rounded-brand-lg"
              />
              <h4 className="mt-4 font-semibold">Professional Content Generation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                High-quality blog posts and articles automatically generated with perfect formatting
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-brand-xl p-4"
            >
              <img
                src="/assets/images/finished-result-preview-2.png"
                alt="Visual Media Creation Result"
                className="w-full rounded-brand-lg"
              />
              <h4 className="mt-4 font-semibold">Visual Media Creation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stunning graphics and media assets created through AI automation workflows
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
