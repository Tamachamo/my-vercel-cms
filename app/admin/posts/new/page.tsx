'use client';

import { useState } from 'react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const blob = await uploadRes.json();
        imageUrl = blob.url;
      }

      const postRes = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content,
          imageUrl,
          published: true,
        }),
      });

      if (postRes.ok) {
        alert('記事を公開しました！');
        setTitle(''); setSlug(''); setContent(''); setFile(null);
      } else {
        alert('記事の保存に失敗しました。');
      }
    } catch (error) {
      console.error(error);
      alert('エラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">新規記事作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">タイトル</label>
          <input
            type="text" required value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="gudenyanの新作デザインについて"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URLスラッグ (半角英数字ハイフン)</label>
          <input
            type="text" required value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="new-design-2026"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">アイキャッチ画像</label>
          <input
            type="file" accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">本文</label>
          <textarea
            required rows={10} value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="本文をここに入力してください..."
          />
        </div>
        <button
          type="submit" disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : '公開する'}
        </button>
      </form>
    </div>
  );
}
