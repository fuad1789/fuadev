/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Screenshots are wide plates; these are the widths actually requested.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [256, 320, 384, 640],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  /**
   * Short paths announced in the videos. They stay temporary on purpose: a
   * spoken link should be re-pointable at a newer guide later. Each entry
   * mirrors the `shortPath` of a guide in `lib/guides.ts`.
   */
  /**
   * fuadev.com/manat is a separate Next.js app (Manat Zaman Maşını) served as a
   * zone: it runs with basePath "/manat" and these rewrites proxy to it, so the
   * visitor stays on fuadev.com. Unset MANAT_ORIGIN and the routes simply 404.
   */
  async rewrites() {
    const origin = process.env.MANAT_ORIGIN;
    if (!origin) return [];
    return [
      { source: '/manat', destination: `${origin}/manat` },
      { source: '/manat/:path+', destination: `${origin}/manat/:path+` },
    ];
  },
  async redirects() {
    return [
      {
        source: '/vercel',
        destination: '/guides/localhost-to-vercel',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
