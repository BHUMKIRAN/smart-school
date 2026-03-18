'use client';

import { useEffect, useMemo, useState } from "react";
import { getHero } from "@/Backend/getHero";

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

  const title = hero?.title;
  const subtitle = hero?.subtitle;

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center overflow-hidden pt-10 pb-10 bg-[var(--background)]"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[var(--primary)] opacity-[0.03] blur-[120px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Left Column: Typography & Action --- */}
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                <span className="relative inline-block nepali-text text-[var(--foreground)]">
                  {title}
                  {/* Scribble Underline using --accent */}
                  <svg
                    className="absolute -bottom-3 left-0 w-full h-4 text-[var(--accent)] opacity-70"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0, 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--muted-text)] leading-relaxed max-w-lg nepali-text">
                {subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#about" className="btn btn-primary flex items-center hover:text-slate-300 justify-center gap-2 nepali-text shadow-xl">
                थप जान्नुहोस्
              </a>
              <a
                href="#contact"
                className="px-7 py-2.5 rounded-lg font-semibold border-2 border-[var(--card-border)] text-[var(--foreground)] hover:border-[var(--primary)] transition-all text-center nepali-text bg-[var(--card-bg)]"
              >
                सम्पर्क गर्नुहोस्
              </a>
            </div>

            {/* Stats Section using .stat-card logic */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--card-border)]">
              <div className="text-center">
                <p className="text-3xl font-black text-[var(--primary)]">480+</p>
                <p className="text-xs font-bold text-[var(--muted-text)] uppercase tracking-tighter nepali-text">विद्यार्थी</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-[var(--primary)]">28</p>
                <p className="text-xs font-bold text-[var(--muted-text)] uppercase tracking-tighter nepali-text">शिक्षक</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-[var(--primary)]">15+</p>
                <p className="text-xs font-bold text-[var(--muted-text)] uppercase tracking-tighter nepali-text">वर्ष अनुभव</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Photo Stack --- */}
          <div className="relative h-[450px] md:h-[550px] w-full">
            
            {/* Photo 1: Top Left */}
            <div className="absolute top-0 left-0 w-[58%] h-[55%] rounded-[2rem] overflow-hidden border-8 border-[var(--card-bg)] shadow-2xl -rotate-3 z-20 group transition-transform hover:rotate-0 duration-500">
              <img
                src={images.img1}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={images.alt1}
              />
            </div>

            {/* Photo 2: Top Right */}
            <div className="absolute top-12 right-0 w-[42%] h-[42%] rounded-[1.5rem] overflow-hidden border-4 border-[var(--card-bg)] shadow-xl rotate-6 z-10 group transition-transform hover:rotate-0 duration-500">
              <img
                src={images.img2}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={images.alt2}
              />
            </div>

            {/* Photo 3: Bottom Left */}
            <div className="absolute bottom-12 left-8 w-[48%] h-[35%] rounded-[1.5rem] overflow-hidden border-4 border-[var(--card-bg)] shadow-xl rotate-2 z-30 group transition-transform hover:-rotate-2 duration-500">
              <img
                src={images.img3}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={images.alt3}
              />
            </div>

            {/* Photo 4: Bottom Right Focus */}
            <div className="absolute bottom-0 right-4 w-[50%] h-[45%] rounded-[2rem] overflow-hidden border-8 border-[var(--card-bg)] shadow-2xl -rotate-3 z-40 group transition-transform hover:rotate-0 duration-500">
              <img
                src={images.img4}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={images.alt4}
              />
              {/* Star Badge using --accent */}
           
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}