'use client';

import { API_BASE_URL } from "@/lib/endpoints";
import { useEffect, useState } from "react";

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
      fetchNotices();
    } catch (error: any) {
      alert(error.message);
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
      setNotices((prev) => prev.filter((notice: any) => notice._id !== id));
    } catch (error) {
      console.error("Failed to delete notice", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-5 gap-8">
      
      {/* 1. Create Notice Form (Left Side - 2 Cols) */}
      <div className="lg:col-span-2">
        <div className="dash-card p-6 sticky top-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold dash-text">Create Notice</h3>
          </div>

          <form className="space-y-5" onSubmit={createNotice}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest dash-text-muted mb-2">
                Notice Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Weekly Assembly Update"
                className="dash-input w-full focus:border-warning/50 focus:ring-warning/10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest dash-text-muted mb-2">
                Detailed Message
              </label>
              <textarea
                rows={6}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type the notice content here..."
                className="dash-input w-full resize-none focus:border-warning/50 focus:ring-warning/10"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting ? 'bg-slate-400' : 'bg-warning hover:bg-warning-dark shadow-warning/20'
              }`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Notice'}
              {!isSubmitting && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Recent Notices Feed (Right Side - 3 Cols) */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold dash-text">Recent Publications</h3>
          <span className="text-xs font-medium px-2 py-1 bg-dash-surface-2 dash-text-muted rounded-md border dash-border">
            Total: {notices.length}
          </span>
        </div>

        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
          {notices.length === 0 ? (
            <div className="dash-card p-12 text-center border-dashed border-2">
              <p className="dash-text-muted italic">No notices published yet.</p>
            </div>
          ) : (
            notices.map((notice: any) => (
              <div
                key={notice._id}
                className="dash-card p-5 group hover:border-warning/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-warning opacity-40"></div>
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold dash-text text-lg group-hover:text-warning transition-colors">
                        {notice.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-warning mb-3">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(notice.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    <p className="text-sm dash-text-muted leading-relaxed whitespace-pre-line bg-dash-surface-2 p-3 rounded-lg border dash-border">
                      {notice.message}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNotice(notice._id)}
                    className="p-2 text-error bg-error/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-error hover:text-white"
                    title="Delete Notice"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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