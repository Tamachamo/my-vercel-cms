import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Vercel CMS',
  description: 'Built with Next.js, Vercel Postgres, and Vercel Blob',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
