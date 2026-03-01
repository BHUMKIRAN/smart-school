'use client';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center bg-white overflow-hidden pt-24 pb-12"
    >
      {/* --- High-End Background Accents --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/80 -skew-x-12 translate-x-1/4 -z-10"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Left Column: Typography & Action --- */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-700 tracking-[0.2em] uppercase nepali-text">
                स्वागत छ — भदौरे, नेपाल
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
              <span className="nepali-text block drop-shadow-sm">श्री पञ्चावती</span>
              <span className="relative inline-block text-blue-600 nepali-text">
                आधारभूत विद्यालय
                {/* Yellow Scribble Underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              गुणस्तरीय शिक्षाद्वारा भावी पुस्ताको सशक्तीकरण । <span className="text-slate-900 font-semibold italic">एउटा यस्तो पवित्र थलो जहाँ ज्ञान र संस्कारको मिलन हुन्छ ।</span> 
              
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <a
                href="#about"
                className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-slate-900 shadow-2xl shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-3 nepali-text"
              >
                थप जान्नुहोस्
                <div className="p-1 bg-white/20 rounded-lg group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all text-center nepali-text"
              >
                सम्पर्क गर्नुहोस्
              </a>
            </div>

            {/* Premium Mini Stats */}
            <div className="flex items-center gap-12 pt-10 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-3xl font-black text-slate-900">480+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest nepali-text">विद्यार्थी</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-slate-900">28</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest nepali-text">शिक्षक</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
              <div className="hidden sm:block space-y-1">
                <p className="text-3xl font-black text-slate-900">15+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest nepali-text">वर्ष अनुभव</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Your Uploaded Photos --- */}
          <div className="relative h-[550px] md:h-[650px] w-full">
            
            {/* Background Accent Orb */}
            <div className="absolute inset-0 m-auto w-[80%] h-[80%] bg-yellow-400/10 rounded-full blur-[100px] -z-10"></div>

            {/* Photo 1: teaching3.jpeg (Top Left) */}
            <div className="absolute top-0 left-0 w-[58%] h-[55%] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-[-3deg] z-20 group">
              <img 
                src="/students.jpeg" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Students in classroom" 
              />
            </div>

            {/* Photo 2: students2.jpeg (Top Right) */}
            <div className="absolute top-12 right-0 w-[42%] h-[42%] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-[4deg] z-10 group">
              <img 
                src="/teacherandparents.jpeg" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Students with books" 
              />
            </div>

            {/* Photo 3: teaching2.jpeg (Bottom Left) */}
            <div className="absolute bottom-10 left-8 w-[48%] h-[35%] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-[2deg] z-30 group">
              <img 
                src="/teaching3.jpeg" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Teacher explaining" 
              />
            </div>

            {/* Photo 4: teacher and student.jpeg (Bottom Right Focus) */}
            <div className="absolute bottom-0 right-4 w-[50%] h-[45%] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-[-5deg] z-40 group">
              <img 
                src="/teastd.jpeg" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Community Group Photo" 
              />
              {/* Special Floating Badge on the main image */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 p-2 rounded-xl shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* Extra Decoration Circle */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}