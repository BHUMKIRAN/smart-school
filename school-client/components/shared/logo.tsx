'use client';

import { useRouter } from 'next/navigation';

export default function Logo() {
  const router = useRouter();

  return (
    <div 
      className="group flex items-center cursor-pointer select-none py-2 gap-3"
      onClick={() => router.push('/')}
    >
      {/* --- THE MEDALLION --- */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - feels like a formal seal */}
        <div className="w-16 h-16 rounded-full border-[3px] border-[var(--accent)] flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--accent)]">
          {/* Inner Circle */}
          <div className="w-[85%] h-[85%] rounded-full border border-[var(--accent)]/30 flex items-center justify-center bg-white shadow-sm">
             <span className="text-[var(--primary)] font-black text-2xl nepali-text mt-1">
              श्री
            </span>
          </div>
        </div>
        
        {/* Decorative "Stamp" dots - a human touch used in official seals */}
        
      </div>

      {/* --- THE TYPOGRAPHIC DIVIDER --- */}
      <div className="h-12 w-[2px] bg-[var(--accent)]/40 rounded-full" />

      {/* --- THE IDENTITY --- */}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-2xl font-black text-white leading-none nepali-text tracking-normal  transition-colors">
          पञ्चावती
        </h1>
        
        <div className="flex flex-col mt-1">
          <span className="text-[13px] md:text-[14px] font-bold text-[var(--accent)] nepali-text leading-tight">
            आधारभूत विद्यालय
          </span>
          
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--muted-text)] opacity-80">
              Bhadaure , Rautamai
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nepali-text {
          /* Removing digital skew, focusing on clean, heavy weight */
          line-height: 1;
        }
      `}</style>
    </div>
  );
}