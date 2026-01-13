"use client";

import { useEffect, useState } from "react";
import MangaCard from "@/components/MangaCard";

export default function BookmarksPage() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aniga:bookmarks");
      setList(raw ? JSON.parse(raw) : []);
    } catch {
      setList([]);
    }
  }, []);

  if (!list.length) return <div className="p-6 text-white">No bookmarks</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-500">Bookmarks</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {list.map((b) => (
          <MangaCard key={b.id} manga={{ id: b.id, title: b.title, image: b.image }} />
        ))}
      </div>
    </div>
  );
}