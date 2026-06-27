import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ProductStore — Marketplace de tecnología',
  description: 'Explora y gestiona productos de electrónica, accesorios y computación',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
