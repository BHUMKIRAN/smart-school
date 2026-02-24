'use client';

import { useState } from 'react';
import Link from 'next/link';
import AttendanceModal from '@/modals/AttendanceModal';
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
      <nav className="navbar">
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
                className="theme-toggle flex items-center gap-2"
                aria-label="Toggle theme"
              >
                {state.theme === "light" ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span>Light</span>
                  </>
                )}
              </button>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors duration-200">
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
