import type { Metadata } from "next";
import { Inter } from "next/font/google";



const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Student Dashboard - School Management System",
  description: "Student portal for school management",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-white min-h-screen`}>
      {/* <Logout onClose={()=>null}/> */}
      {children}
    </div>
  );
}
