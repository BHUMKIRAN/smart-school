'use client';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-600 flex items-center justify-center">
        <span className="text-white font-bold text-lg">श्री</span>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-800 nepali-text leading-tight">
          श्री पञ्चावती आधारभूत विद्यालय
        </h1>
        <p className="text-xs text-gray-500 nepali-text">भदौरे, नेपाल</p>
      </div>
    </div>
  );
}
