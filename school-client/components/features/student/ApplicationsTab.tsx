'use client';

import { API_BASE_URL } from "@/lib/endpoints";
import axios from "axios";
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
  FileText 
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
      const res = await axios.get(`${API_BASE_URL}/applications?student=${user.id}`);
      setApplications(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch applications");
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
      const res = await axios.post(`${API_BASE_URL}/applications`, data);
      toast.success(res.data.message || "Application submitted successfully");
      setData({ type: "", priority: "", reason: "", student: user.id });
      fetchApplications();
      onSubmit?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-[color-mix(in_srgb,var(--primary)_12%,var(--secondary))] text-[var(--primary)] border-[color-mix(in_srgb,var(--primary)_30%,transparent)]";
      case "Rejected":
        return "bg-[color-mix(in_srgb,var(--accent)_16%,var(--secondary))] text-[var(--accent)] border-[color-mix(in_srgb,var(--accent)_35%,transparent)]";
      default:
        return "bg-[var(--secondary)] text-[var(--dash-text-muted)] border-[var(--dash-border)]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted": return <CheckCircle2 className="w-3 h-3" />;
      case "Rejected": return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 max-w-6xl mx-auto">
      
      {/* Form Section */}
      <div className="lg:col-span-5">
        <div className="bg-[var(--dash-surface)] rounded-xl shadow-sm border border-[var(--dash-border)] overflow-hidden">
          <div className="bg-[var(--secondary)] border-b border-[var(--dash-border)] p-4">
            <h3 className="text-lg font-semibold text-[var(--dash-text)] flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[var(--primary)]" />
              New Application
            </h3>
            <p className="text-xs text-[var(--dash-text-muted)] mt-1">Fill in the details to submit your request</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--dash-text-muted)]">Application Type</label>
                <select
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-[var(--secondary)] border border-[var(--dash-border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-sm text-[var(--dash-text)]"
                >
                  <option value="">Select type</option>
                  <option value="Leave Certificate">Leave Certificate</option>
                  <option value="Transfer Certificate">Transfer Certificate</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--dash-text-muted)]">Urgency Level</label>
                <select
                  name="priority"
                  value={data.priority}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-[var(--secondary)] border border-[var(--dash-border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-sm text-[var(--dash-text)]"
                >
                  <option value="">Select priority</option>
                  <option value="Normal">Normal - Standard Processing</option>
                  <option value="High">High - Urgent Requirement</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--dash-text-muted)]">Reason / Justification</label>
                <textarea
                  name="reason"
                  value={data.reason}
                  onChange={handleChange}
                  required
                  placeholder="Provide a detailed explanation..."
                  className="w-full px-3 py-2.5 bg-[var(--secondary)] border border-[var(--dash-border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all outline-none text-sm min-h-[120px] resize-none text-[var(--dash-text)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:bg-[var(--primary)]/70 text-white rounded-lg text-sm font-bold shadow-sm shadow-[var(--primary)]/20 transition-all active:scale-[0.98]"
            >
              {loading ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Application</>}
            </button>
          </form>
        </div>
      </div>

      {/* List Section */}
      <div className="lg:col-span-7">
        <div className="bg-[var(--dash-surface)] rounded-xl shadow-sm border border-[var(--dash-border)] flex flex-col h-full">
          <div className="p-4 border-b border-[var(--dash-border)] flex justify-between items-center">
            <h4 className="font-semibold text-[var(--dash-text)] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--dash-text-muted)]" />
              Application History
            </h4>
            <span className="text-[10px] bg-[var(--secondary)] px-2 py-1 rounded text-[var(--dash-text-muted)] font-bold uppercase">
              {applications.length} Total
            </span>
          </div>

          <div className="p-4 overflow-y-auto max-h-[550px] space-y-3 custom-scrollbar">
            {applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-[var(--dash-text-muted)]">
                <AlertCircle className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">No records found</p>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app._id}
                  className="group p-4 bg-[var(--dash-surface)] border border-[var(--dash-border)] hover:border-[var(--primary)]/40 hover:shadow-md hover:shadow-[var(--primary)]/10 transition-all rounded-xl"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-tight">
                        {app.type}
                      </span>
                      <h5 className="text-sm font-semibold text-[var(--dash-text)]">
                        {new Date(app.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </h5>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusStyles(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--dash-text-muted)] line-clamp-2 leading-relaxed italic">
                    "{app.reason}"
                  </p>
                  {app.priority === "High" && (
                    <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[var(--accent)] uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                      High Priority
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ApplicationsTab;
