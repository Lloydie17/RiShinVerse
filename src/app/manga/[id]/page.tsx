import api from '@/lib/api';
import ChapterList from '@/components/ChapterList';
import BookmarkButton from '@/components/BookmarkButton';

async function getInfo(id: string) {
    const decodedid = decodeURIComponent(id);

    const res = await api.get('/manga/mangakakalot/info', {
        params: { id: decodedid },
    });
    return res.data;
}

export default async function MangaPage({ params }: { params: Promise<{ id: string }>; }) {
  const { id } = await params;
  const manga = await getInfo(id);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Manga Cover */}
        <img
          src={`/api/image-proxy?url=${encodeURIComponent(manga.image)}`}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />

        {/* Manga Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{manga.title}</h1>
            {/* Bookmark */}
            <div className="ml-auto">
              {/* BookmarkButton is client-side */}
              {/* @ts-ignore */}
              <BookmarkButton id={manga.id} title={manga.title} image={manga.image} />
            </div>
          </div>

          {/* Status */}
          <p className="mt-2 text-gray-400">
            <span className="font-semibold">Status:</span> {manga.status || "Unknown"}
          </p>

          {/* Authors */}
          <p className="mt-1 text-gray-400">
            <span className="font-semibold">Author{manga.authors && manga.authors.length > 1 ? "s" : ""}:</span>{" "}
            {manga.authors && manga.authors.length > 0 ? manga.authors.join(", ") : "Unknown"}
          </p>

          {/* Genres */}
          <p className="mt-1 text-gray-400">
            <span className="font-semibold">Genres:</span>{" "}
            {manga.genres && manga.genres.length > 0 ? manga.genres.join(", ") : "Unknown"}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-300 leading-relaxed">
            {manga.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Chapters */}
      <ChapterList chapters={manga.chapters} title={manga.title} />
    </div>
  );

}