'use client';

import { api } from "@/Backend/axiosClientInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ApplicationsTab = () => {
  const [data, setData] = useState<any[]>([]);

  // Fetch applications from backend
  const getApplication = async () => {
    try {
      const res = await api.get(`/applications`);
      setData(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch applications");
      console.error(error);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  // Update application status
  const handleStatusChange = async (id: string, action: "approve" | "reject") => {
    try {
      const res = await api.put(`/applications/${id}/status`, { action });
      toast.success(res.data.message);
      // Refresh the applications list after update
      getApplication();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="dash-card overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full dash-table border-collapse">
          <thead>
            <tr className="text-left border-b dash-border bg-dash-surface-2">
              <th className="px-6 py-4 dash-text-muted font-bold text-xs uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 dash-text-muted font-bold text-xs uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 dash-text-muted font-bold text-xs uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 dash-text-muted font-bold text-xs uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 dash-text-muted font-bold text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 dash-text-muted font-bold text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dash-border">
            {data.map((app, i) => (
              <tr key={i} className="hover:bg-dash-surface-2/50 transition-colors group">
                {/* Student Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 group-hover:scale-105 transition-transform">
                      {app.student?.name ? app.student.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span className="text-sm font-semibold dash-text">{app.student?.name || 'Unknown'}</span>
                  </div>
                </td>

                {/* Application Type */}
                <td className="px-6 py-4">
                  <span className="text-sm dash-text font-medium">{app.type}</span>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <span className="text-sm dash-text-muted">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </td>

                {/* Priority Badge */}
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight ${app.priority === 'High'
                      ? 'bg-error/10 text-error border border-error/20'
                      : 'bg-dash-surface-2 dash-text-muted border dash-border'
                    }`}>
                    {app.priority || 'Normal'}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                    <span className="text-sm font-medium text-warning">{app.status}</span>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-success hover:bg-success/90 transition-all shadow-sm"
                      onClick={() => handleStatusChange(app._id, "approve")}>
                      Approve
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-error border border-error/20 hover:bg-error hover:text-white transition-all shadow-sm"
                      onClick={() => handleStatusChange(app._id, "reject")}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-6 py-4 bg-dash-surface-2 border-t dash-border flex justify-between items-center">
        <p className="text-xs dash-text-muted italic">Showing {data.length} pending requests</p>
        <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
          View Archived Applications →
        </button>
      </div>
    </div>
  );
};

export default ApplicationsTab;
