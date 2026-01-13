"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import MangaCard from "@/components/MangaCard";

export default function GenresPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [mangas, setMangas] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch genres (hardcoded or from API if available)
  useEffect(() => {
    setGenres([
      "action",
      "adventure",
      "comedy",
      "drama",
      "fantasy",
      "horror",
      "romance",
      "sci-fi",
      "shounen",
      "shoujo",
    ]);
  }, []);

  // fetch mangas when genre or page changes
  useEffect(() => {
    if (!selectedGenre) return;
    setLoading(true);
    setError("");
    api
      .get("/manga/mangakakalot/bygenre", { params: { genre: selectedGenre, page } })
      .then((res) => {
        setMangas(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch mangas. Try again.");
        setLoading(false);
      });
  }, [selectedGenre, page]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-500">Browse by Genre</h1>

      {/* Genre buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((g, i) => (
          <button
            key={`${g}-${i}`} // unique key
            onClick={() => {
              setSelectedGenre(g);
              setPage(1); // reset page when changing genre
            }}
            className={`px-3 py-1 rounded ${
              selectedGenre === g
                ? "bg-purple-600 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-purple-600 hover:text-white"
            }`}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading/Error */}
      {loading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Manga Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mangas.map((m, i) => (
          <MangaCard key={`${m.id}-${i}`} manga={m} />
        ))}
        {!loading && mangas.length === 0 && selectedGenre && (
          <div className="col-span-full text-gray-400 text-center p-4">
            No manga found for "{selectedGenre}".
          </div>
        )}
      </div>

      {/* Pagination */}
      {mangas.length > 0 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-zinc-800 text-white hover:bg-purple-600 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white px-2 py-2">{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-zinc-800 text-white hover:bg-purple-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
