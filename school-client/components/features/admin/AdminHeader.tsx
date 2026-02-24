interface AdminHeaderProps {
  title: string;
  subtitle: string;
  onAdd: () => void;
}

export default function AdminHeader({
  title,
  subtitle,
  onAdd,
}: AdminHeaderProps) {
  return (
    <header className="dash-nav">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">

          {/* Left Side */}
          <div>
            <h2 className="text-2xl font-bold dash-text">
              {title}
            </h2>
            <p className="text-sm mt-1 dash-text-muted">
              {subtitle}
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dash-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search..."
                className="dash-input pl-10 pr-4"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}