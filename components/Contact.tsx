'use client';

import { useLanguage } from '@/app/providers';
import { toWhatsAppLink } from '@/lib/format';
import Reveal from './ui/Reveal';

export default function Contact() {
  const { t } = useLanguage();

  const secondaryLinks = [
    { label: t.contact.githubLabel, value: t.contact.githubHandle, href: t.contact.githubUrl },
    {
      label: t.contact.linkedinLabel,
      value: t.contact.linkedinHandle,
      href: t.contact.linkedinUrl,
    },
  ];

  return (
    <section id="contact" className="container-page py-16 sm:py-24">
      <Reveal>
        {/* Closing CTA panel — one clear action, not a table of channels */}
        <div className="card rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="text-sm font-medium text-accent">{t.contact.eyebrow}</span>

          <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.1]">
            {t.contact.title}
          </h2>

          <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-fg-2">
            {t.contact.text}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${t.contact.email}`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-fg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              {t.contact.email}
            </a>
            <a
              href={toWhatsAppLink(t.contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg border border-line bg-bg px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted sm:w-auto"
            >
              {t.contact.whatsappLabel}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
