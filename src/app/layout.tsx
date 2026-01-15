import './globals.css';
import NavHeader from '@/components/NavHeader';

export const metadata = {
  title: 'RiShinVerse',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <NavHeader />
        <main className="flex-1 p-6">{children}</main>
        <footer className="bg-gray-900 p-4 text-center text-sm text-gray-400">
          &copy; 2026 RiShinVerse
        </footer>
      </body>
    </html>
  );
}