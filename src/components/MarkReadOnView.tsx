"use client";

import { useEffect } from "react";

export default function MarkReadOnView({ chapterId }: { chapterId: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("aniga:readChapters");
      const arr = raw ? JSON.parse(raw) : [];
      const set = new Set(arr.map(String));
      set.add(String(chapterId));
      localStorage.setItem("aniga:readChapters", JSON.stringify(Array.from(set)));
    } catch {
      // noop
    }
  }, [chapterId]);

  return null;
}