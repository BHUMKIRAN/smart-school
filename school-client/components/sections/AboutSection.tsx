'use client';

import { getAbout } from "@/Backend/getAbout";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getAbout()
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const title = data?.fields?.title;
  const subtitle = data?.fields?.subtitle;
  const itemsCards = data?.fields?.aboutCards || [];

  const icons = [
    <svg key="icon1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    <svg key="icon2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    <svg key="icon3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg key="icon4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V7a2 2 0 012-2h12a2 2 0 012 2v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" /></svg>
  ];

  return (
    <section id="about" className="py-10 px-6 bg-[var(--background)] relative overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[var(--primary)] opacity-5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Section Header --- */}
        <div className="text-center mb-16 space-y-4 animate-fadeIn">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] nepali-text leading-tight">
            {title}
          </h2>
          <div className="accent-bar mx-auto shadow-sm"></div>
          <p className="text-[var(--muted-text)] max-w-2xl mx-auto text-lg leading-relaxed nepali-text">
            {subtitle}
          </p>
        </div>

        {/* --- Vision & Mission Grid --- */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <div className="card group p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[var(--primary)] opacity-20 group-hover:opacity-100 transition-all duration-500"></div>
            <h3 className="text-2xl font-black mb-6 text-[var(--foreground)] nepali-text flex items-center gap-4">
              <span className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl shadow-lg shadow-blue-500/20">हाम्रो दृष्टिकोण</span>
            </h3>
            <p className="text-[var(--muted-text)] leading-relaxed text-lg mb-6 nepali-text">
              ज्ञान, चरित्र र नवीनताको माध्यमबाट समाजमा सकारात्मक योगदान पुर्‍याउने जिम्मेवार नागरिकहरू उत्पादन गर्दै शैक्षिक उत्कृष्टताको केन्द्र बन्ने हाम्रो परिकल्पना हो।
            </p>
            <p className="text-[var(--primary)] font-medium leading-relaxed italic border-l-4 border-[var(--accent)] pl-6 py-3 bg-[var(--muted-bg)] rounded-r-2xl nepali-text">
              "शिक्षा संसार परिवर्तन गर्न प्रयोग गर्न सकिने सबैभन्दा शक्तिशाली हतियार हो।"
            </p>
          </div>

          {/* Mission Card */}
          <div className="card group p-8  relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[var(--accent)] opacity-20 group-hover:opacity-100 transition-all duration-500"></div>
            <h3 className="text-2xl font-black mb-6 text-[var(--foreground)] nepali-text flex items-center gap-4">
              <span className="px-5 py-2 bg-[var(--accent)] text-slate-900 rounded-xl shadow-lg shadow-yellow-500/20">हाम्रो लक्ष्य</span>
            </h3>
            <ul className="space-y-4">
              {[
                "सबै विद्यार्थीहरूको लागि सुलभ र गुणस्तरीय शिक्षा प्रदान गर्ने।",
                "आलोचनात्मक सोच र रचनात्मक समस्या समाधान गर्ने क्षमताको विकास गर्ने।",
                "बलियो चरित्र र नैतिक जग निर्माण गर्ने।",
                "सुरक्षित, समावेशी र प्रेरणादायी वातावरण सिर्जना गर्ने।"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group/item">
                  <div className="mt-1.5 w-2 h-2  bg-[var(--accent)] shrink-0" />
                  <span className="text-[var(--muted-text)] font-semibold nepali-text text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsCards.map((val: any, index: number) => (
            <div
              key={index}
              className="card group p-8 text-center  hover:border-[var(--primary)] transition-all duration-500"
            >
              <div className="icon-box mx-auto mb-8 !w-20 !h-20 !rounded-3xl bg-[var(--muted-bg)] text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500 transform group-hover:scale-110shadow-inner">
                {icons[index] || icons[0]}
              </div>
              <h4 className="text-xl font-black mb-4 text-[var(--foreground)] nepali-text group-hover:text-[var(--primary)] transition-colors">
                {val?.fields?.title}
              </h4>
              <p className="text-[var(--muted-text)] text-sm leading-relaxed nepali-text">
                {val?.fields.subtitle}
              </p>

              {/* Bottom Decorative Line using --accent */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-[var(--accent)] rounded-full group-hover:w-16 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}