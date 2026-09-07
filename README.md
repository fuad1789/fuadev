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

## Guides

`/guides` is the written companion to the videos — not a blog. There are no
publication dates on display and no feed: a guide is edited in place when the
platform it describes changes.

Adding one takes two steps:

1. Write `content/guides/<slug>.az.md` and `content/guides/<slug>.en.md`. Both
   files are required — a missing one fails the build instead of shipping a page
   that is blank in one language. Guides are parsed with the rich Markdown
   option, so inline `code`, `[links](https://example.com)` and fenced blocks
   all work; prompts are not, and keep rendering backticks literally.
2. Add the entry to the registry in `lib/guides.ts`. The registry is the whole
   route table — `generateStaticParams` reads it, so anything missing from it is
   a 404 at build time.

Top-level headings (`#`) become the table of contents in the sidebar, with
anchors transliterated from Azerbaijani (`# Öz domenin` → `#oz-domenin`).

### Short links

A guide can advertise a short path — `shortPath: '/vercel'` — for reading out
loud in a video. The redirect itself lives in `next.config.js` and is temporary
(307) on purpose, so the spoken link can be re-pointed at a newer guide later.
Keep the two in sync when you add one.

## Prompt Copy Counter

Each prompt shows how many times it has been copied. The counts live in a Google
Sheet, written by a Google Apps Script web app — no database, no paid service.

1. Deploy `scripts/copy-counter.gs`. The full setup steps are in the comment at
   the top of that file (create a sheet → Extensions → Apps Script → paste →
   Deploy as a web app with access set to **Anyone**).
2. Copy the `/exec` URL into `.env.local`:
   ```
   COPY_COUNTER_URL=https://script.google.com/macros/s/.../exec
   ```
3. Add the same variable in the Vercel project settings and redeploy.

Without the variable the site works exactly as before — the counter is hidden
instead of broken. A prompt with zero copies shows no number either.

The browser never calls Apps Script directly. It goes through `/api/prompt-copies`,
which is same-origin (so there is no CORS surface to fail silently) and answers
reads from a ten-second server cache instead of making every visitor wait the
two to four seconds Apps Script needs. The pages also render their counts on the
server, so a number is on screen in the first paint.

`NEXT_PUBLIC_COPY_COUNTER_URL` is still read as a fallback, but it ships the URL
to every visitor; prefer `COPY_COUNTER_URL`. Either way the numbers are a vanity
metric — anyone can post to the route, there is no rate limiting.

## Build for Production

```bash
npm run build
npm start
```

## License

Personal portfolio project.


