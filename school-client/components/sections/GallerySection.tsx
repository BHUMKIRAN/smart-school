'use client';

import { ValueOf } from 'next/dist/shared/lib/constants';
import { useState } from 'react';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('events');

  const galleryItems = {
    events: [
      { title: 'Annual Sports Day 2081', description: 'Students showcasing their athletic abilities' },
      { title: 'Science Exhibition', description: 'Innovative projects by young minds' },
      { title: 'Cultural Program', description: 'Celebrating diversity and tradition' },
      { title: 'Prize Distribution', description: 'Honoring academic excellence' }
    ],
    classroom: [
      { title: 'Smart Classroom', description: 'Technology-enabled learning environment' },
      { title: 'Science Lab', description: 'Hands-on practical learning' },
      { title: 'Computer Lab', description: 'Digital literacy development' },
      { title: 'Library', description: 'A world of knowledge and imagination' }
    ],
    activities: [
      { title: 'Art & Craft', description: 'Nurturing creativity and expression' },
      { title: 'Music Class', description: 'Developing musical talents' },
      { title: 'Dance Performance', description: 'Cultural and modern dance forms' },
      { title: 'Debate Competition', description: 'Building communication skills' }
    ]
  };

  return (
    <section id="gallery" className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 nepali-text">फोटो ग्यालरी</h2>
          <div className="accent-bar mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Glimpses of our vibrant school life and memorable moments
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('events')}
            className={`tab-button ${activeTab === 'events' ? 'tab-active' : ''} nepali-text`}
          >
            कार्यक्रमहरू
          </button>
          <button
            onClick={() => setActiveTab('classroom')}
            className={`tab-button ${activeTab === 'classroom' ? 'tab-active' : ''} nepali-text`}
          >
            कक्षाकोठा र सुविधा
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`tab-button ${activeTab === 'activities' ? 'tab-active' : ''} nepali-text`}
          >
            गतिविधिहरू
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems[activeTab as keyof typeof galleryItems].map((item, index) => (
            <div key={index} className="card overflow-hidden group">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
