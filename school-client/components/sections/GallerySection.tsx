'use client';

import getGallery from '@/Backend/getGallery';
import { useEffect, useState } from 'react';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'events' | 'classroom' | 'activities'>('events');
  const [data, setData] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getGallery()
      .then((res) => setData(res))
      .catch((e) => console.log(e));
  }, []);

  const galleryItems = data.filter(
    (item) => item.fields.category === activeTab
  );

  return (
    <section id="gallery" className="py-10 px-6 bg-[var(--background)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* --- Header --- */}
        <div className="text-center mb-12 space-y-4 animate-fadeIn">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] nepali-text">
            फोटो ग्यालरी
          </h2>
          <div className="accent-bar mx-auto"></div>
          <p className="text-[var(--muted-text)] text-lg nepali-text max-w-xl mx-auto italic">
            "पञ्चावती विद्यालयका जीवन्त र अविस्मरणीय क्षणहरू"
          </p>
        </div>

        {/* --- Tabs (Using your .tab-button classes) --- */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 bg-[var(--muted-bg)] rounded-2xl border border-[var(--card-border)] shadow-inner">
            {(['events', 'classroom', 'activities'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button px-6 py-2.5 !rounded-xl text-sm font-bold transition-all duration-300 nepali-text ${
                  activeTab === tab ? 'tab-active shadow-lg' : 'hover:text-[var(--primary)]'
                }`}
              >
                {tab === 'events' ? 'कार्यक्रमहरू' : tab === 'classroom' ? 'कक्षाकोठा' : 'गतिविधिहरू'}
              </button>
            ))}
          </div>
        </div>

        {/* --- Gallery Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.sys.id || index}
              className="card group relative overflow-hidden  border-[var(--card-border)]"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.fields.image?.fields?.file?.url || ''}
                  alt={item.fields.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay with primary color tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-xs text-white/90 nepali-text leading-relaxed">
                    {item.fields.subtitle}
                  </p>
                </div>
              </div>

              {/* Minimal Content Box */}
              <div className="p-4 bg-[var(--card-bg)]">
                <h4 className="font-bold text-sm text-[var(--foreground)] nepali-text line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                  {item.fields.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* --- View More (Using your .btn classes) --- */}
        <div className="mt-16 text-center">
          <button 
            className="btn btn-primary nepali-text flex items-center gap-3 mx-auto group"
            onClick={() => setShowAll(true)}
          >
            सबै फोटोहरू हेर्नुहोस्
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* --- Modal (Using your .modal-content classes) --- */}
        {showAll && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 animate-fadeIn">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
              onClick={() => setShowAll(false)}
            />
            
            <div className="modal-content !max-w-6xl w-full">
              <div className="flex justify-between items-center mb-8 border-b border-[var(--card-border)] pb-4">
                <h3 className="text-2xl font-black nepali-text text-[var(--foreground)]">पूर्ण ग्यालरी</h3>
                <button
                  onClick={() => setShowAll(false)}
                  className="p-2 hover:bg-[var(--muted-bg)] rounded-full text-[var(--muted-text)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((item) => (
                  <div key={item.sys.id} className="card group overflow-hidden !rounded-2xl">
                    <div className="aspect-square">
                      <img
                        src={item.fields.image?.fields?.file?.url || ''}
                        alt={item.fields.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}