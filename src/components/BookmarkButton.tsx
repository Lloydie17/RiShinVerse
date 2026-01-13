"use client";

import { useEffect, useState } from "react";

export default function BookmarkButton({ id, title, image }: { id: string; title: string; image?: string; }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aniga:bookmarks");
      const arr = raw ? JSON.parse(raw) : [];
      setBookmarked(arr.some((b: any) => String(b.id) === String(id)));
    } catch {
      setBookmarked(false);
    }
  }, [id]);

  const toggle = () => {
    try {
      const raw = localStorage.getItem("aniga:bookmarks");
      const arr = raw ? JSON.parse(raw) : [];
      const exists = arr.findIndex((b: any) => String(b.id) === String(id));
      if (exists >= 0) {
        arr.splice(exists, 1);
        localStorage.setItem("aniga:bookmarks", JSON.stringify(arr));
        setBookmarked(false);
      } else {
        arr.push({ id, title, image });
        localStorage.setItem("aniga:bookmarks", JSON.stringify(arr));
        setBookmarked(true);
      }
    } catch {
      // noop
    }
  };

  return (
    <button onClick={toggle} className={`px-3 py-1 rounded font-bold ${bookmarked ? "bg-green-600" : "bg-purple-600"} text-white`}>
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}