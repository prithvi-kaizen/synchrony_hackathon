'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
// import { Shield, Users, Trophy } from 'lucide-react'; // Temporarily unused
import { cn } from '@/lib/utils';
import { TesseractLiquidGlass } from './TesseractLiquidGlass';

const pricing = {
  starter: {
    name: 'Starter',
    price: 0,
    originalPrice: 0,
    description: 'Perfect for personal projects',
    features: [
      'Basic template access',
      'Core components included',
      'Documentation & guides',
      'Community support',
      'MIT License',
    ],
    cta: 'Get Started',
    popular: false,
  },
  pro: {
    name: 'Professional',
    price: 49,
    originalPrice: 99,
    description: 'For serious developers',
    features: [
      'Everything in Starter',
      'Advanced components',
      'Premium themes',
      'Priority support',
      'Commercial license',
      'Lifetime updates',
    ],
    cta: 'Go Professional',
    popular: true,
  },
  enterprise: {
    name: 'Enterprise',
    price: 199,
    originalPrice: 399,
    description: 'For teams and organizations',
    features: [
      'Everything in Professional',
      'Team collaboration tools',
      'Custom integrations',
      'Dedicated support',
      'Training sessions',
      'Custom development',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
};


// Temporarily commented out guarantees
/*
const guarantees = [
  { icon: Shield, text: '30-day money-back guarantee' },
  { icon: Users, text: 'Join 2,847+ successful students' },
  { icon: Trophy, text: '90% land jobs within 6 months' },
];
*/

export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-white dark:bg-[#060606] px-4 py-16 sm:py-16 sm:px-6 lg:px-8"
      aria-labelledby="pricing-title"
      role="region"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div role="banner" aria-label="Limited time offer">
            <TesseractLiquidGlass
              variant="interactive"
              enableShimmer={false}
              className="mb-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              <Zap className="h-4 w-4 text-brand-accent" aria-hidden="true" />
              <span className="text-gray-900 dark:text-gray-100">Limited Time - Special Launch Pricing</span>
            </TesseractLiquidGlass>
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 id="pricing-title" className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start free, upgrade when ready. Scale your project with the right plan for your needs.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid Pricing */}
        <div className="mb-12 mt-8 grid gap-8 lg:grid-cols-2 lg:items-stretch" role="group" aria-labelledby="pricing-options-label">
          <h3 id="pricing-options-label" className="sr-only">Pricing Options</h3>
          {Object.entries(pricing)
            .filter(([key]) => key !== 'enterprise') // Show all plans or filter as needed
            .map(([key, plan]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex"
              role="article"
              aria-labelledby={`plan-title-${key}`}
              aria-describedby={`plan-description-${key} plan-price-${key} plan-features-${key}`}
            >
              <TesseractLiquidGlass
                variant="card"
                enableShimmer={false}
                enableScrollEffects={false}
                className="relative p-8 transition-all duration-300 flex flex-col w-full"
              >

                <div className="mb-8">
                  <h3 id={`plan-title-${key}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <p id={`plan-description-${key}`} className="mb-4 text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <div id={`plan-price-${key}`} className="flex items-baseline gap-2" role="group" aria-label={`Price information for ${plan.name}`}>
                    {plan.price === 0 ? (
                      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100" aria-label="Free plan">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-gray-900 dark:text-gray-100" aria-label={`Current price $${plan.price}`}>${plan.price}</span>
                        {plan.originalPrice > plan.price && (
                          <span className="text-xl text-gray-500 dark:text-gray-400 line-through" aria-label={`Original price $${plan.originalPrice}`}>
                            ${plan.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <ul id={`plan-features-${key}`} className="mb-8 space-y-4 flex-grow" role="list" aria-label={`Features included in ${plan.name} plan`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3" role="listitem">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-accent" aria-hidden="true" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="w-full rounded-brand py-4 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 btn-primary"
                  onClick={() => {
                    if (key === 'starter') {
                      // Handle free plan signup
                      // Example: window.location.href = '/signup';
                    } else if (key === 'pro') {
                      // Handle pro plan signup  
                      // Example: window.location.href = '/checkout?plan=pro';
                    } else if (key === 'enterprise') {
                      // Handle enterprise contact
                      // Example: window.location.href = '/contact';
                    }
                  }}
                  aria-label={`${plan.cta} - ${plan.name} plan for ${plan.price === 0 ? 'free' : '$' + plan.price}`}
                  aria-describedby={`plan-description-${key} plan-features-${key}`}
                >
                  {plan.cta}
                </button>
              </TesseractLiquidGlass>
            </motion.div>
          ))}
          
        </div>

        {/* Trust Guarantees - Temporarily commented out */}
        {/*
        <div className="mb-12 flex flex-wrap justify-center gap-8" role="group" aria-labelledby="trust-guarantees-label">
          <h3 id="trust-guarantees-label" className="sr-only">Trust and Guarantees</h3>
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center gap-3" role="listitem" aria-label={guarantee.text}>
              <guarantee.icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
              <span className="text-gray-700 dark:text-gray-300">{guarantee.text}</span>
            </div>
          ))}
        </div>
        */}

        {/* Payment Options - Temporarily commented out */}
        {/* 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-brand-lg p-8 text-center"
        >
          <h3 className="mb-4 text-2xl font-semibold">Flexible Payment Options</h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Academy: 3-payment plan available ($159 × 3 months) • No credit check required
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <img src="/payment-stripe.svg" alt="Stripe" className="h-8" />
            <img src="/payment-paypal.svg" alt="PayPal" className="h-8" />
            <img src="/payment-klarna.svg" alt="Klarna" className="h-8" />
          </div>
        </motion.div>
        */}
      </div>
    </section>
  );
}
