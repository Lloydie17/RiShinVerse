"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import MangaCard from "@/components/MangaCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/manga/mangapill/${query}`);
        setSuggestions(res.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Search Manga</h1>
      <input
        type="text"
        placeholder="Search manga..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-6 rounded bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {loading && <div className="text-purple-500 mb-4">Searching...</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {suggestions.map((manga) => {
          const id = manga.mangaId ?? manga.id;

          if (!id) return null;

          return <MangaCard key={id} manga={manga} />;
        })}
        
        {!loading && query && suggestions.length === 0 && (
          <div className="text-gray-400 col-span-full text-center">No results found.</div>
        )}
      </div>
    </div>
  );
}
