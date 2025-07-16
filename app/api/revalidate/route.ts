import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const body = await request.json();
  const { tag, secret } = body;

  // シークレットキーの検証 (重要！)
  if (secret !== process.env.MICROCMS_WEBHOOK_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag parameter' }, { status: 400 });
  }

  try {
    revalidateTag(tag); // 指定されたタグのキャッシュを再検証
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
