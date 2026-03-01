'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Megaphone, Trash2, AlertTriangle, Send } from "lucide-react";

export default function EmergencyTab() {
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);

  // Fetch notices to show history and allow deletion
  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:8080/emergencyNotices");
      setNotices(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await axios.post("http://localhost:8080/emergencyNotices", data);
      (e.target as HTMLFormElement).reset();
      fetchNotices();
    } catch (error) {
      console.error(error);
    } finally { setLoading(false); }
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("Remove this alert from history?")) return;
    try {
      await axios.delete(`http://localhost:8080/emergencyNotices/${id}`);
      fetchNotices();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn px-4">
      
      {/* Subtle Info Header */}
      <div className="flex items-center gap-4 p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl">
        <div className="p-2 bg-rose-500 rounded-lg shadow-lg shadow-rose-500/20">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest leading-tight">
          Emergency Broadcast: Notifications will be sent instantly to all users.
        </p>
      </div>

      {/* Simplified Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Alert Headline</label>
          <input 
            name="title" required placeholder="e.g. Campus Maintenance Notice"
            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Message Details</label>
          <textarea 
            name="message" rows={3} required placeholder="Briefly describe the situation..."
            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-400 outline-none focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
          />
        </div>

        <button 
          disabled={loading}
          className="w-full py-4 bg-slate-900 dark:bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Dispatching..." : <><Send className="w-3.5 h-3.5" /> Broadcast Now</>}
        </button>
      </form>

      {/* Minimal History List */}
      <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent Dispatches</h4>
        {notices.map((notice) => (
          <div key={notice._id} className="group flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-slate-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <Megaphone className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{notice.title}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{new Date(notice.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button 
              onClick={() => deleteNotice(notice._id)}
              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}