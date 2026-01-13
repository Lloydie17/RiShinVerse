"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

export default function ChapterList({ chapters, title }: { chapters: any[]; title?: string }) {
  const [search, setSearch] = useState("");
  const [readSet, setReadSet] = useState<Set<string>>(new Set());

  // load read chapters from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("aniga:readChapters");
      const arr = raw ? JSON.parse(raw) : [];
      setReadSet(new Set(arr.map(String)));
    } catch {
      setReadSet(new Set());
    }
  }, []);

  // persist read set
  const saveReadSet = (s: Set<string>) => {
    localStorage.setItem("aniga:readChapters", JSON.stringify(Array.from(s)));
    setReadSet(new Set(s));
  };

  const toggleRead = (id: string | number) => {
    const key = String(id);
    const s = new Set(readSet);
    if (s.has(key)) s.delete(key);
    else s.add(key);
    saveReadSet(s);
  };

  const markAllRead = () => {
    const s = new Set(readSet);
    for (const ch of chapters) s.add(String(ch.id));
    saveReadSet(s);
  };

  const clearAllRead = () => {
    saveReadSet(new Set());
  };

  // Sort chapters by id assuming higher id = latest
  const sortedChapters = useMemo(() => {
    return [...chapters].sort((a, b) => b.id - a.id);
  }, [chapters]);

  // Filter chapters based on search
  const filteredChapters = useMemo(() => {
    if (!search) return sortedChapters;
    return sortedChapters.filter((ch) =>
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      ch.id.toString() === search
    );
  }, [search, sortedChapters]);

  const firstChapter = sortedChapters[sortedChapters.length - 1];
  const latestChapter = sortedChapters[0];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">Chapter {title}</h2>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="px-3 py-1 bg-purple-600 text-white rounded cursor-pointer">Mark all read</button>
          <button onClick={clearAllRead} className="px-3 py-1 bg-zinc-800 text-white rounded cursor-pointer">Clear</button>
        </div>
      </div>

      {/* Jump buttons */}
      <div className="flex gap-4 mb-4">
        {firstChapter && (
          <Link
            href={`/read/${encodeURIComponent(firstChapter.id)}`}
            onClick={() => toggleRead(firstChapter.id)}
            className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded transition-all duration-300"
          >
            First Chapter<br />
            <span className="font-bold">{firstChapter.title}</span>
          </Link>
        )}
        {latestChapter && (
          <Link
            href={`/read/${encodeURIComponent(latestChapter.id)}`}
            onClick={() => toggleRead(latestChapter.id)}
            className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded transition-all duration-300"
          >
            New Chapter<br />
            <span className="font-bold">{latestChapter.title}</span>
          </Link>
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Chapter. Example: 25 or 178"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-zinc-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Scrollable chapter list */}
      <div className="max-h-96 overflow-y-auto space-y-2 scrollbar">
        {filteredChapters.map((ch) => {
          const idStr = String(ch.id);
          const isRead = readSet.has(idStr);
          return (
            <div key={ch.id} className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 p-3 rounded shadow-md text-white text-sm font-medium transition">
              <Link
                href={`/read/${encodeURIComponent(ch.id)}`}
                onClick={() => toggleRead(ch.id)}
                className={`flex-1 ${isRead ? "opacity-60 line-through" : ""}`}
              >
                <div className="font-semibold">{ch.title}</div>
                {ch.date && (
                  <div className="text-gray-400 text-xs">{new Date(ch.date).toLocaleDateString()}</div>
                )}
              </Link>
              <div className="ml-3 flex gap-2">
                <button
                  onClick={() => toggleRead(ch.id)}
                  className={`px-2 py-1 rounded text-xs cursor-pointer ${isRead ? "bg-green-600" : "bg-zinc-700"}`}
                >
                  {isRead ? "Read" : "Mark"}
                </button>
              </div>
            </div>
          );
        })}
        {filteredChapters.length === 0 && (
          <div className="text-gray-400 text-center p-4">No chapters found.</div>
        )}
      </div>
    </div>
  );
}