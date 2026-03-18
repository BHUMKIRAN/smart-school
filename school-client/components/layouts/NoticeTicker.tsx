"use client";
import { API_BASE_URL } from "@/lib/endpoints";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

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
      // Ensure we have data to map over
      setNotices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="notice-ticker bg-[var(--card-bg)] border-b border-[var(--card-border)] py-2 px-4 shadow-sm relative z-40 overflow-hidden group">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* Label: Fixed on the left */}
        <div className="flex items-center gap-3 flex-shrink-0 bg-[var(--card-bg)] pr-6 py-1 border-r border-[var(--card-border)] z-20 relative">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-300">
            <Bell className="w-4 h-4 text-secondary" />
          </div>
          <span className="font-black text-[10px] text-[var(--foreground)] uppercase tracking-[0.2em] nepali-text hidden sm:inline">
            सूचना:
          </span>
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden relative">
          {/* Subtle Fade effect on sides for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--card-bg)] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--card-bg)] to-transparent z-10"></div>

          <div className="ticker-content whitespace-nowrap flex items-center group-hover:[animation-play-state:paused] py-1">
            {/* First set of notices */}
            {notices.map((n, index) => (
              <div key={`notice-${index}`} className="flex items-center">
                <span className="inline-block text-xs font-bold text-[var(--foreground)] opacity-90 hover:text-[var(--primary)] transition-colors nepali-text px-4 cursor-default">
                  {n.title}
                </span>
                {/* Visual Separator */}
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 mx-2"></div>
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {notices.map((n, index) => (
              <div key={`duplicate-${index}`} className="flex items-center">
                <span className="inline-block text-xs font-bold text-[var(--foreground)] opacity-90 hover:text-[var(--primary)] transition-colors nepali-text px-4 cursor-default">
                  {n.title}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 mx-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-content {
          display: inline-flex;
          animation: ticker 30s linear infinite;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}