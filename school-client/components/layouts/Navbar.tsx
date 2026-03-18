'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
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
import type { AppDispatch, RootState } from '@/store/store'
import Logo from '../shared/logo'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false)
  const [isPortalOpen, setIsPortalOpen] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector((state: RootState) => state.theme.theme)

  // Synchronize HTML class with theme state
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

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
      color: 'text-blue-500',
    },
    {
      name: 'विद्यार्थी पोर्टल',
      href: '/login?role=student',
      icon: <GraduationCap size={18} />,
      color: 'text-emerald-500',
    },
    {
      name: 'एडमिन पोर्टल',
      href: '/login?role=admin',
      icon: <ShieldCheck size={18} />,
      color: 'text-rose-500',
    },
  ]

  const handleThemeToggle = () => {
    dispatch(toggleTheme({ theme: theme === 'light' ? 'dark' : 'light' }))
  }

  return (
    <>
      <nav className="navbar border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-semibold hover:text-slate-300 transition-opacity nepali-text text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Portal Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsPortalOpen(!isPortalOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <span className="nepali-text text-xs font-bold">लगइन</span>
                    <ChevronDown size={14} className={`transition-transform ${isPortalOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isPortalOpen && (
                    <div className="absolute right-0 mt-3 w-60 card p-2 z-[110] animate-fadeIn">
                      <p className="text-[10px] font-black uppercase tracking-widest px-3 py-2 opacity-50">
                        Select Portal
                      </p>
                      {portals.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--muted-bg)] transition-colors group"
                        >
                          <span className={`${item.color} p-2 rounded-lg bg-current/10`}>
                            {item.icon}
                          </span>
                          <span className="nepali-text font-bold text-xs !text-[var(--foreground)] group-hover:translate-x-1 transition-transform">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Attendance Button - Using your .attendance-btn class */}
                <button
                  onClick={() => setIsAttendanceOpen(true)}
                  className="attendance-btn flex items-center gap-2"
                >
                  <ClipboardCheck size={18} />
                  <span className="nepali-text">उपस्थिति</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={handleThemeToggle}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[var(--accent)] hover:text-slate-900 transition-all"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 lg:hidden animate-fadeIn" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed top-0 right-0 h-full w-72 bg-[var(--background)] p-6 shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full bg-[var(--muted-bg)]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl font-bold hover:bg-[var(--muted-bg)] nepali-text !text-[var(--foreground)]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-[1px] bg-[var(--card-border)] my-6" />

            <div className="space-y-2">
              <p className="text-xs font-black uppercase opacity-40 px-4 mb-2">Portals</p>
              {portals.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--muted-bg)]"
                >
                  <span className={item.color}>{item.icon}</span>
                  <span className="nepali-text font-bold !text-[var(--foreground)]">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-3">
               <button
                  onClick={() => setIsAttendanceOpen(true)}
                  className="attendance-btn w-full flex justify-center items-center gap-2 py-4"
                >
                  <ClipboardCheck size={20} />
                  <span className="nepali-text text-base">उपस्थिति</span>
                </button>
                <button
                  onClick={handleThemeToggle}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-[var(--muted-bg)] font-bold"
                >
                  {theme === 'light' ? <><Moon size={18} /> Dark Mode</> : <><Sun size={18} /> Light Mode</>}
                </button>
            </div>
          </div>
        </div>
      )}

      <AttendanceModal isOpen={isAttendanceOpen} onClose={() => setIsAttendanceOpen(false)} />
    </>
  )
}