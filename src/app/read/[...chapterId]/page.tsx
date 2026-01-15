import ScrollUp from '@/components/ScrollUp';
import api from '@/lib/api';

async function getPages(chapterId: string) {
  const res = await api.get('/manga/mangapill/read', { params: { chapterId } });
  return res.data;
}

export default async function ReaderPage({ params }: { params: { chapterId: string[] }}) {
  const { chapterId } = await params;
  const chapterIdStr = chapterId.join('/');
  const data = await getPages(chapterIdStr);

  const pages =
    Array.isArray(data)
      ? data
      : Array.isArray(data?.pages)
      ? data.pages
      : [];

  if (!pages.length) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Failed to load chapter pages.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center py-6 space-y-6">
      {pages.map((page: any, i: number) => (
        <img
          key={i}
          src={`/api/image-proxy?url=${encodeURIComponent(page.img)}`}
          alt={`Page ${i + 1}`}
          className="w-full max-w-3xl rounded-lg shadow-md"
          loading="lazy"
        />
      ))}

      <ScrollUp />
    </div>
  );
}
