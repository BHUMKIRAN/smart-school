'use client';

import { api } from "@/Backend/axiosClientInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, X, Clock, Loader2 } from "lucide-react";

const ApplicationsTab = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getApplication = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications`);
      setData(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch applications");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  const handleStatusChange = async (id: string, action: "approve" | "reject") => {
    try {
      const res = await api.put(`/applications/${id}/status`, { action });
      toast.success(res.data.message);
      getApplication();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
        <p className="text-[var(--dash-text-muted)] font-black text-sm uppercase tracking-widest">
          Retrieving Applications...
        </p>
      </div>
    );
  }

  return (
    <div className="dash-card overflow-hidden animate-fadeIn mx-2 md:mx-0 shadow-sm border-[var(--dash-border)]">
      {/* HEADER SECTION (Larger Titles) */}
      <div className="p-6 md:p-8 border-b border-[var(--dash-border)] bg-[var(--dash-surface)] flex justify-between items-center">
        <div>
          <h2 className="text-lg md:text-xl font-black text-[var(--dash-text)] uppercase tracking-tight">Student Applications</h2>
          <p className="text-xs md:text-sm text-[var(--dash-text-muted)] font-medium">Manage leave and registration requests</p>
        </div>
        <span className="px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-black rounded-full uppercase tracking-wider border border-[var(--primary)]/20">
          {data.length} Total
        </span>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full border-collapse min-w-full">
          <thead>
            <tr className="text-left border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)]">
              <th className="px-6 py-5 text-[var(--dash-text-muted)] font-black text-xs uppercase tracking-widest">Student</th>
              <th className="px-6 py-5 text-[var(--dash-text-muted)] font-black text-xs uppercase tracking-widest hidden md:table-cell">Type</th>
              <th className="px-6 py-5 text-[var(--dash-text-muted)] font-black text-xs uppercase tracking-widest hidden lg:table-cell">Date</th>
              <th className="px-6 py-5 text-[var(--dash-text-muted)] font-black text-xs uppercase tracking-widest">Priority</th>
              <th className="px-6 py-5 text-[var(--dash-text-muted)] font-black text-xs uppercase tracking-widest hidden md:table-cell">Status</th>
              <th className="px-6 py-5 text-[var(--dash-text-muted)] font-black text-xs uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {data.map((app, i) => (
              <tr key={i} className="hover:bg-[var(--dash-sidebar-hover)] transition-colors group">
                
                {/* STUDENT (Large font & Avatar) */}
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-black text-lg border-2 border-[var(--primary)]/20 shadow-sm">
                      {app.student?.name ? app.student.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base md:text-lg font-bold text-[var(--dash-text)] tracking-tight">
                        {app.student?.name || 'Unknown'}
                      </span>
                      <span className="text-[10px] md:hidden uppercase font-black text-[var(--dash-text-muted)] tracking-wider">
                        {app.type}
                      </span>
                    </div>
                  </div>
                </td>

                {/* TYPE */}
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className="text-sm md:text-base text-[var(--dash-text)] font-semibold uppercase tracking-tight">{app.type}</span>
                </td>

                {/* DATE */}
                <td className="px-6 py-5 hidden lg:table-cell">
                  <span className="text-sm text-[var(--dash-text-muted)] font-medium">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </td>

                {/* PRIORITY (Larger labels) */}
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-lg text-[10px] md:text-xs font-black uppercase border-2 shadow-sm ${app.priority === 'High'
                      ? 'bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/10'
                      : 'bg-[var(--dash-bg)] text-[var(--dash-text-muted)] border-[var(--dash-border)]'
                    }`}>
                    {app.priority || 'Normal'}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-5 hidden md:table-cell">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--warning)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--warning)]"></span>
                    </span>
                    <span className="text-xs font-black text-[var(--warning)] uppercase tracking-wider">{app.status}</span>
                  </div>
                </td>

                {/* ACTIONS (Larger Buttons) */}
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 md:gap-3">
                    <button 
                      className="p-2.5 md:px-5 md:py-2.5 rounded-xl text-white bg-[var(--success)] hover:bg-[var(--success)]/90 transition-all shadow-md flex items-center gap-2 active:scale-95"
                      onClick={() => handleStatusChange(app._id, "approve")}
                    >
                      <Check className="w-5 h-5" />
                      <span className="hidden md:inline text-xs font-black uppercase tracking-wider">Approve</span>
                    </button>
                    <button 
                      className="p-2.5 md:px-5 md:py-2.5 rounded-xl text-[var(--error)] border-2 border-[var(--error)]/20 hover:bg-[var(--error)] hover:text-white transition-all shadow-sm flex items-center gap-2 active:scale-95"
                      onClick={() => handleStatusChange(app._id, "reject")}
                    >
                      <X className="w-5 h-5" />
                      <span className="hidden md:inline text-xs font-black uppercase tracking-wider">Reject</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER (Larger text) */}
      <div className="px-6 py-5 bg-[var(--dash-surface-2)] border-t border-[var(--dash-border)] flex justify-between items-center">
        <p className="text-xs md:text-sm text-[var(--dash-text-muted)] font-black flex items-center gap-2 uppercase tracking-tight">
          <Clock className="w-4 h-4 text-[var(--primary)]" /> {data.length} Pending Requests
        </p>
        <button className="text-xs font-black text-[var(--primary)] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
          View Archive →
        </button>
      </div>
    </div>
  );
};

export default ApplicationsTab;