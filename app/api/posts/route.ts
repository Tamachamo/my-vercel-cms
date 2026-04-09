import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, imageUrl, published } = body;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        imageUrl,
        published: published ?? false,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Post Creation Error:', error);
    return NextResponse.json({ error: '記事の作成に失敗しました' }, { status: 500 });
  }
}
