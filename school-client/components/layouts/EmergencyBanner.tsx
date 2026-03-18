"use client";

import { useEffect, useState } from "react";
import { api } from "@/Backend/axiosClientInstance";
import { AlertTriangle, X } from "lucide-react";

interface EmergencyNotice {
  _id: string;
  title: string;
  message: string;
}

export default function EmergencyBanner() {
  const [notices, setNotices] = useState<EmergencyNotice[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get(`/emergencyNotices`);
        setNotices(res.data);
        if (res.data && res.data.length > 0) {
          setIsVisible(true);
        }
      } catch (error) {
        console.error("Error fetching emergency notices:", error);
      }
    };
    fetchNotices();
  }, []);

  if (!isVisible || notices.length === 0) return null;

  return (
    <div className="sticky top-0 z-[100] w-full border-b border-[var(--error)]/30 shadow-2xl ">
      {/* Emergency Background using CSS Variable */}
      <div className="bg-[var(--error)] text-white px-4 py-2.5 relative overflow-hidden">
        
        {/* Animated Pulse Overlay */}
        

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-4 overflow-hidden">
            {/* Warning Icon - Using Lucide for consistency */}
            <div className="flex-shrink-0 bg-white/20 p-1.5 rounded-xl backdrop-blur-md shadow-lg border border-white/30">
              <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
            </div>

            {/* Notice Text */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-hidden">
              <span className="text-[15px] font-black uppercase  bg-black/20 px-2.5 py-1 rounded-lg border border-white/10 w-fit nepali-text whitespace-nowrap">
                जरुरी सूचना
              </span>
              <div className="flex items-center gap-3 overflow-hidden">
                <p className="text-xs md:text-sm font-black nepali-text truncate leading-tight tracking-wide">
                  {notices.map((n) => n.title).join(" • ")}
                </p>
                <span className="hidden md:inline-block w-2 h-2 bg-white rounded-full animate-ping shrink-0"></span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex items-center">
             <button
              onClick={() => setIsVisible(false)}
              className="group flex-shrink-0 p-2 rounded-xl hover:bg-white/20 transition-all active:scale-90 border border-transparent hover:border-white/20"
              aria-label="Close alert"
            >
              <X className="w-5 h-5 text-white/80 group-hover:text-white" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}