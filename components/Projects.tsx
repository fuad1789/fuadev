'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.projects.title}</h2>
          <p className="text-gray-400 text-base sm:text-lg">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{project.label}</p>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <p className="text-xs text-gray-500 mb-3 italic">{project.status}</p>
              
              <div className="mb-4 p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 leading-relaxed">{project.highlight}</p>
              </div>
              

              
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-white hover:text-gray-300 transition-colors"
              >
                {project.linkLabel} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

