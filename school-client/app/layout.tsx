import type { Metadata } from 'next';
import AppProvider from '@/provider/provider';
import './globals.css';
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
    <html lang="ne" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
