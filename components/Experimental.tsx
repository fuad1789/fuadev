'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';

export default function Experimental() {
  const { t } = useLanguage();

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-5 text-center"
        >
          <h3 className="text-lg font-semibold mb-2">{t.experimental.title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm">{t.experimental.body}</p>
        </motion.div>
      </div>
    </section>
  );
}

