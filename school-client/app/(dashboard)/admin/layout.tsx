import type { Metadata } from "next";

import { DialogDemo } from "@/modals/adminCode";

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
    <div className="bg-white min-h-screen">
      <DialogDemo />
      {children}
    </div>
  );
}
