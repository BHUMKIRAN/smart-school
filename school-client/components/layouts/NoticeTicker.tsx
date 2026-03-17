"use client";
import { API_BASE_URL } from "@/lib/endpoints";
import { useEffect, useState } from "react";

interface Notice {
  title: string;
  message?: string;
}

export default function NoticeTicker() {
  const [notices, setNotices] = useState<Notice[]>([]);

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notices`);
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="notice-ticker dark:bg-slate-950/90  py-2 px-3 shadow-sm relative z-40 overflow-hidden group">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* Label: Fixed on the left */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-accent/20 backdrop-blur-sm pr-4 py-1 border-r border-accent/30 z-10 relative">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
          </div>
          <span className="font-bold text-xs text-gray-900 uppercase tracking-wider nepali-text hidden sm:inline">
            सूचना:
          </span>
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden relative">
          {/* Subtle Fade effect on sides */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ticker-bg to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ticker-bg to-transparent z-10"></div>

          <div className="ticker-content whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {/* First set of notices */}
            {notices.map((n, index) => (
              <div key={`notice-${index}`} className="flex items-center">
                <span className="inline-block text-xs font-semibold text-gray-800 nepali-text px-3">
                  {n.title}
                </span>
                {/* Visual Separator */}
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mx-2"></div>
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {notices.map((n, index) => (
              <div key={`duplicate-${index}`} className="flex items-center">
                <span className="inline-block text-xs font-semibold text-gray-800 nepali-text px-3">
                  {n.title}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mx-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
