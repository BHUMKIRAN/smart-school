import type { Metadata } from "next";

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
    <div className="bg-white min-h-screen">
      {/* <Logout onClose={()=>null}/> */}
      {children}
    </div>
  );
}
