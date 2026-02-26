import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const jetBrains = JetBrains_Mono({
  variable: '--font-dashboard',
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
    var isDashboard = window.location.pathname.startsWith('/dashboard');
    if (isDashboard) {
      document.documentElement.classList.add('dashboard-mono');
    }
    var fallbackTheme = isDashboard ? 'system' : 'light';
    try {
      var t = localStorage.getItem('kavana-theme') || fallbackTheme;
      if (t === 'system') {
        t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.classList.add(t);
    } catch(e) {
      if (isDashboard && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${jetBrains.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {/* Global backdrop effects */}
        <div className="pointer-events-none fixed inset-0 ctp-noise opacity-60 z-0" />
        <div className="pointer-events-none fixed inset-0 ctp-grid opacity-20 z-0" />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
