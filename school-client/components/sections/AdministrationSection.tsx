"use client";

import { getTeachers } from "@/api/useTeache";
import React, { useEffect, useState, useMemo } from "react";

const toAssetUrl = (asset: any) => {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
};

const Avatar = ({ image, name, className }: any) => {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center bg-blue-600 text-white font-black text-3xl ${className}`}>
      {name?.charAt(0)}
    </div>
  );
};

const SocialLinksGroup = ({ facebook, twitter }: { facebook?: string; twitter?: string }) => {
  const iconClass = "p-2 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm";
  return (
    <div className="flex items-center justify-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
      <a href={facebook || "#"} className={iconClass}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z" /></svg>
      </a>
      <a href={twitter || "#"} className={iconClass}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
      </a>
    </div>
  );
};

export default function AdministrationSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getTeachers()
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  const { sectionTitle, leadership, teachers } = useMemo(() => {
    const entry = data?.items?.[0] || data?.[0];
    const title = entry?.fields?.title || "हाम्रो शिक्षण टोली";
    
    // Support both 'card' and 'cards' field names
    const rawCards = entry?.fields?.card || entry?.fields?.cards || [];

    const allMembers = rawCards.map((item: any) => ({
      name: item.fields?.name || item.fields?.title || "Staff Member",
      position: item.fields?.post || item.fields?.role || item.fields?.subtitle || "",
      subject: item.fields?.subject || "",
      education: item.fields?.education || "",
      image: toAssetUrl(item.fields?.image || item.fields?.photo),
      facebook: item.fields?.facebook || "#",
      twitter: item.fields?.twitter || "#",
    }));

    // --- LOGIC: Identify Leadership ---
    // Specifically pull out the Principal (प्रधानाध्यापक) and Vice Principal (सहायक प्रधानाध्यापक)
    const principal = allMembers.find((m: any) => 
      m.position?.includes("प्रधानाध्यापक") && !m.position?.includes("सहायक")
    );
    const vicePrincipal = allMembers.find((m: any) => 
      m.position?.includes("सहायक प्रधानाध्यापक")
    );

    // Create leadership array based on found items
    const leadershipList = [principal, vicePrincipal].filter(Boolean);

    // If API didn't have specific roles, fallback to taking first two
    const finalLeadership = leadershipList.length > 0 ? leadershipList : allMembers.slice(0, 2);

    // Teachers are everyone else who is NOT in the leadership list
    const finalTeachers = allMembers.filter(m => !finalLeadership.includes(m));

    return {
      sectionTitle: title,
      leadership: finalLeadership,
      teachers: finalTeachers,
    };
  }, [data]);

  if (!data) return null;

  return (
    <section id="administration" className="py-16 px-6 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white nepali-text leading-tight">
            हाम्रो <span className="text-blue-600 relative">{sectionTitle}
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>
          <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* 1. Leadership Section (Principal & Vice Principal) */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {leadership.map((leader, i) => (
            <div key={i} className="group relative bg-secondary dark:bg-slate-900 p-6 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 hover:shadow-2xl transition-all duration-500">
              <div className="relative w-40 h-48 flex-shrink-0">
                <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
                <Avatar
                  image={leader.image}
                  name={leader.name}
                  className="relative z-10 w-full h-full rounded-[2.5rem]"
                />
              </div>
              <div className="text-center md:text-left flex-1 space-y-4">
                <div>
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">{leader.position}</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white nepali-text mt-1">{leader.name}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold nepali-text">विषय: {leader.subject}</p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center md:justify-start">
                  <SocialLinksGroup facebook={leader.facebook} twitter={leader.twitter} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Teachers Grid */}
        <div className="bg-secondary dark:bg-slate-900 rounded-[4rem] p-6 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl relative">
          <h3 className="text-2xl font-black nepali-text mb-10 text-slate-800 dark:text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            शिक्षण कर्मचारीहरू
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {teachers.map((t, i) => (
              <div key={i} className="group relative pt-12 bg-slate-200 dark:bg-slate-800/50 rounded-[3rem] p-6 text-center border border-transparent hover:border-blue-100 dark:hover:border-blue-900 transition-all hover:bg-white dark:hover:bg-slate-800">
                <div className="absolute left-1/2 -top-9 -translate-x-1/2 w-28 h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl group-hover:rotate-6 transition-transform">
                  <Avatar image={t.image} name={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-8 space-y-3">
                  <h4 className="font-black text-slate-900 dark:text-white nepali-text text-xl">{t.name}</h4>
                  <span className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">{t.position}</span>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 nepali-text">
                    <p className="font-bold">विषय: {t.subject}</p>
                    <p className="italic">{t.education}</p>
                  </div>
                  <div className="pt-4 flex justify-center">
                    <SocialLinksGroup facebook={t.facebook} twitter={t.twitter} />
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