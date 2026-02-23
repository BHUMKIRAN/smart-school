import { useEffect, useState } from "react";

export default function NoticesTab() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const [notices, setNotices] = useState([]);

  // Fetch notices
  const fetchNotices = async () => {
    try {
      const res = await fetch("http://localhost:8080/notices");
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      alert("Failed to fetch notices: " + error.message);
    }
  };

  // Create notice
  const createNotice = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create notice");

      setFormData({ title: "", message: "" });
      fetchNotices();
    } catch (error) {
      alert(error.message);
    }
  };

  // Delete notice
  const deleteNotice = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/notices/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete notice");

      setNotices((prev) =>
        prev.filter((notice) => notice._id !== id)
      );
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
        <div className="bg-white border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-black mb-4">
            Create New Notice
          </h3>

          <form className="space-y-4" onSubmit={createNotice}>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Notice Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter notice title"
                className="w-full px-4 py-3 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter notice message"
                className="w-full px-4 py-3 border rounded-lg text-black resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-black rounded-lg font-semibold"
            >
              Publish Notice
            </button>
          </form>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="bg-white border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-black mb-4">
          Recent Notices
        </h3>

        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="p-4 bg-gray-50 border rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-black">
                    {notice.title}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    Posted on{" "}
                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
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