import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import Badge from './Badge';

interface PageHeroProps {
  badge: string;
  title: ReactNode;
  subtitle: string;
  dark?: boolean;
}

export default function PageHero({ badge, title, subtitle, dark = false }: PageHeroProps) {
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden ${dark ? 'bg-ink-950' : 'bg-ink-50'}`}>
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      {!dark && <div className="absolute inset-0 grid-bg opacity-40" />}
      {dark && <div className="absolute inset-0 grid-bg-dark opacity-30" />}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-400/15 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/15 blur-[120px] rounded-full" />

      <div className="relative container-8xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Badge variant={dark ? 'dark' : 'light'}>{badge}</Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-ink-900'}`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-6 text-lg leading-relaxed max-w-2xl mx-auto ${dark ? 'text-ink-300' : 'text-ink-500'}`}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
