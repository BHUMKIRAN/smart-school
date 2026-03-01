'use client';

import { FormEvent, useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('तपाईंको सन्देश सफलतापूर्वक पठाइएको छ!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { title: 'ठेगाना', value: 'भदौरे, पोखरा', iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'सम्पर्क', value: '०१-५४२२७०४', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { title: 'इमेल', value: 'info@panchavati.edu.np', iconColor: 'text-rose-600', bgColor: 'bg-rose-50' },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-black tracking-widest uppercase rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white nepali-text leading-tight">
            हामीसँग <span className="text-blue-600">सम्पर्क</span> गर्नुहोस्
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Cards Grid */}
            <div className="grid gap-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-10 h-10 shrink-0 rounded-xl ${info.bgColor} dark:bg-slate-800 flex items-center justify-center ${info.iconColor}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-[9px] text-slate-400 uppercase tracking-widest">{info.title}</h4>
                    <p className="text-slate-800 dark:text-slate-200 font-bold text-xs nepali-text">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* White Minimal Map Card */}
            <div className="p-2 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.8rem] p-6 text-center border border-dashed border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white nepali-text">भदौरे, पोखरा-२३</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Google Maps Coming Soon</p>
                <button className="mt-4 px-5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-slate-50 transition-colors">
                  View Directions
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="h-full bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">नाम</label>
                    <input
                      type="text"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[13px] focus:ring-4 ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all nepali-text"
                      placeholder="पूरा नाम"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">इमेल</label>
                    <input
                      type="email"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[13px] focus:ring-4 ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all"
                      placeholder="email@address.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">विषय</label>
                  <input
                    type="text"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[13px] focus:ring-4 ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all nepali-text"
                    placeholder="सन्देशको मुख्य उद्देश्य"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">सन्देश</label>
                  <textarea
                    rows={4}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[13px] focus:ring-4 ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all nepali-text resize-none"
                    placeholder="आफ्नो जिज्ञासा यहाँ लेख्नुहोस्..."
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all duration-200 nepali-text text-sm"
                >
                  सन्देश पठाउनुहोस्
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}