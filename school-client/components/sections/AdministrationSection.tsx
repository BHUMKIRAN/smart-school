"use client";

import { getTeachers } from "@/Backend/getTeacher";
import { useEffect, useState } from "react";

// Avatar component with theme-aware fallback
const Avatar = ({ image, name, className }: any) => {
  if (image) {
    const url = image.startsWith("//") ? `https:${image}` : image;
    return (
      <img
        src={url}
        alt={name}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center bg-[var(--primary)] text-white font-black text-3xl ${className}`}>
      {name?.charAt(0)}
    </div>
  );
};

// Social links styled with theme variables
const SocialLinksGroup = ({ facebook, twitter }: { facebook?: string; twitter?: string }) => {
  const iconClass = "p-2 bg-[var(--muted-bg)] text-[var(--primary)] rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm border border-[var(--card-border)]";
  
  return (
    <div className="flex items-center justify-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
      <a href={facebook || "#"} className={iconClass}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z" />
        </svg>
      </a>
      <a href={twitter || "#"} className={iconClass}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </a>
    </div>
  );
};

export default function AdministrationSection() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getTeachers()
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  const sectionTitle = data[0]?.fields.title || "हाम्रो प्रशासन";

  const leadership = (data[0]?.fields.card || []).filter((t: any) =>
    ["प्रधानाध्यापक", "उपप्रधानाध्यापक"].includes(t.fields.post)
  );

  const teacherList = (data[0]?.fields.card || []).filter(
    (t: any) => !["प्रधानाध्यापक", "उपप्रधानाध्यापक"].includes(t.fields.post)
  );

  return (
    <section className="py-10 px-6 bg-[var(--background)] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fadeIn">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] nepali-text leading-tight">
            <span className="relative">
              {sectionTitle}
              <svg className="absolute -bottom-3 left-0 w-full h-3 text-[var(--accent)] opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="6" />
              </svg>
            </span>
          </h2>
          <div className="accent-bar mx-auto mt-8"></div>
        </div>

        {/* Leadership Section - Two large cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {leadership.map((leader: any, i: number) => (
            <div key={i} className="card group p-8  flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all duration-500 border-l-8 border-l-[var(--primary)]">
              <div className="relative w-44 h-52 flex-shrink-0">
                <div className="absolute inset-0  rounded-[2.5rem] rotate-6 opacity-10 group-hover:rotate-0 transition-transform duration-500"></div>
                <Avatar 
                  image={leader.fields.image?.fields?.file?.url} 
                  name={leader.fields.name} 
                  className="relative z-10 w-full h-full rounded-[2.5rem]  border-4 border-[var(--card-bg)]" 
                />
              </div>
              <div className="text-center md:text-left flex-1 space-y-4">
                <div>
                  <span className="px-3 py-1 bg-[var(--muted-bg)] text-[var(--primary)] text-xs font-black rounded-full uppercase tracking-tighter border border-[var(--card-border)]">
                    {leader.fields.post}
                  </span>
                  <h3 className="text-3xl font-black text-[var(--foreground)] nepali-text mt-3">
                    {leader.fields.name}
                  </h3>
                </div>
                <div className="space-y-1">
                  <p className="text-[var(--primary)] font-bold nepali-text">विषय: {leader.fields.subject}</p>
                  <p className="text-[var(--muted-text)] text-sm italic">{leader.fields.education}</p>
                </div>
                <div className="pt-4 border-t border-[var(--card-border)] flex justify-center md:justify-start">
                  <SocialLinksGroup facebook={leader.fields.facebook} twitter={leader.fields.twitter} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="  md:p-14  relative overflow-hidden border-none">
          <div className="absolute top-0 right-0 w-64 h-50 bg-[var(--primary)] opacity-[0.03] blur-[100px]"></div>
          
          <h3 className="text-2xl font-black nepali-text mb-16 text-[var(--foreground)] flex items-center gap-3">
            <span className="w-2 h-8 bg-[var(--accent)] rounded-full"></span> शिक्षण कर्मचारीहरू
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-10 ">
            {teacherList.map((t: any, i: number) => (
              <div key={i} className="card group relative pt-16 pb-1 px-6 text-center hover:-translate-y-2 transition-all duration-500 ">
                {/* Floating Avatar Box */}
                <div className="absolute  left-1/2 top-1 -translate-x-1/2 w-24 h-24  group-hover:scale-110 overflow-hidden border-2 rounded-2xl shadow-xl transition-all duration-500 z-20">
                  <Avatar image={t.fields.image?.fields?.file?.url} name={t.fields.name} className="w-full h-full" />
                </div>
                
                <div className="space-y-3 mt-10">
                  <h4 className="font-black text-[var(--foreground)] nepali-text text-xl group-hover:text-[var(--primary)] transition-colors">{t.fields.name}</h4>
                  <span className="inline-block px-2 py-0.5 bg-[var(--muted-bg)] text-[var(--primary)] text-[10px] font-black rounded-md border border-[var(--card-border)] uppercase tracking-widest">{t.fields.post}</span>
                  
                  <div className="pt-4 border-t border-[var(--card-border)] text-xs text-[var(--muted-text)] nepali-text">
                    <p className="font-bold text-[var(--foreground)]">विषय: {t.fields.subject}</p>
                    <p className="italic mt-1 opacity-80">{t.fields.education}</p>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <SocialLinksGroup facebook={t.fields.facebook} twitter={t.fields.twitter} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}