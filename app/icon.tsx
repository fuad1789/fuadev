import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Wordmark reduced to its smallest form: ink plate, "f", signal full stop. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111318',
          color: '#ffffff',
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        f
        <span style={{ color: '#255ce6' }}>.</span>
      </div>
    ),
    size
  );
}
