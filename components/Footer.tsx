'use client';

import { useLanguage } from '@/app/providers';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Replace year placeholder dynamically
  const footerText = language === 'az' 
    ? `© ${currentYear} Fuad Bağıyev · fuadev.com`
    : `© ${currentYear} Fuad Bagiyev · fuadev.com`;

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-400">{footerText}</p>
      </div>
    </footer>
  );
}

