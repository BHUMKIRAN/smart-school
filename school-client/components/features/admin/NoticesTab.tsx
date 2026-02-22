import { useEffect, useState } from "react";

export default function NoticesTab() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const [notices, setNotices] = useState([]);

  // Fetch notices from server
  const fetchNotices = async () => {
    try {
      const res = await fetch("http://localhost:8080/notices");
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      alert("Failed to fetch notices: " + error);
    }
  };

  // Create a new notice
  const createNotice = async (e ) => {
    e.preventDefault(); // prevent page reload
    try {
      const response = await fetch("http://localhost:8080/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create notice");
      setFormData({ title: "", message: "" }); // reset form
      fetchNotices(); // refresh notices list
    } catch (error) {
      alert(error);
    }
  };

  // Load notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      {/* Create Notice Form */}
      <div className="mb-6">
        <div className="bg-white backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Create New Notice</h3>
          <form className="space-y-4" onSubmit={createNotice}>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Notice Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter notice title"
                className="w-full px-4 py-3 bg-white border border-amber-500/20 rounded-lg text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter notice message"
                className="w-full px-4 py-3 bg-white border border-amber-500/20 rounded-lg text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Publish Notice
            </button>
          </form>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Notices</h3>
        <div className="space-y-3">
          {notices.map((notice, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-amber-500/10 rounded-lg hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">{notice.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Posted on {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-slate-700 mt-1">{notice.message}</p>
                </div>
                <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}