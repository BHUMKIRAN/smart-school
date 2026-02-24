import { useEffect, useState } from "react";

export default function NoticesTab() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await fetch("http://localhost:8080/notices");
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      alert("Failed to fetch notices: " + error.message);
    }
  };

  const createNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create notice");
      setFormData({ title: "", message: "" });
      fetchNotices();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteNotice = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/notices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete notice");
      setNotices((prev) => prev.filter((notice) => notice._id !== id));
    } catch (error) {
      console.error("Failed to delete notice", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      {/* Create Notice Form */}
      <div className="mb-6">
        <div className="dash-card p-6">
          <h3 className="text-lg font-semibold dash-text mb-4">
            Create New Notice
          </h3>

          <form className="space-y-4" onSubmit={createNotice}>
            <div>
              <label className="block text-sm font-medium dash-text mb-2">
                Notice Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter notice title"
                className="dash-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dash-text mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter notice message"
                className="dash-input w-full resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-all"
            >
              Publish Notice
            </button>
          </form>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="dash-card p-6">
        <h3 className="text-lg font-semibold dash-text mb-4">
          Recent Notices
        </h3>

        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="p-4 dash-card-alt rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium dash-text">
                    {notice.title}
                  </h4>

                  <p className="text-xs dash-text-muted mt-1">
                    Posted on{" "}
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm dash-text-muted mt-1">
                    {notice.message}
                  </p>
                </div>

                <button
                  onClick={() => deleteNotice(notice._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs"
                >
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