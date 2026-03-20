'use client';

import Link from 'next/link';
import Logo from '@/components/shared/logo';

export default function ResetPasswordIndex() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] animate-fadeIn">
        <div className="card overflow-hidden border-none shadow-xl mb-6 bg-white rounded-2xl">
          <header className="bg-primary-dark py-6 flex flex-col items-center justify-center text-white text-center">
            <div className="p-2 rounded-xl mb-3">
              <Logo />
            </div>
            <h2 className="text-xl text-accent font-bold nepali-text tracking-tight">रिसेट लिङ्क अमान्य छ</h2>
          </header>

          <div className="p-6 md:p-8 text-center">
            <p className="text-[var(--muted-text)] text-xs font-medium leading-relaxed nepali-text">
              कृपया तपाईंको इमेलमा आएको रिसेट लिङ्क (टोकन भएको URL) खोल्नुहोस्।
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/forget-password"
                className="btn btn-primary w-full py-3 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all nepali-text"
              >
                लिङ्क पुनः पठाउनुहोस्
              </Link>
              <Link href="/login" className="text-[11px] font-bold text-blue-600 hover:underline nepali-text">
                लगइन पेजमा फर्कनुहोस्
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400 text-[11px] font-medium opacity-60">
          &copy; {new Date().getFullYear()} School Management System
        </p>
      </div>
    </div>
  );
}
