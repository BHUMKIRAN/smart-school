import { Facebook, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: '#',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: '#',
    color: 'bg-blue-400 hover:bg-blue-500',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: '#',
    color: 'bg-red-600 hover:bg-red-700',
  },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-colors`}
          aria-label={social.name}
        >
          <social.icon className="w-5 h-5 text-white" />
        </a>
      ))}
    </div>
  );
}