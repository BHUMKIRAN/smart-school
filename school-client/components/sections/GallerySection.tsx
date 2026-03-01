'use client';

import { useState } from 'react';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('events');

  const galleryItems = {
    events: [
      { title: 'वार्षिक खेलकुद दिवस २०८१', description: 'विद्यार्थीहरूको खेल कौशल प्रदर्शन', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600' },
      { title: 'विज्ञान प्रदर्शनी', description: 'साना वैज्ञानिकहरूका नवीन आविष्कार', img: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=600' },
      { title: 'सांस्कृतिक कार्यक्रम', description: 'परम्परा र कलाको संरक्षण', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600' },
      { title: 'पुरस्कार वितरण', description: 'उत्कृष्ट विद्यार्थीहरूको सम्मान', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600' }
    ],
    classroom: [
      { title: 'स्मार्ट कक्षाकोठा', description: 'प्रविधिमैत्री सिकाई वातावरण', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600' },
      { title: 'विज्ञान प्रयोगशाला', description: 'प्रयोगात्मक अभ्यासको केन्द्र', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=600' },
      { title: 'कम्प्युटर ल्याब', description: 'डिजिटल साक्षरता अभियान', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600' },
      { title: 'पुस्तकालय', description: 'ज्ञान र कल्पनाको संसार', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600' }
    ],
    activities: [
      { title: 'चित्रकला र हस्तकला', description: 'सिर्जनशीलताको प्रस्फुटन', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600' },
      { title: 'संगीत कक्षा', description: 'गायन र वादनको अभ्यास', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600' },
      { title: 'नृत्य प्रस्तुति', description: 'मौलिक र आधुनिक नृत्य कला', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600' },
      { title: 'वक्तृत्व कला', description: 'सञ्चार क्षमताको विकास', img: 'https://images.unsplash.com/photo-1475721027466-a0eb8424fdfe?auto=format&fit=crop&q=80&w=600' }
    ]
  };

  return (
    <section id="gallery" className="py-16 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Compact Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white nepali-text">
            फोटो <span className="text-blue-600">ग्यालरी</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm nepali-text max-w-xl mx-auto">
            "पञ्चावती विद्यालयका जीवन्त र अविस्मरणीय क्षणहरू"
          </p>
        </div>

        {/* Small Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {(['events', 'classroom', 'activities'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 nepali-text ${
                  activeTab === tab 
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems[activeTab as keyof typeof galleryItems].map((item, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                   <p className="text-[10px] text-white/90 nepali-text leading-tight line-clamp-2">
                     {item.description}
                   </p>
                </div>
              </div>

              {/* Minimal Content Box */}
              <div className="p-3">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 nepali-text line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Simple View More */}
        <div className="mt-10 text-center">
           <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto group">
             सबै फोटोहरू हेर्नुहोस्
             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
           </button>
        </div>

      </div>
    </section>
  );
}