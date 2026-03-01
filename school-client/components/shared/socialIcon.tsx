'use client';

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    color: 'bg-[#1877F2]',
    svg: <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0z"/>
  },
  {
    name: 'X (Twitter)',
    href: '#',
    color: 'bg-black',
    svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/>
  },
  {
    name: 'YouTube',
    href: '#',
    color: 'bg-[#FF0000]',
    svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-3.5">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className={`group relative w-11 h-11 ${social.color} rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/10`}
          aria-label={social.name}
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors"></div>
          
          <svg 
            className="w-5 h-5 fill-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
            viewBox="0 0 24 24"
          >
            {social.svg}
          </svg>
        </a>
      ))}
    </div>
  );
}