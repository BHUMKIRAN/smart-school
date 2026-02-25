'use client';

interface ApplicationsTabProps {
  onSubmit: () => void;
}

export default function ApplicationsTab({ onSubmit }: ApplicationsTabProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="tab-content space-y-6">
      <div>
        <h3 className="text-lg font-semibold dash-text mb-4">Submit Leave Application</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dash-text mb-2">
                From Date
              </label>
              <input
                type="date"
                required
                className="dash-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dash-text mb-2">
                To Date
              </label>
              <input
                type="date"
                required
                className="dash-input w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">
              Reason
            </label>
            <select
              required
              className="dash-input w-full"
            >
              <option value="">Select a reason</option>
              <option value="medical">Medical</option>
              <option value="family">Family Emergency</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">
              Description
            </label>
            <textarea
              rows={4}
              required
              placeholder="Please provide details about your leave request..."
              className="dash-input w-full resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Submit Application
          </button>
        </form>
      </div>

      <div className="dash-card p-6">
        <h4 className="font-semibold dash-text mb-4">Recent Applications</h4>
        <div className="space-y-3">
          {[
            { date: 'Dec 15-16, 2024', reason: 'Medical', status: 'Approved', color: 'text-green-500' },
            { date: 'Nov 20-22, 2024', reason: 'Family Emergency', status: 'Approved', color: 'text-green-500' },
            { date: 'Oct 5-6, 2024', reason: 'Personal', status: 'Pending', color: 'text-amber-500' },
          ].map((app, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 dash-card-alt rounded-lg"
            >
              <div>
                <p className="text-sm font-medium dash-text">{app.date}</p>
                <p className="text-xs dash-text-muted">{app.reason}</p>
              </div>
              <span className={`px-3 py-1 dash-card-alt rounded-full text-xs font-medium ${app.color}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
