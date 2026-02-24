"use client"

import axios from "axios"
import { FormEvent } from "react"

export default function EmergencyTab() {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries())

      const res = await axios.post(
        "http://localhost:8080/emergencyNotices",
        data
      )
      alert("Emergency notice submitted successfully")
      console.log("Success:", res.data)
    } catch (error) {
      console.error("Error submitting emergency notice:", error)
    }
  }

  return (
    <div className="dash-card border-red-500/20 p-6 shadow-sm">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div>
          <h3 className="text-xl font-bold dash-text">
            Emergency Alert System
          </h3>
          <p className="text-sm dash-text-muted">
            Send critical notifications to all users
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium dash-text mb-2">
            Alert Title
          </label>
          <input
            name="title"
            type="text"
            required
            placeholder="Enter emergency alert title"
            className="dash-input w-full focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium dash-text mb-2">
            Alert Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Enter critical information"
            className="dash-input w-full resize-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:shadow-md transition-all"
        >
          Send Emergency Alert
        </button>

      </form>
    </div>
  )
}