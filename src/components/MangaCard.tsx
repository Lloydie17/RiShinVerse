import Link from 'next/link';

export default function MangaCard({ manga }: { manga: any }) {
  return (
    <Link href={`/manga/${encodeURIComponent(manga.id)}`}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
        <img
          src={`/api/image-proxy?url=${encodeURIComponent(manga.image)}`}
          alt={manga.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-2 text-sm text-white font-medium text-center truncate">
          {manga.title}
        </div>
      </div>
    </Link>
  );
}
