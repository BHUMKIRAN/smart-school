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
        const res = await axios.get(
          "http://localhost:8080/emergencyNotices"
        )

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
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-sm font-medium">
            {notices.map((notice) => notice.title).join(" | ")}
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-800 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

      </div>
    </div>
  )
}