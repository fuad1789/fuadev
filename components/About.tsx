'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 sm:p-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t.about.title}</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
            {t.about.body}
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t.about.extraLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

