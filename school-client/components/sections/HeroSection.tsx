'use client';

import { useEffect, useMemo, useState } from "react";
import { getHero } from "@/api/useHero";

type ContentfulAsset = {
  fields?: {
    title?: string;
    file?: {
      url?: string;
    };
  };
};

type HeroFields = {
  title?: string;
  subtitle?: string;
  photos?: ContentfulAsset[];
};

const toAssetUrl = (asset?: ContentfulAsset) => {
  const url = asset?.fields?.file?.url;
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
};

export default function HeroSection() {
  const [hero, setHero] = useState<HeroFields | null>(null);

  useEffect(() => {

    let isMounted = true;
    getHero()
      .then((entry) => {
        if (!isMounted) return;
        setHero(entry?.fields ?? null);
      })

      .catch(() => {
        if (!isMounted) return;
        setHero(null);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const images = useMemo(() => {
    const photos = hero?.photos ?? [];
    const byTitle = new Map(
      photos.map((p) => [
        (p?.fields?.title ?? "").toLowerCase(),
        { url: toAssetUrl(p), title: p?.fields?.title },
      ])
    );

    return {
      img1: byTitle.get("img1")?.url ?? "/students.jpeg",
      img2: byTitle.get("img2")?.url ?? "/teacherandparents.jpeg",
      img3: byTitle.get("img3")?.url ?? "/teaching3.jpeg",
      img4: byTitle.get("img4")?.url ?? "/teastd.jpeg",
      alt1: byTitle.get("img1")?.title ?? "Hero image",
      alt2: byTitle.get("img2")?.title ?? "Hero image",
      alt3: byTitle.get("img3")?.title ?? "Hero image",
      alt4: byTitle.get("img4")?.title ?? "Hero image",
    };
  }, [hero]);

  const title = hero?.title
  const subtitle =
    hero?.subtitle 
   

  return (
    <section
      id="home"
      className="relative min-h-[75vh] flex items-center  dark:bg-slate-950  overflow-hidden pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* --- Left Column: Typography & Action --- */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            {/* Status Badge */}

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight">
              <span className="relative inline-block text-blue-600 nepali-text">
                {title}
                {/* Yellow Scribble Underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400/70"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0, 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-primary leading-relaxed max-w-lg">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <a
                href="#about"
                className="group px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-accent shadow-2xl shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-3 nepali-text"
              >
                थप जान्नुहोस्
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-white text-accent font-bold rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all text-center nepali-text"
              >
                सम्पर्क गर्नुहोस्
              </a>
            </div>

            {/* Premium Mini Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-6">
              {/* Students */}
              <div className="flex flex-col items-center">
                <p className="text-3xl sm:text-2xl font-black text-primary">
                  480+
                </p>
                <p className="text-xs sm:text-sm font-bold text-accent uppercase tracking-widest nepali-text">
                  विद्यार्थी
                </p>
              </div>

              {/* Teachers */}
              <div className="flex flex-col items-center">
                <p className="text-3xl sm:text-2xl font-black text-primary">
                  28
                </p>
                <p className="text-xs sm:text-sm font-bold text-accent uppercase tracking-widest nepali-text">
                  शिक्षक
                </p>
              </div>

              {/* Experience */}
              <div className="flex flex-col items-center">
                <p className="text-3xl sm:text-2xl font-black text-primary">
                  15+
                </p>
                <p className="text-xs sm:text-sm font-bold text-accent uppercase tracking-widest nepali-text">
                  वर्ष अनुभव
                </p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Your Uploaded Photos --- */}
          <div className="relative h-[420px] md:h-[520px] w-full">
            {/* Background Accent Orb */}
            <div className="absolute inset-0 m-auto w-[80%] h-[80%] bg-yellow-400/10 rounded-full blur-[100px] -z-10"></div>

            {/* Photo 1: teaching3.jpeg (Top Left) */}
            <div className="absolute top-0 left-0 w-[58%] h-[55%] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-[-3deg] z-20 group">
              <img
                src={images.img1}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={images.alt1}
              />
            </div>

            {/* Photo 2: students2.jpeg (Top Right) */}
            <div className="absolute top-12 right-0 w-[42%] h-[42%] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-[4deg] z-10 group">
              <img
                src={images.img2}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={images.alt2}
              />
            </div>

            {/* Photo 3: teaching2.jpeg (Bottom Left) */}
            <div className="absolute bottom-10 left-8 w-[48%] h-[35%] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-[2deg] z-30 group">
              <img
                src={images.img3}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={images.alt3}
              />
            </div>

            {/* Photo 4: teacher and student.jpeg (Bottom Right Focus) */}
            <div className="absolute bottom-0 right-4 w-[50%] h-[45%] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-[-5deg] z-40 group">
              <img
                src={images.img4}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={images.alt4}
              />
              {/* Special Floating Badge on the main image */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-primary p-2 rounded-xl shadow-lg">
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




