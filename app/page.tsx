import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

// Vercelでキャッシュを無効化し、常に最新のデータを取得する設定
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ブログ</h1>
        <Link href="/admin/posts/new" className="text-blue-600 hover:underline">
          記事を書く →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
            {post.imageUrl && (
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(post.createdAt).toLocaleDateString('ja-JP')}
              </p>
              <p className="text-gray-800 line-clamp-3">{post.content}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
