import type { Metadata } from 'next';
import '@/styles/globals.css';
import './provider'
import Providers from './provider';

export const metadata: Metadata = {
  title: 'श्री पञ्चावती आधारभूत विद्यालय - भदौरे',
  description: 'Building futures through quality education. Excellence in academics, character development, and holistic growth.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
