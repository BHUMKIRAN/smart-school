'use client';

import React, { useState, useEffect } from "react";
import { Megaphone, Trash2, AlertTriangle, Send } from "lucide-react";
import { api } from "@/Backend/axiosClientInstance";
import { toast } from "sonner";

export default function EmergencyTab() {
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);

  const fetchNotices = async () => {
    try {
      const res = await api.get(`/emergencyNotices`);
      setNotices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await api.post(`/emergencyNotices`, data);
      (e.target as HTMLFormElement).reset();
      toast.success("Broadcast sent successfully");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to send broadcast");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("Remove this alert from history?")) return;
    try {
      await api.delete(`/emergencyNotices/${id}`);
      toast.success("Notice deleted");
      fetchNotices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn px-2 md:px-0">
      
      {/* Alert Header using semantic Warning/Error variables */}
      <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5">
        <div className="w-10 h-10 rounded-lg bg-[var(--error)] flex items-center justify-center shadow-lg shadow-red-500/20">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xs font-black text-[var(--error)] uppercase tracking-wider">Emergency Dispatch</h3>
          <p className="text-[11px] text-[var(--dash-text-muted)] font-medium">
            Notifications will be broadcasted instantly to all active student and staff devices.
          </p>
        </div>
      </div>

      {/* Main Form using dash-card and dash-input classes */}
      <div className="dash-card p-6 border-t-4 border-t-[var(--error)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[var(--dash-text-muted)] uppercase tracking-widest ml-1">
              Alert Headline
            </label>
            <input 
              name="title" 
              required 
              placeholder="e.g. Urgent: Campus Power Outage"
              className="dash-input w-full font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[var(--dash-text-muted)] uppercase tracking-widest ml-1">
              Message Details
            </label>
            <textarea 
              name="message" 
              rows={4} 
              required 
              placeholder="Provide clear instructions for the users..."
              className="dash-input w-full font-medium resize-none"
            />
          </div>

          <button 
            disabled={loading}
            className="attendance-btn w-full !rounded-xl py-4 flex items-center justify-center gap-2 group"
            style={{ background: 'var(--error)' }} // Override primary with error color for emergency
          >
            {loading ? (
              <span className="animate-pulse">Dispatching...</span>
            ) : (
              <>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                <span className="uppercase tracking-[0.15em] font-black text-xs">Execute Broadcast</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* History List using dash-table style logic */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
           <h4 className="text-[10px] font-black text-[var(--dash-text-muted)] uppercase tracking-widest">Recent Dispatches</h4>
           <span className="text-[10px] font-bold text-[var(--dash-text-muted)]">{notices.length} Logs</span>
        </div>
        
        <div className="space-y-2">
          {notices.map((notice) => (
            <div key={notice._id} className="group flex items-center justify-between p-4 bg-[var(--dash-surface)] border border-[var(--dash-border)] rounded-xl hover:border-[var(--primary)]/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--dash-surface-2)] rounded-lg flex items-center justify-center border border-[var(--dash-border)]">
                  <Megaphone className="w-4 h-4 text-[var(--dash-text-muted)]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--dash-text)] leading-tight">{notice.title}</p>
                  <p className="text-[10px] font-semibold text-[var(--dash-text-muted)] mt-1 uppercase">
                    {new Date(notice.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => deleteNotice(notice._id)}
                className="p-2.5 text-[var(--dash-text-muted)] hover:text-[var(--error)] hover:bg-[var(--error)]/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Delete Log"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {notices.length === 0 && (
            <div className="py-12 text-center border-2 border-dashed border-[var(--dash-border)] rounded-2xl">
              <p className="text-xs font-bold text-[var(--dash-text-muted)] uppercase tracking-widest">No previous alerts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}