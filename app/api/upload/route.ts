import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'ファイルがありません' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 画像を1200pxにリサイズし、WebPに変換して圧縮
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const fileName = `${originalName}-${Date.now()}.webp`;

    const blob = await put(fileName, optimizedBuffer, {
      access: 'public',
      contentType: 'image/webp',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'アップロードに失敗しました' }, { status: 500 });
  }
}
