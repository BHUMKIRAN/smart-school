'use client';

import getGallery from '@/api/getGallery';
import { useEffect, useState } from 'react';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'events' | 'classroom' | 'activities'>('events');
  const [data, setData] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getGallery()
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
  }, []);

  // Filter data by category for the active tab
  const galleryItems = data.filter(
    (item) => item.fields.category === activeTab
  );

  return (
    <section id="gallery" className="py-12 px-6 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">

        {/* Compact Header */}
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white nepali-text">
            फोटो <span className="text-blue-600">ग्यालरी</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm nepali-text max-w-xl mx-auto">
            "पञ्चावती विद्यालयका जीवन्त र अविस्मरणीय क्षणहरू"
          </p>
        </div>

        {/* Small Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {(['events', 'classroom', 'activities'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 nepali-text ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-blue-600'
                  }`}
              >
                {tab === 'events' ? 'कार्यक्रमहरू' : tab === 'classroom' ? 'कक्षाकोठा' : 'गतिविधिहरू'}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryItems.map((item, index) => (
            <div
              key={item.sys.id || index}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.fields.image?.fields?.file?.url || ''}
                  alt={item.fields.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                  <p className="text-[10px] text-white/90 nepali-text leading-tight line-clamp-2">
                    {item.fields.subtitle}
                  </p>
                </div>
              </div>

              {/* Minimal Content Box */}
              <div className="p-2.5">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 nepali-text line-clamp-1">
                  {item.fields.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Simple View More */}
        <div className="mt-10 text-center">
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto group"
            onClick={() => setShowAll(!showAll)}>
            सबै फोटोहरू हेर्नुहोस्
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        {showAll && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center z-[9999] p-20">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-10 relative shadow-lg">

              {/* Close Button */}
              <button
                onClick={() => setShowAll(false)}
                className="absolute top-4 right-4 text-slate-800 dark:text-slate-200 hover:text-red-500 transition-colors text-lg font-bold"
              >
                ✕
              </button>

              {/* Grid of Images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.map((item) => (
                  <div
                    key={item.sys.id}
                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={item.fields.image?.fields?.file?.url || ''}
                        alt={item.fields.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                        <p className="text-[10px] text-white/90 nepali-text leading-tight line-clamp-2">
                          {item.fields.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 nepali-text line-clamp-1">
                        {item.fields.title}
                      </h4>
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