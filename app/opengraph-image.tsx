import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Fuad Bagiyev — Full-stack developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Latin-only copy on purpose: ImageResponse falls back to a bundled font that
 * does not cover Azerbaijani glyphs (ə, ğ, ı), which would render as tofu.
 */
const STATS = [
  { value: '4+', label: 'YEARS' },
  { value: '8', label: 'PRODUCTION PROJECTS' },
  { value: '2', label: 'OFFICIAL PORTALS' },
  { value: '2.000', label: 'SUPVC GRANT' },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#111318',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>
            fuadev<span style={{ color: '#255ce6' }}>.</span>
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(17,19,24,0.12)' }} />
          <div style={{ fontSize: 16, letterSpacing: '0.24em', color: '#717783' }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 116,
              fontWeight: 700,
              letterSpacing: '-0.045em',
              lineHeight: 1,
            }}
          >
            Fuad Bagiyev
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              letterSpacing: '0.16em',
              color: '#525863',
            }}
          >
            FULL-STACK DEVELOPER
          </div>
        </div>

        <div style={{ display: 'flex', gap: 48 }}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '2px solid #111318',
                paddingTop: 12,
                minWidth: 200,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>
                {stat.value}
              </div>
              <div
                style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.2em', color: '#717783' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
