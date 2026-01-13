"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [text, setText] = useState("");
  const fullText = "RiShinScans";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) i = 0; // loop typing
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 className="text-4xl md:text-6xl font-bold text-purple-500">{text}|</h1>
    </div>
  );
}
