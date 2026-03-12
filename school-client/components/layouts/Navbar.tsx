'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LogIn,
  UserPlus,
  GraduationCap,
  Users,
  ShieldCheck,
  Sun,
  Moon,
  ChevronDown,
  ClipboardCheck,
  Menu,
  X,
} from 'lucide-react'

import AttendanceModal from '@/modals/AttendanceModal'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '@/store/themeSlice'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false)
  const [isPortalOpen, setIsPortalOpen] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector((state: RootState) => state.theme.theme)

  const navLinks = [
    { name: 'गृहपृष्ठ', href: '#home' },
    { name: 'परिचय', href: '#about' },
    { name: 'प्रशासन', href: '#administration' },
    { name: 'ग्यालरी', href: '#gallery' },
    { name: 'सम्पर्क', href: '#contact' },
  ]

  const portals = [
    {
      name: 'शिक्षक पोर्टल',
      href: '/login?role=teacher',
      icon: <Users size={18} />,
      color: 'text-blue-600',
    },
    {
      name: 'विद्यार्थी पोर्टल',
      href: '/login?role=student',
      icon: <GraduationCap size={18} />,
      color: 'text-emerald-600',
    },
    {
      name: 'एडमिन पोर्टल',
      href: '/login?role=admin',
      icon: <ShieldCheck size={18} />,
      color: 'text-rose-600',
    },
  ]

  const handleThemeToggle = () => {
    dispatch(
      toggleTheme({
        theme: theme === 'light' ? 'dark' : 'light',
      })
    )

    const root = document.documentElement

    if (theme === 'light') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-3 transition-transform">
                <span className="text-white font-black text-xl nepali-text">
                  श्री
                </span>
              </div>

              <div className="flex flex-col">
                <h1 className="font-black text-[17px] leading-tight nepali-text text-slate-900 dark:text-white">
                  श्री पञ्चावती विद्यालय
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  Bhadure, Nepal
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors nepali-text"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">

                {/* Portal Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsPortalOpen(true)}
                  onMouseLeave={() => setIsPortalOpen(false)}
                >
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold transition-all hover:border-blue-500/50">
                    <LogIn size={18} className="text-blue-600" />
                    <span className="nepali-text">लगइन</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        isPortalOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isPortalOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3">
                      <div className="mb-2 px-2 py-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          User Login
                        </p>
                      </div>

                      <div className="space-y-1">
                        {portals.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                          >
                            <span
                              className={`${item.color} p-2 rounded-lg bg-current/10`}
                            >
                              {item.icon}
                            </span>

                            <span className="nepali-text font-bold text-sm group-hover:translate-x-1 transition-transform">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>

                 
                    </div>
                  )}
                </div>

                {/* Attendance */}
                <button
                  onClick={() => setIsAttendanceOpen(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-yellow-500/10"
                >
                  <ClipboardCheck size={18} />
                  <span className="nepali-text">उपस्थिति</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={handleThemeToggle}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {theme === 'light' ? (
                    <Moon size={20} />
                  ) : (
                    <Sun size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AttendanceModal
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
      />
    </>
  )
}