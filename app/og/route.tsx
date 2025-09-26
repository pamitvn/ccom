import type { NextRequest } from 'next/server';
import { createOgImageResponse } from '../../lib/og-image';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  return createOgImageResponse(url);
}
