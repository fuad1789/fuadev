'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#010101]">
      {/* Background Image - natural size, centered */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/fuad.jpg"
          alt="Fuad Bağıyev"
          width={1200}
          height={1600}
          className="object-contain"
          priority
          quality={90}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        {/* Overlay to blend image background with page background */}
        <div className="absolute inset-0 bg-[#010101]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t.hero.name}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl text-gray-200 mb-6"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors shadow-lg"
            >
              {t.hero.primaryButton}
            </motion.button>
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              {t.hero.secondaryButton}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

