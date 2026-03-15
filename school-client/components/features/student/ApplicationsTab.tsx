'use client';

import { API_BASE_URL } from "@/lib/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

interface ApplicationsTabProps {
  onSubmit: () => void;
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

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Submit application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/applications`, data);
      toast.success(res.data.message);
      setData({ type: "", priority: "", reason: "", student: user.id }); // reset form
      fetchApplications(); // refresh recent applications
      onSubmit?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Fetch applications for this student
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/applications?student=${user.id}`);
      setApplications(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch applications");
    }
  };

  useEffect(() => {
    if (user?.id) fetchApplications();
  }, [user?.id]);

  return (
    <div className="tab-content space-y-6">
      {/* Submit Form */}
      <div>
        <h3 className="text-lg font-semibold dash-text mb-4">Submit Leave Application</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dash-text mb-2">Type</label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              required
              className="dash-input w-full"
            >
              <option value="">Select type</option>
              <option value="Leave Certificate">Leave Certificate</option>
              <option value="Transfer Certificate">Transfer Certificate</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">Priority</label>
            <select
              name="priority"
              value={data.priority}
              onChange={handleChange}
              required
              className="dash-input w-full"
            >
              <option value="">Select priority</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">Reason</label>
            <textarea
              name="reason"
              value={data.reason}
              onChange={handleChange}
              required
              placeholder="Enter your reason for the application..."
              className="dash-input w-full resize-none"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Submit Application
          </button>
        </form>
      </div>

      {/* Recent Applications */}
      <div className="dash-card p-6">
        <h4 className="font-semibold dash-text mb-4">Recent Applications</h4>
        <div className="space-y-3">
          {applications.length === 0 && (
            <p className="text-sm dash-text-muted">No applications submitted yet.</p>
          )}
          {applications.map((app) => (
            <div
              key={app._id}
              className="flex items-center justify-between p-3 dash-card-alt rounded-lg"
            >
              <div>
                <p className="text-sm font-medium dash-text">
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs dash-text-muted">{app.reason}</p>
              </div>
              <span
                className={`px-3 py-1 dash-card-alt rounded-full text-xs font-medium ${
                  app.status === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : app.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTab;