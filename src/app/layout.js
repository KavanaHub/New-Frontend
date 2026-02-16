import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Kavana - Sistem Bimbingan Online',
  description:
    'Platform terintegrasi untuk mahasiswa, dosen pembimbing, dan koordinator. Kelola proses bimbingan Proyek & Internship secara digital.',
};

// Inline script to prevent flash of wrong theme (runs before paint)
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('kavana-theme') || 'dark';
      if (t === 'system') {
        t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.classList.add(t);
    } catch(e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Global backdrop effects */}
        <div className="pointer-events-none fixed inset-0 ctp-noise z-0" />
        <div className="pointer-events-none fixed inset-0 ctp-grid opacity-60 z-0" />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
