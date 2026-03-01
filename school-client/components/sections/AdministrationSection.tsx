"use client";

import React from "react";

/** * SOCIAL MEDIA COMPONENT
 * Handles the icons and hover logic 
 */
const SocialLinksGroup = ({ facebook, twitter, linkedin }) => {
  const iconClass = "p-2 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm";
  
  return (
    <div className="flex items-center justify-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
      <a href={facebook || "#"} className={iconClass}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z"/></svg>
      </a>
      <a href={twitter || "#"} className={iconClass}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
      </a>
    </div>
  );
};

const LEADERSHIP = [
  { 
    name: "कृष्ण बहादुर खत्री", 
    position: "प्रधानाध्यापक", 
    subject: "गणित र विज्ञान", 
    image: "https://images.unsplash.com/photo-1610088441520-4352457e7095?q=80&w=400&h=500&fit=crop" 
  },
  { 
    name: "राजेन्द्र थापा", 
    position: "सहायक प्रधानाध्यापक", 
    subject: "अंग्रेजी (मुख्य)", 
    image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=400&h=500&fit=crop" 
  },
];

const TEACHERS = [
  { name: "अञ्जना कार्की", role: "शिक्षक", classes: "कक्षा ५ मुनि", subject: "सबै विषय", img: "https://images.unsplash.com/photo-1619643194511-2092f694602a?q=80&w=300&h=300&fit=crop" },
  { name: "सुशिला मंग्राती", role: "शिक्षक", classes: "कक्षा ५ मुनि", subject: "सबै विषय", img: "https://images.unsplash.com/photo-1621348128330-01186716a73c?q=80&w=300&h=300&fit=crop" },
  { name: "कमल रोका", role: "शिक्षक/सहायक", classes: "कक्षा ५ मुनि", subject: "सबै विषय", img: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=300&h=300&fit=crop" },
  { name: "दिक् बहादुर कार्की", role: "शिक्षक", classes: "मुख्य विद्यालय", subject: "गणित", img: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=300&h=300&fit=crop" },
];

export default function AdministrationSection() {
  return (
    <section id="administration" className="py-24 px-6 bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-24 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-black tracking-widest uppercase rounded-full">
            Faculty & Staff
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white nepali-text leading-tight">
            हाम्रो <span className="text-blue-600 relative">शिक्षण टोली
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4"/></svg>
            </span>
          </h2>
          <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* 1. Principal & VP Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {LEADERSHIP.map((leader, i) => (
            <div key={i} className="group relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all duration-500">
              <div className="relative w-48 h-56 flex-shrink-0">
                <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
                <img src={leader.image} alt={leader.name} className="relative z-10 w-full h-full object-cover rounded-[2.5rem] border-4 border-white dark:border-slate-800 shadow-xl" />
              </div>
              <div className="text-center md:text-left flex-1 space-y-4">
                <div>
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">{leader.position}</span>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white nepali-text mt-1">{leader.name}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold nepali-text">विषय: {leader.subject}</p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center md:justify-start">
                  <SocialLinksGroup facebook="#" twitter="#" linkedin="#" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Teachers Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-2xl relative">
          <h3 className="text-2xl font-black nepali-text mb-20 text-slate-800 dark:text-white flex items-center gap-3">
             <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
             शिक्षण कर्मचारीहरू
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {TEACHERS.map((teacher, i) => (
              <div key={i} className="group relative pt-12 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] p-8 text-center border border-transparent hover:border-blue-100 dark:hover:border-blue-900 transition-all hover:bg-white dark:hover:bg-slate-800">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl group-hover:rotate-6 transition-transform">
                  <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-8 space-y-3">
                  <h4 className="font-black text-slate-900 dark:text-white nepali-text text-xl">{teacher.name}</h4>
                  <span className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">{teacher.role}</span>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 nepali-text">
                    <p className="font-bold">विषय: {teacher.subject}</p>
                    <p className="italic">{teacher.classes}</p>
                  </div>
                  <div className="pt-4 flex justify-center">
                    <SocialLinksGroup facebook="#" twitter="#" />
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