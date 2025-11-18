'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            {t.skills.title}
          </h2>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {t.skills.items.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition-all"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

