'use client';

import { api } from "@/Backend/axiosClientInstance";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { 
  ClipboardList, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  History,
  Zap
} from "lucide-react";

interface ApplicationsTabProps {
  onSubmit?: () => void;
}

const ApplicationsTab = ({ onSubmit }: ApplicationsTabProps) => {
  const user = useSelector((state: any) => state.auth.user);

  const [data, setData] = useState({
    type: "",
    priority: "",
    reason: "",
    student: user?.id || "",
  });

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await api.get(`/applications`, { params: { student: user.id } });
      setApplications(res.data);
    } catch (err: any) {
      toast.error("Failed to fetch history");
    }
  }, [user?.id]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/applications`, data);
      toast.success("Application sent");
      setData({ type: "", priority: "", reason: "", student: user.id });
      fetchApplications();
      onSubmit?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error submitting");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Accepted": return "text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20";
      case "Rejected": return "text-[var(--error)] bg-[var(--error)]/10 border-[var(--error)]/20";
      default: return "text-[var(--dash-text-muted)] bg-[var(--dash-surface-2)] border-[var(--dash-border)]";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2 animate-fadeIn max-w-[1600px] mx-auto">
      
      {/* Compact Form Section - Narrower on XL screens */}
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="dash-card border-[var(--dash-border)] sticky top-4">
          <div className="bg-[var(--dash-surface-2)] px-4 py-3 border-b border-[var(--dash-border)] flex items-center gap-2 rounded-t-xl">
            <ClipboardList className="w-4 h-4 text-[var(--primary)]" />
            <h3 className="text-sm font-bold text-[var(--dash-text)]">New Request</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[var(--dash-text-muted)] tracking-widest ml-1">Type</label>
                <select name="type" value={data.type} onChange={handleChange} required className="dash-input w-full text-xs py-2">
                  <option value="">Select type</option>
                  <option value="Leave Certificate">Leave Certificate</option>
                  <option value="Transfer Certificate">Transfer Certificate</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[var(--dash-text-muted)] tracking-widest ml-1">Urgency</label>
                <select name="priority" value={data.priority} onChange={handleChange} required className="dash-input w-full text-xs py-2">
                  <option value="">Select priority</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High (Urgent)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[var(--dash-text-muted)] tracking-widest ml-1">Reason</label>
                <textarea
                  name="reason"
                  value={data.reason}
                  onChange={handleChange}
                  required
                  placeholder="Justification..."
                  className="dash-input w-full text-xs min-h-[100px] py-2 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 hero-gradient text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Sending..." : <><Send className="w-3.5 h-3.5" /> Submit Request</>}
            </button>
          </form>
        </div>
      </div>

      {/* History Section - Multi-column grid on XL screens */}
      <div className="lg:col-span-8 xl:col-span-9">
        <div className="dash-card flex flex-col h-full bg-transparent border-none shadow-none">
          <div className="px-1 py-3 mb-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[var(--primary)]" />
              <h4 className="text-base font-bold text-[var(--dash-text)]">Request History</h4>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-[var(--dash-text-muted)] uppercase bg-[var(--dash-surface)] border border-[var(--dash-border)] px-3 py-1 rounded-full">
                {applications.length} Submissions
              </span>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar pr-1">
            {applications.length === 0 ? (
              <div className="dash-card flex flex-col items-center justify-center py-24 opacity-40">
                <AlertCircle className="w-10 h-10 mb-2" />
                <p className="text-sm font-medium">No application records found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="dash-card group p-4 border border-[var(--dash-border)] hover:border-[var(--primary)]/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl border ${getStatusStyles(app.status)}`}>
                            {app.status === "Accepted" ? <CheckCircle2 className="w-4 h-4" /> : 
                             app.status === "Rejected" ? <XCircle className="w-4 h-4" /> : 
                             <Clock className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[var(--dash-text)]">{app.type}</span>
                              {app.priority === "High" && (
                                <span className="flex items-center gap-0.5 text-[9px] font-black text-[var(--error)] uppercase bg-[var(--error)]/10 px-1.5 py-0.5 rounded animate-pulse">
                                  <Zap className="w-2.5 h-2.5 fill-current" /> Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[var(--dash-text-muted)] font-medium mt-0.5">
                              Submitted: {new Date(app.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                            </p>
                          </div>
                        </div>
                        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border shadow-sm ${getStatusStyles(app.status)}`}>
                           {app.status}
                        </div>
                      </div>
                      
                      <div className="bg-[var(--dash-surface-2)] p-3 rounded-lg border border-[var(--dash-border)] mt-1">
                        <p className="text-[11px] text-[var(--dash-text-muted)] leading-relaxed italic line-clamp-2 group-hover:line-clamp-none transition-all">
                          "{app.reason}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTab;