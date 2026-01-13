"use client";

import api from '@/lib/api';
import MangaCard from '@/components/MangaCard';
import { useState, useEffect } from 'react';

async function getLatestManga(page = 1) {
  const res = await api.get('/manga/mangakakalot/latestmanga', { params: { page } });
  return res.data;
}

export default function HomePage() {
  const [latest, setLatest] = useState<any>({ results: [] });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLatestManga(page)
      .then((data) => setLatest(data))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="p-6">
      {loading && (
        <div className="text-center text-purple-500 font-bold">Loading latest manga...</div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-purple-500">Latest Manga Updates</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latest.results?.map((manga: any, i: number) => (
          <MangaCard key={i} manga={manga} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition"
        >
          Prev
        </button>
        <span className="text-white font-bold px-2 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
