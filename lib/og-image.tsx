import { ImageResponse } from 'workers-og';
import { getSiteUrl } from './seo';

const WIDTH = 1200;
const HEIGHT = 630;
const DEFAULT_TITLE = 'CCoM – Máy tái chế rác hữu cơ CS 500W';
const DEFAULT_DESCRIPTION =
  'Biến rác nhà bếp thành phân hữu cơ sạch chỉ trong vài giờ cùng thiết bị thông minh CCoM.';

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}…`;
}

function resolveOgParams(url: URL) {
  const { searchParams } = url;
  const titleParam = searchParams.get('title')?.trim();
  const descriptionParam = searchParams.get('description')?.trim();
  const pathParam = searchParams.get('path')?.trim();

  const title = truncate(titleParam && titleParam.length > 0 ? titleParam : DEFAULT_TITLE, 90);
  const description = truncate(
    descriptionParam && descriptionParam.length > 0 ? descriptionParam : DEFAULT_DESCRIPTION,
    160,
  );
  const siteUrl = getSiteUrl();
  const canonicalPath = pathParam && pathParam.startsWith('/') ? pathParam : '/';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return {
    title,
    description,
    canonicalUrl,
  };
}

export function createOgImageResponse(url: URL) {
  const { title, description, canonicalUrl } = resolveOgParams(url);

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundImage: 'linear-gradient(135deg, #022c22 0%, #16a34a 60%, #86efac 100%)',
          color: '#0f172a',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f0fdf4' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 24,
                backgroundColor: 'rgba(15, 118, 110, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f7fee7',
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              C
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 700 }}>CCoM</span>
              <span style={{ fontSize: 20, opacity: 0.9 }}>Giải pháp xử lý rác hữu cơ tại nhà</span>
            </div>
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, backgroundColor: 'rgba(15, 118, 110, 0.3)', padding: '12px 20px', borderRadius: 9999 }}>
            {canonicalUrl}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, color: '#052e16' }}>
          <h1 style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 800 }}>{title}</h1>
          <p style={{ fontSize: 30, lineHeight: 1.35, maxWidth: 880 }}>{description}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f0fdf4' }}>
          <div style={{ display: 'flex', gap: 16, fontSize: 22 }}>
            <span>⚡ Xử lý rác nhanh</span>
            <span>🌱 Biến rác thành phân</span>
            <span>🛡️ Bảo hành 12 tháng</span>
          </div>
          <span style={{ fontSize: 22, fontWeight: 600 }}>ccom.vn</span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}
