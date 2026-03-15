"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface EmergencyNotice {
  _id: string
  title: string
  message: string
}

export default function EmergencyBanner() {
  const [notices, setNotices] = useState<EmergencyNotice[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:8080/emergencyNotices")
        setNotices(res.data)
        if (res.data.length > 0) {
          setIsVisible(true)
        }
      } catch (error) {
        console.error("Error fetching emergency notices:", error)
      }
    }
    fetchNotices()
  }, [])

  if (!isVisible || notices.length === 0) return null

  return (
    <div className="sticky top-0 z-[100] w-full border-b border-red-700 shadow-2xl">
      {/* Emergency Red Background with subtle pulse */}
      <div className="bg-red-600 text-white px-4 py-2 relative overflow-hidden">
        
        {/* Subtle background glow animation */}
        <div className="absolute inset-0 bg-red-500 animate-pulse opacity-20"></div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-4 overflow-hidden">
            {/* Warning Icon - High Contrast Yellow */}
            <div className="flex-shrink-0 bg-yellow-400 p-1 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              <svg
                className="w-4 h-4 text-red-700 animate-bounce"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Notice Text */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-hidden">
              <span className="text-[9px] font-black uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded-md border border-white/20 w-fit nepali-text">
                जरुरी सूचना
              </span>
              <div className="flex items-center gap-2">
                <p className="text-xs md:text-sm font-bold nepali-text truncate leading-tight">
                  {notices.map((n) => n.title).join(" • ")}
                </p>
                <span className="hidden md:inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span>
              </div>
            </div>
          </div>

          {/* Action/Close Button */}
          <div className="flex items-center gap-3">
             <button
              onClick={() => setIsVisible(false)}
              className="group flex-shrink-0 p-1.5 rounded-lg hover:bg-white/20 transition-all active:scale-90 border border-transparent hover:border-white/30"
              aria-label="Close alert"
            >
              <svg className="w-5 h-5 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
