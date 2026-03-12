'use client';

export default function AboutSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'गुणस्तरीय शिक्षा',
      description: 'शैक्षिक उत्कृष्टता र आधुनिक शिक्षण विधिमा केन्द्रित व्यापक पाठ्यक्रम।'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'अनुभवी शिक्षक',
      description: 'उच्च योग्यता प्राप्त र विद्यार्थीहरूको भविष्यप्रति समर्पित शिक्षकहरूको समूह।'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'समग्र विकास',
      description: 'चरित्र निर्माण, नैतिकता र आवश्यक जीवन उपयोगी सीपहरूमा विशेष जोड।'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'आधुनिक सुविधा',
      description: 'सिकाइ अनुभवलाई थप प्रभावकारी बनाउन अत्याधुनिक भौतिक पूर्वाधारहरू।'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      {/* Background Decorative Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-yellow-400/5 dark:bg-yellow-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Section Header --- */}
        <div className="text-center mb-20 space-y-4">
        
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white nepali-text leading-tight">
            विद्यालयको <span className="text-blue-600 dark:text-blue-400">परिचय</span>
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full shadow-sm"></div>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed nepali-text">
            स्थापना कालदेखि नै हामी उज्ज्वल भविष्यका लागि गुणस्तरीय शिक्षा प्रदान गर्दै भोलिका नेतृत्वकर्ताहरू तयार गर्न प्रतिबद्ध छौं।
          </p>
        </div>

        {/* --- Vision & Mission Grid --- */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Vision Card */}
          <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 dark:bg-blue-500 opacity-20 group-hover:opacity-100 transition-all"></div>
             <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white nepali-text flex items-center gap-4">
               <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">हाम्रो दृष्टिकोण</span>
             </h3>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6 nepali-text">
               ज्ञान, चरित्र र नवीनताको माध्यमबाट समाजमा सकारात्मक योगदान पुर्‍याउने जिम्मेवार नागरिकहरू उत्पादन गर्दै शैक्षिक उत्कृष्टताको केन्द्र बन्ने हाम्रो परिकल्पना हो।
             </p>
             <p className="text-blue-600/80 dark:text-blue-400/80 leading-relaxed italic border-l-4 border-yellow-400 pl-6 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-r-xl nepali-text">
               "शिक्षा संसार परिवर्तन गर्न प्रयोग गर्न सकिने सबैभन्दा शक्तिशाली हतियार हो।"
             </p>
          </div>

          {/* Mission Card */}
          <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-yellow-200 dark:hover:border-yellow-900 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400 opacity-20 group-hover:opacity-100 transition-all"></div>
            <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white nepali-text flex items-center gap-4">
               <span className="p-3 bg-yellow-400 text-slate-900 rounded-2xl shadow-lg shadow-yellow-100 dark:shadow-none">हाम्रो लक्ष्य</span>
            </h3>
            <ul className="space-y-5">
              {[
                "सबै विद्यार्थीहरूको लागि सुलभ र गुणस्तरीय शिक्षा प्रदान गर्ने।",
                "आलोचनात्मक सोच र रचनात्मक समस्या समाधान गर्ने क्षमताको विकास गर्ने।",
                "बलियो चरित्र र नैतिक जग निर्माण गर्ने।",
                "सुरक्षित, समावेशी र प्रेरणादायी वातावरण सिर्जना गर्ने।"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group/item">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-yellow-400/20 dark:bg-yellow-400/10 flex items-center justify-center text-yellow-600 dark:text-yellow-400 group-hover/item:bg-yellow-400 group-hover/item:text-slate-900 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-bold nepali-text text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 text-center rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:-translate-y-3 hover:border-blue-600/30 dark:hover:border-blue-400/30 transition-all duration-500 shadow-xl hover:shadow-blue-100 dark:hover:shadow-none relative"
            >
              <div className="w-20 h-20 mx-auto mb-8 rounded-[1.8rem] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-all duration-500 transform group-hover:rotate-[10deg] shadow-inner">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white nepali-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-md leading-relaxed nepali-text">
                {feature.description}
              </p>
              
              {/* Bottom Decorative Line */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-yellow-400 rounded-full group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}