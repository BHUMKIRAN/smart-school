import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';


const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Teacher Dashboard - School Management System',
  description: 'Teacher portal for school management',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
