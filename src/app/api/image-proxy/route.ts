import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url', { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        // REQUIRED to bypass 2xstorage hotlink protection
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.mangapill.com/',
        'Accept': 'image/webp,image/*,*/*;q=0.8',
      },
      cache: 'no-store',
    });

    if (!res.ok || !res.body) {
      console.error('Image fetch failed:', res.status, url);
      return new NextResponse('Image fetch failed', { status: 502 });
    }

    return new NextResponse(res.body, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'image/webp',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new NextResponse('Proxy error', { status: 500 });
  }
}
