'use client';

export default function Logo() {
  return (
    <div className="group flex items-center gap-3.5 cursor-pointer">
      {/* Icon Container with Glass Effect and Glow */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-200 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300 border border-white/20">
          <span className="text-white font-black text-xl nepali-text drop-shadow-md">
            श्री
          </span>
          
          {/* Decorative Dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Text Container */}
      <div className="flex flex-col justify-center">
        <h1 className="text-[17px] md:text-[19px] font-black text-slate-900 leading-none tracking-tight nepali-text">
          श्री पञ्चावती
          <span className="block text-blue-600 text-[13px] md:text-[14px] font-bold mt-0.5">
            आधारभूत विद्यालय
          </span>
        </h1>
        
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
          <p className="text-[10px] uppercase font-black tracking-[0.15em] text-slate-400">
            Bhadure, Nepal
          </p>
        </div>
      </div>
    </div>
  );
}