'use client';

import { useState } from 'react';
import Link from 'next/link';
import AttendanceModal from '@/components/ui/modal/AttendanceModal';
import { useSettings } from '@/context/context';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  const { state, dispatch } = useSettings()
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold nepali-text">श्री</span>
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight nepali-text">
                  श्री पञ्चावती आधारभूत विद्यालय
                </h1>
                <p className="text-xs text-gray-600 nepali-text">भदौरे, नेपाल</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#home" className="text-sm font-medium hover:text-primary-500 transition nepali-text">
                गृहपृष्ठ
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary-500 transition nepali-text">
                परिचय
              </Link>
              <Link href="#board" className="text-sm font-medium hover:text-primary-500 transition nepali-text">
                निर्देशक मण्डल
              </Link>
              <Link href="#administration" className="text-sm font-medium hover:text-primary-500 transition nepali-text">
                प्रशासन
              </Link>
              <Link href="#gallery" className="text-sm font-medium hover:text-primary-500 transition nepali-text">
                ग्यालरी
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary-500 transition nepali-text">
                सम्पर्क
              </Link>

              {/* Attendance Button */}
              <button
                onClick={() => setIsAttendanceOpen(true)}
                className="attendance-btn flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="nepali-text">उपस्थिति</span>
              </button>
              <button
                onClick={() => dispatch({ type: "toggleTheme" })}
                className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primaryDark transition-colors dark:bg-primaryDark dark:text-white dark:hover:bg-primary"
              >
                {state.theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4 space-y-3`}>
            <Link
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition nepali-text"
            >
              गृहपृष्ठ
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition nepali-text"
            >
              परिचय
            </Link>
            <Link
              href="#board"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition nepali-text"
            >
              निर्देशक मण्डल
            </Link>
            <Link
              href="#administration"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition nepali-text"
            >
              प्रशासन
            </Link>
            <Link
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition nepali-text"
            >
              ग्यालरी
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition nepali-text"
            >
              सम्पर्क
            </Link>

            {/* Mobile Attendance Button */}
            <button
              onClick={() => {
                setIsAttendanceOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm font-medium text-primary-500 nepali-text flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              आजको उपस्थिति
            </button>
          </div>
        </div>
      </nav>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
      />
    </>
  );
}
