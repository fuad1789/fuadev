'use client';

import { useLanguage } from '@/app/providers';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
            {t.contact.text}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a
              href={`mailto:${t.contact.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-xs text-gray-400 mb-1">{t.contact.emailLabel}</div>
              <div className="text-sm text-white">{t.contact.email}</div>
            </motion.a>
            
            <motion.a
              href={t.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-xs text-gray-400 mb-1">{t.contact.githubLabel}</div>
              <div className="text-sm text-white">{t.contact.githubUrl}</div>
            </motion.a>
            
            <motion.a
              href={`https://wa.me/${t.contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-xs text-gray-400 mb-1">{t.contact.whatsappLabel}</div>
              <div className="text-sm text-white">{t.contact.whatsappNumber}</div>
            </motion.a>
            
            <motion.a
              href={t.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-xs text-gray-400 mb-1">{t.contact.linkedinLabel}</div>
              <div className="text-sm text-white">Fuad Bagiyev</div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

