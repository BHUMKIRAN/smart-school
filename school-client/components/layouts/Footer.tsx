import Link from 'next/link';
import Logo from '../shared/logo';
import { link } from 'fs';

export default function Footer() {
  const currentYearNepali = "२०८२";

  const quickLinks = [
    { name: 'गृहपृष्ठ', href: '#home' },
    { name: 'परिचय', href: '#about' },
    { name: 'निर्देशक मण्डल', href: '#board' },
    { name: 'प्रशासन', href: '#administration' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      color: 'bg-[#1877F2]',
      path: "M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z",
      link: 'https://www.facebook.com/krishna.khatri.7967'
    },
    {
      name: 'Twitter',
      color: 'bg-[#000000]',
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"
    },
    {
      name: 'YouTube',
      color: 'bg-[#FF0000]',
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    }
  ];

  return (
    <footer className="footer bg-[var(--footer-bg)] text-[var(--footer-text)] border-t-[var(--accent)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* School Info */}
          <div className="space-y-6">

            <Logo />

            <p className="text-sm leading-relaxed opacity-80 font-medium nepali-text">
              गुणस्तरीय शिक्षा, हाम्रो प्रतिबद्धता। हामी विद्यार्थीहरूको उज्ज्वल भविष्यका लागि समर्पित छौं।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-xs mb-6 uppercase tracking-[0.2em] text-[var(--accent)] nepali-text">
              द्रुत लिङ्कहरू
            </h4>
            <div className="space-y-4">
              {quickLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-accent hover:translate-x-1 flex items-center gap-2 transition-all duration-300 nepali-text group"
                  >

                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-black text-xs mb-6 uppercase tracking-[0.2em] text-[var(--accent)] nepali-text">
              सम्पर्क विवरण
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4 opacity-80">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="nepali-text leading-tight">भदौरे, उदयपुर, नेपाल</span>
              </li>
              <li className="flex items-center gap-4 opacity-80">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="font-bold tracking-wider">+977 9842534440</span>
              </li>
              <li className="flex items-center gap-4 opacity-80">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="font-medium">kiran.khatri.787@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social & Office Hours */}
          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--accent)] nepali-text">
              सामाजिक सञ्जाल
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className={`w-10 h-10 ${social.color} rounded-xl flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all shadow-lg shadow-black/30`}
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            <div className="p-4 bg-white/5 border border-white/10 ">
              <p className="text-[10px] text-[var(--accent)] uppercase font-black tracking-widest mb-1">Office Hours</p>
              <p className="text-xs font-bold opacity-90">Sun - Fri: 10:00 AM - 4:00 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="nepali-text text-xs opacity-60 text-center md:text-left">
            © {currentYearNepali} श्री पञ्चावती आधारभूत विद्यालय। सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-black tracking-widest opacity-60">
            <Link href="/privacy" className="hover:text-[var(--accent)] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--accent)] transition">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}