'use client';

import { useState } from 'react';
import AttendanceModal from '../AttendanceModal';

export default function HeroSection() {
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  return (
    <>
      <section id="home" className="hero-gradient  text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gray-300/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium nepali-text">स्वागत छ</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 nepali-text">
                श्री पञ्चावती आधारभूत विद्यालय
              </h1>
              <p className="text-lg mb-6 text-white/90 nepali-text">
                भदौरे, नेपाल
              </p>
              <p className="text-white/80 mb-8 leading-relaxed">
                Building futures through quality education. Excellence in academics, character development, and holistic growth.
              </p>
              <div className="flex flex-wrap gap-4">
               
                <a href="#about" className="btn bg-white text-indigo-500 hover:translate-x-0.5 nepali-text">
                  थप जान्नुहोस्
                </a>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card">
                <div className="stat-number">486</div>
                <p className="text-gray-600 text-sm mt-1 nepali-text">विद्यार्थीहरू</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">28</div>
                <p className="text-gray-600 text-sm mt-1 nepali-text">शिक्षकहरू</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <p className="text-gray-600 text-sm mt-1 nepali-text">वर्षको अनुभव</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <p className="text-gray-600 text-sm mt-1 nepali-text">सफलता दर</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
