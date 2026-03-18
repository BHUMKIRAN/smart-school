'use client';

import { API_BASE_URL } from "@/lib/endpoints";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar, Trash2, Send, FileText, Info } from "lucide-react";

export default function NoticesTab() {
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [notices, setNotices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notices`);
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  const createNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create notice");
      setFormData({ title: "", message: "" });
      toast.success("Notice published successfully");
      fetchNotices();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteNotice = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete notice");
      toast.success("Notice removed");
      setNotices((prev) => prev.filter((notice: any) => notice._id !== id));
    } catch (error) {
      console.error("Failed to delete notice", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-5 gap-6">
      
      {/* 1. Create Notice Form */}
      <div className="lg:col-span-2">
        <div className="dash-card p-6 border-t-4 border-t-[var(--warning)] sticky top-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--warning)]/10 flex items-center justify-center text-[var(--warning)] border border-[var(--warning)]/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--dash-text)]">Create Notice</h3>
              <p className="text-[10px] text-[var(--dash-text-muted)] uppercase font-bold tracking-tight">Post to public bulletin</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={createNotice}>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--dash-text-muted)] ml-1">
                Notice Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Examination Schedule Update"
                className="dash-input w-full text-sm font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--dash-text-muted)] ml-1">
                Content Details
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write the full notice content here..."
                className="dash-input w-full text-sm resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-widest ${
                isSubmitting ? 'bg-[var(--dash-border)] cursor-not-allowed' : 'bg-[var(--warning)] hover:scale-[1.02] active:scale-95'
              }`}
              style={{ background: !isSubmitting ? 'var(--warning)' : '' }}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Publishing...' : 'Publish Notice'}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Recent Notices Feed */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black text-[var(--dash-text-muted)] uppercase tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4" /> Bulletin History
          </h3>
          <span className="text-[10px] font-bold px-2 py-1 bg-[var(--dash-surface-2)] text-[var(--dash-text-muted)] rounded border border-[var(--dash-border)]">
            {notices.length} ACTIVE
          </span>
        </div>

        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 custom-scrollbar">
          {notices.length === 0 ? (
            <div className="dash-card p-12 text-center border-dashed border-2 flex flex-col items-center opacity-50">
              <FileText className="w-10 h-10 mb-2 text-[var(--dash-text-muted)]" />
              <p className="text-sm font-bold text-[var(--dash-text-muted)]">No notices published yet.</p>
            </div>
          ) : (
            notices.map((notice: any) => (
              <div
                key={notice._id}
                className="dash-card p-5 group hover:border-[var(--warning)]/30 transition-all relative overflow-hidden"
              >
                {/* Visual marker */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--warning)]"></div>
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[var(--dash-text)] group-hover:text-[var(--warning)] transition-colors">
                        {notice.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--warning)] mb-3">
                      <Calendar className="w-3 h-3" />
                      {new Date(notice.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </div>

                    <div className="bg-[var(--dash-surface-2)] p-4 rounded-lg border border-[var(--dash-border)]">
                      <p className="text-sm text-[var(--dash-text)] leading-relaxed whitespace-pre-line">
                        {notice.message}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteNotice(notice._id)}
                    className="p-2 text-[var(--dash-text-muted)] hover:text-[var(--error)] hover:bg-[var(--error)]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}