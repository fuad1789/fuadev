'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiGit,
  SiFigma,
} from 'react-icons/si';

const iconMap: Record<string, React.ElementType> = {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiGit,
  SiFigma,
};

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
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            {t.skills.title}
          </h2>

          {/* Services / What I do */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-400 text-center sm:text-left">
              {t.hero.secondaryButton === "Mən kiməm?" ? "Xidmətlər" : "Services"}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {t.skills.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-full text-sm text-gray-200"
                >
                  {service}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-400 text-center sm:text-left">
              {t.hero.secondaryButton === "Mən kiməm?" ? "Texnologiyalar" : "Technologies"}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6">
              {t.skills.technologies.map((tech, index) => {
                const Icon = iconMap[tech.icon];
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="flex flex-col items-center justify-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl transition-colors group"
                  >
                    {Icon && (
                      <Icon className="text-3xl sm:text-4xl mb-2 text-gray-400 group-hover:text-white transition-colors" />
                    )}
                    <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

