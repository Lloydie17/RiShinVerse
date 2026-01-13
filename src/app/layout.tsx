"use client";

import './globals.css';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `hover:text-purple-500 transition-colors ${pathname === path ? "text-purple-500 font-bold" : "text-white"}`;

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <header className="bg-gray-900 p-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-500">
            RiShinScans
          </Link>
          <nav className="flex gap-4">
            <Link href="/">Latest</Link>
            <Link href="/bookmarks" className={linkClass("/bookmarks")}>Bookmarks</Link>
            <Link href="/genres" className={linkClass("/genres")}>Genres</Link>
            <Link href="/search" className={linkClass("/search")}>Search</Link>
          </nav>
        </header>

        <main className="flex-1 p-6">{children}</main>

        <footer className="bg-gray-900 p-4 text-center text-sm text-gray-400">
          &copy; 2026 RiShinScans
        </footer>
      </body>
    </html>
  );
}
