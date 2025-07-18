import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030303',
          backgroundImage: 'radial-gradient(circle at center, #da322910 0%, transparent 100%)',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #da3229 0%, #e0392f 100%)',
              borderRadius: 20,
              marginRight: 24,
            }}
          />
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
            }}
          >
            n8n Masterclass
          </h2>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            margin: '0 40px',
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          Build Enterprise-Grade
          <br />
          Automation Systems
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 32,
            color: '#8a8a8a',
            textAlign: 'center',
            margin: '24px 40px 0',
            maxWidth: 800,
          }}
        >
          Learn to create production-ready workflows with n8n
        </p>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 48,
            padding: '20px 40px',
            background: 'linear-gradient(135deg, #da3229 0%, #e0392f 100%)',
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 600,
            color: '#ffffff',
          }}
        >
          Start Learning Today →
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
