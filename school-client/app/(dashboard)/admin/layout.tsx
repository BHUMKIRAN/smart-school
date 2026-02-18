import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css"; // adjust path if needed

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard - School Management System",
  description: "Administrative control panel for school management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${manrope.className} bg-white  text-slate-100 min-h-screen`}>
      {children}
    </div>
  );
}
