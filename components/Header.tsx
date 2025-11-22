'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            className="text-xl font-semibold text-white hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            fuadev
          </motion.a>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('az')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === 'az'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              AZ
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === 'en'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}


