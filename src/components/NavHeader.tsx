"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavHeader() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `hover:text-purple-500 transition-colors ${pathname === path ? "text-purple-500 font-bold" : "text-white"}`;

  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/RiShinVerse_Logo2.png" alt="RiShinVerse" width={160} height={40} priority />
        <span className="sr-only">RiShinVerse</span>
      </Link>
      <nav className="flex gap-4">
        <Link href="/" className={linkClass("/")}>Latest</Link>
        <Link href="/bookmarks" className={linkClass("/bookmarks")}>Bookmarks</Link>
        <Link href="/genres" className={linkClass("/genres")}>Genres</Link>
        <Link href="/search" className={linkClass("/search")}>Search</Link>
      </nav>
    </header>
  );
}