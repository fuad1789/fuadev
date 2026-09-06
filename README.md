# Fuad Bağıyev Portfolio

A minimal, dark, bilingual personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🌐 **Bilingual Support**: Azerbaijani (default) and English
- 🎨 **Dark Theme**: Clean, minimal design with glassmorphism effects
- 📱 **Responsive**: Optimized for both mobile and desktop
- ⚡ **Fast**: Built with Next.js App Router for optimal performance
- 🎭 **Smooth Animations**: Subtle Framer Motion animations

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   ├── providers.tsx       # Language context provider
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Sticky header with language toggle
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Projects.tsx        # Projects showcase
│   ├── Skills.tsx          # Skills section
│   ├── Experimental.tsx    # Experimental work note
│   ├── Contact.tsx         # Contact section
│   └── Footer.tsx          # Footer
└── lib/
    └── translations.ts     # All text content (AZ & EN)
```

## Customization

### Editing Content

All text content is stored in `lib/translations.ts`. Simply edit the translations object to update any text on the site.

### Changing Links

- **Project links**: Edit `linkUrl` in `lib/translations.ts` under `projects.items`
- **Contact links**: Edit `email` and `githubUrl` in `lib/translations.ts` under `contact`

### Styling

The site uses Tailwind CSS. You can customize colors, spacing, and other styles by editing:
- `tailwind.config.ts` for theme configuration
- Component files for component-specific styles
- `app/globals.css` for global styles

## Prompt Copy Counter

Each prompt shows how many times it has been copied. The counts live in a Google
Sheet, written by a Google Apps Script web app — no database, no paid service.

1. Deploy `scripts/copy-counter.gs`. The full setup steps are in the comment at
   the top of that file (create a sheet → Extensions → Apps Script → paste →
   Deploy as a web app with access set to **Anyone**).
2. Copy the `/exec` URL into `.env.local`:
   ```
   NEXT_PUBLIC_COPY_COUNTER_URL=https://script.google.com/macros/s/.../exec
   ```
3. Add the same variable in the Vercel project settings and redeploy.

Without the variable the site works exactly as before — the counter is hidden
instead of broken. A prompt with zero copies shows no number either.

The web app URL is public by design, so treat the numbers as a vanity metric:
anyone who finds it could inflate a count.

## Build for Production

```bash
npm run build
npm start
```

## License

Personal portfolio project.


