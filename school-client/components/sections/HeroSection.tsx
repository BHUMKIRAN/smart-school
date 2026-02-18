'use client';



export default function HeroSection() {


  return (
    <section
      id="home"
      className="hero-gradient py-20 px-6 text-gray-900 dark:text-gray-100 dark:bg-gray-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-gray-300/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 dark:bg-gray-700/20">
              <span className="text-sm font-medium nepali-text">स्वागत छ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 nepali-text">
              श्री पञ्चावती आधारभूत विद्यालय
            </h1>
            <p className="text-lg mb-6 text-gray-700/90 nepali-text dark:text-gray-300/90">
              भदौरे, नेपाल
            </p>
            <p className="text-gray-800/80 mb-8 leading-relaxed dark:text-gray-200/80">
              Building futures through quality education. Excellence in academics, character development, and holistic growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="btn bg-white text-indigo-500 hover:translate-x-0.5 nepali-text dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 transition"
              >
                थप जान्नुहोस्
              </a>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card dark:bg-gray-800 dark:text-gray-100">
              <div className="stat-number">486</div>
              <p className="text-gray-600 text-sm mt-1 nepali-text dark:text-gray-300">विद्यार्थीहरू</p>
            </div>
            <div className="stat-card dark:bg-gray-800 dark:text-gray-100">
              <div className="stat-number">28</div>
              <p className="text-gray-600 text-sm mt-1 nepali-text dark:text-gray-300">शिक्षकहरू</p>
            </div>
            <div className="stat-card dark:bg-gray-800 dark:text-gray-100">
              <div className="stat-number">15+</div>
              <p className="text-gray-600 text-sm mt-1 nepali-text dark:text-gray-300">वर्षको अनुभव</p>
            </div>
            <div className="stat-card dark:bg-gray-800 dark:text-gray-100">
              <div className="stat-number">95%</div>
              <p className="text-gray-600 text-sm mt-1 nepali-text dark:text-gray-300">सफलता दर</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
