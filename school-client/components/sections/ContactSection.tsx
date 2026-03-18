"use client";

import axios from "axios";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { FormEvent, useState, ChangeEvent } from "react";
import Logo from "../shared/logo";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await axios.post("/api/sendmail", formData);
      if (res.status === 200) {
        setResponseMsg("सन्देश सफलतापूर्वक पठाइयो।");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMsg("सन्देश पठाउन असफल भयो।");
      }
    } catch (err: any) {
      setResponseMsg("सर्भरमा समस्या आएको छ।");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { title: "ठेगाना", value: "भदौरे, रौतामाई", icon: MapPin, link: "#" },
    { title: "सम्पर्क", value: "+977 9842534440", icon: Phone, link: "tel:+9779842534440" },
    { title: "इमेल", value: "kiran.khatri.787@gmail.com", icon: Mail, link: "mailto:kiran.khatri.787@gmail.com" },
  ];

  return (
    <section id="contact" className="py-16 px-6 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] nepali-text tracking-tight">
            हामीसँग सम्पर्क गर्नुहोस्
          </h2>
          <div className="accent-bar mx-auto mt-3"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* --- LEFT SIDE: Info & Map --- */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="card flex items-center gap-4 p-3 hover:translate-x-2 transition-transform border-[var(--card-border)]"
                >
                  <div className="icon-box shrink-0 w-10 h-10">
                    <info.icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] text-[var(--muted-text)] uppercase tracking-widest leading-none mb-1">
                      {info.title}
                    </h4>
                    <p className="text-[var(--foreground)] font-bold text-sm nepali-text leading-tight italic sm:not-italic">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Card */}
            <div className="card overflow-hidden border-[var(--card-border)] bg-[var(--card-bg)]">
              <iframe
                src="https://www.google.com/maps?q=26.982956809710352,86.69429960097426&z=15&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="p-3 text-center">
                <h4 className="text-xs font-bold text-[var(--foreground)] nepali-text">भदौरे, रौतामाई</h4>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Integrated Header Form --- */}
          <div className="lg:col-span-6">
            <div className="card overflow-hidden border-none shadow-2xl">
              {/* Top Integrated Bar */}
              <header className="bg-primary-dark py-1 flex flex-col items-center justify-center text-white">
                <div className=" p-1.5 rounded-lg mb-2  scale-90">
                  <Logo />
                </div>
                <p className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Send us a Message
                </p>
              </header>

              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted-text)] ml-1">नाम</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="पूरा नाम"
                        value={formData.name}
                        onChange={handleChange}
                        className="dash-input w-full text-sm py-2.5"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted-text)] ml-1">इमेल</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@address.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="dash-input w-full text-sm py-2.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted-text)] ml-1">विषय</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="सन्देशको मुख्य उद्देश्य"
                      value={formData.subject}
                      onChange={handleChange}
                      className="dash-input w-full text-sm py-2.5"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted-text)] ml-1">सन्देश</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="आफ्नो जिज्ञासा यहाँ लेख्नुहोस्..."
                      value={formData.message}
                      onChange={handleChange}
                      className="dash-input w-full text-sm py-2.5 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <span className="nepali-text">सन्देश पठाउनुहोस्</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {responseMsg && (
                    <div className={`p-3 rounded-lg text-center text-[11px] font-bold nepali-text animate-fadeIn ${
                      responseMsg.includes("सफलता")
                        ? "bg-[var(--success)]/10 text-[var(--success)]"
                        : "bg-[var(--error)]/10 text-[var(--error)]"
                    }`}>
                      {responseMsg}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}