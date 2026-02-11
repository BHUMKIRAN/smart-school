export default function NoticeTicker() {
  const notices = [
    "नयाँ शैक्षिक सत्र २०८१ को प्रवेश फारम खुला छ",
    "वार्षिक खेलकुद कार्यक्रम: माघ २५-२७",
    "अभिभावक-शिक्षक बैठक: माघ १५ गते"
  ];

  return (
    <div className="notice-ticker py-3 px-6">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
          </svg>
          <span className="font-bold text-sm text-yellow-800 nepali-text">सूचना:</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="ticker-content">
            {notices.map((notice, index) => (
              <span key={index} className="inline-block mr-12 text-sm text-yellow-900 nepali-text">
                {notice}
              </span>
            ))}
            {notices.map((notice, index) => (
              <span key={`duplicate-${index}`} className="inline-block mr-12 text-sm text-yellow-900 nepali-text">
                {notice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
