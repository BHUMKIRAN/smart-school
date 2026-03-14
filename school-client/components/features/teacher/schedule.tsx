'use client';

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/endpoints";
import axios from "axios";

export default function SimpleTeacherHeader() {
  const [schedulePdf, setSchedulePdf] = useState<string | null>(null);
  const user = useSelector((state: any) => state.auth.user);
  const teacherId = user._id || user.id;

  // Fetch teacher's PDF
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/schedule/teacher/${teacherId}`);
        setSchedulePdf(res.data.pdfUrl); // assuming backend sends { pdfUrl: "/uploads/..." }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load schedule PDF");
      }
    };
    fetchPdf();
  }, [teacherId]);

  const handleDownloadPDF = () => {
    if (!schedulePdf) {
      toast.error("No PDF available");
      return;
    }

    // Open PDF in new tab
    window.open(`${API_BASE_URL}${schedulePdf}`, "_blank");
  };

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user.name}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-12 gap-y-6 py-6 border-y border-slate-100 dark:border-slate-800/60">
        {/* Simple stats can stay here */}
        <button
          onClick={handleDownloadPDF}
          className="ml-auto flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all uppercase tracking-wider"
        >
          View Schedule <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}