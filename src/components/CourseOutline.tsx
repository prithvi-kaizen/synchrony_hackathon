'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code2, Workflow, Link, Image, Database, FileCode, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';

const learningObjectives = [
  {
    id: 1,
    title: 'Develop a Working 30+ Node Orchestrated AI + API Automation',
    description: 'Build complete automation with Agents, Raw Models and node-based processing',
    icon: 'workflow',
    highlights: ['Multi-agent coordination', 'Sequential processing', 'Production deployment']
  },
  {
    id: 2,
    title: 'Master Fundamental n8n Nodes & Integrations',
    description: 'Gain working knowledge of Webhook, HTTP, Edit Fields (Set), Code, OpenAI Assistants, Bannerbear, Supabase and Sendgrid nodes',
    icon: 'code',
    highlights: ['API integrations', 'Data transformation', 'Email automation']
  },
  {
    id: 3,
    title: 'Structure Agentic Chains with Shared Outputs',
    description: 'Build progressive processing chains where agents build on previous work with sequential outputs',
    icon: 'chain',
    highlights: ['Agent collaboration', 'Data flow design', 'Output chaining']
  },
  {
    id: 4,
    title: 'Work with 6 Leading Image Generation Models',
    description: 'Gain comprehensive experience with FAL Generative Media Cloud and advanced image generation workflows',
    icon: 'image',
    highlights: ['Multiple AI models', 'Media generation', 'Quality optimization']
  },
  {
    id: 5,
    title: 'Implement Full-Stack Data Management',
    description: 'Write data to Supabase, AWS S3 and send emails with Sendgrid for complete workflow automation',
    icon: 'database',
    highlights: ['Database operations', 'Cloud storage', 'Email integration']
  },
  {
    id: 6,
    title: 'Master Schema-Constrained AI Outputs',
    description: 'Prompt agents to output structured results and write high-quality HTML/CSS for dynamic frontend development',
    icon: 'schema',
    highlights: ['Structured outputs', 'Frontend generation', 'Quality control']
  },
  {
    id: 7,
    title: 'Create Publication-Ready Content',
    description: 'Compile bespoke text and images with Bannerbear into high-quality, publication-ready posts and media',
    icon: 'content',
    highlights: ['Content compilation', 'Professional output', 'Media production']
  }
];

export function CourseOutline() {
  const [openObjective, setOpenObjective] = useState<number | null>(1);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'workflow':
        return <Workflow className="w-6 h-6" />;
      case 'code':
        return <Code2 className="w-6 h-6" />;
      case 'chain':
        return <Link className="w-6 h-6" />;
      case 'image':
        return <Image className="w-6 h-6" aria-label="Image generation icon" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      case 'schema':
        return <FileCode className="w-6 h-6" />;
      case 'content':
        return <Layers className="w-6 h-6" />;
      default:
        return <Workflow className="w-6 h-6" />;
    }
  };

  return (
    <section id="outline" className="bg-white dark:bg-[#060606] px-4 sm:px-6 lg:px-8 py-16 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl tracking-tight">What You'll Master</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              7 core learning objectives for building production-ready AI automations
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {learningObjectives.map((objective, index) => (
            <motion.div
              key={objective.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <TesseractLiquidGlass
                variant="card"
                enableScrollEffects={true}
                enableShimmer={openObjective === objective.id}
                className="shadow-brand-lg group-hover:shadow-brand-xl border border-gray-200/50 dark:border-gray-700/50 group-hover:border-brand-primary rounded-brand-lg overflow-hidden transition-all duration-700"
              >
              <button
                onClick={() => setOpenObjective(openObjective === objective.id ? null : objective.id)}
                className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 px-6 py-4 w-full transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center bg-brand-accent/10 rounded-brand w-12 h-12 text-brand-accent">
                    {getIcon(objective.icon)}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{objective.title}</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                      {objective.description}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 transition-transform',
                    openObjective === objective.id && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {openObjective === objective.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-gray-200 dark:border-gray-700 border-t"
                  >
                    <div className="p-6">
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Key Skills You'll Develop:</h4>
                      <div className="gap-2 grid md:grid-cols-3">
                        {objective.highlights.map((highlight, highlightIndex) => (
                          <div
                            key={highlightIndex}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                          >
                            <div className="bg-brand-accent rounded-full w-2 h-2"></div>
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </TesseractLiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
