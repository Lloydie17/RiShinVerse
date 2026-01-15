import Link from 'next/link';

export default function MangaCard({ manga }: { manga: any }) {
  const id = manga.mangaId ?? manga.id;
  const title = manga.mangaTitle ?? manga.title;

  if (!id) return null;

  return (
    <Link href={`/manga/${encodeURIComponent(id)}`}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
        <img
          src={`/api/image-proxy?url=${encodeURIComponent(manga.image)}`}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="p-2 text-sm text-white font-medium text-center truncate">
          {title}
        </div>
      </div>
    </Link>
  );
}
