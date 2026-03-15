"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("तपाईंको सन्देश सफलतापूर्वक पठाइएको छ!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      title: "ठेगाना",
      value: "भदौरे, रौतामाई",
      icon: MapPin,
      bgColor: "bg-blue-50",
      link: "https://www.google.com/maps?q=26.982956809710352,86.69429960097426",
    },
    {
      title: "सम्पर्क",
      value: "+977 9842534440",
      icon: Phone,
      bgColor: "bg-emerald-50",
      link: "tel:+9779842534440",
    },
    {
      title: "इमेल",
      value: "info@panchavati.edu.np",
      icon: Mail,
      bgColor: "bg-rose-50",
      link: "mailto:info@panchavati.edu.np",
    },
  ];

  return (
    <section
      id="contact"
      className="py-14 px-6  dark:bg-slate-950 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
       

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white nepali-text leading-tight">
            हामीसँग <span className="text-blue-600">सम्पर्क</span> गर्नुहोस्
          </h2>

          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Cards */}
            <div className="grid gap-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                return (
                  <a
                    key={index}
                    href={info.link}
                    target={info.title === "ठेगाना" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-secondary dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${info.bgColor} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-slate-700 dark:text-white" />
                    </div>

                    <div>
                      <h4 className="font-black text-[9px] text-slate-400 uppercase tracking-widest">
                        {info.title}
                      </h4>

                      <p className="text-slate-800 dark:text-slate-200 font-bold text-xs nepali-text">
                        {info.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* GOOGLE MAP */}
            <div className="p-3 rounded-[2rem] bg-secondary dark:bg-slate-900 border border-slate-200 shadow-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=26.982956809710352,86.69429960097426&z=15&output=embed"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "20px" }}
                loading="lazy"
              ></iframe>

              <div className="text-center mt-4">
                <h4 className="text-sm font-black text-slate-900 dark:text-white nepali-text">
                  भदौरे, रौतामाई
                </h4>

                <button
                  className="mt-3 px-5 py-2 border rounded-xl text-[10px] font-black uppercase hover:bg-slate-50 transition"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps?q=26.982956809710352,86.69429960097426",
                      "_blank"
                    )
                  }
                >
                  View Directions
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="lg:col-span-7">
            <div className="h-auto bg-secondary dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="पूरा नाम"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800  dark:bg-slate-800/50"
                    required
                  />

                  <input
                    type="email"
                    placeholder="email@address.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800  dark:bg-slate-800/50"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="सन्देशको मुख्य उद्देश्य"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800  dark:bg-slate-800/50"
                  required
                />

                <textarea
                  rows={4}
                  placeholder="आफ्नो जिज्ञासा यहाँ लेख्नुहोस्..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-800  dark:bg-slate-800/50 resize-none"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all duration-200 nepali-text text-sm"
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
