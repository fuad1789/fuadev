'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Seconds of stagger — pass the item index multiplied by a small step. */
  delay?: number;
  /** Travel distance in px. Set 0 for a pure fade. */
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span';
}

/**
 * The single reveal primitive for the whole page. Every section animates the
 * same way, and all of it collapses to a static state under reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
