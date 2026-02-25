'use client';


import { useState } from 'react';

interface SupportTabProps {
  onSubmit: () => void;
}

export default function SupportTab({ onSubmit }: SupportTabProps) {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    (e.target as HTMLFormElement).reset();
    setSelectedPriority(null);
  };

  const handlePrioritySelect = (priority: string) => {
    setSelectedPriority(priority);
  };

  return (
    <div className="tab-content space-y-6">
      <div>
        <h3 className="text-lg font-semibold dash-text mb-4">Report an Issue</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dash-text mb-2">
              Category
            </label>
            <select
              required
              className="dash-input w-full"
            >
              <option value="">Select a category</option>
              <option value="technical">Technical Issue</option>
              <option value="academic">Academic Query</option>
              <option value="admin">Administrative</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Low', 'Medium', 'High'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handlePrioritySelect(priority)}
                  className={`priority-btn px-4 py-3 dash-card rounded-lg font-medium transition-all ${selectedPriority === priority
                    ? 'ring-2 ring-indigo-500 border-indigo-500/50 text-indigo-500'
                    : 'dash-text-muted hover:opacity-80'
                    }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="Brief description of the issue"
              className="dash-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dash-text mb-2">
              Description
            </label>
            <textarea
              rows={5}
              required
              placeholder="Please provide detailed information about your issue..."
              className="dash-input w-full resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Submit Issue
          </button>
        </form>
      </div>

      <div className="dash-card p-6">
        <h4 className="font-semibold dash-text mb-4">Your Recent Tickets</h4>
        <div className="space-y-3">
          {[
            { id: '#12345', subject: 'Portal Login Issue', status: 'Resolved', color: 'text-green-500' },
            { id: '#12344', subject: 'Assignment Upload Problem', status: 'In Progress', color: 'text-blue-500' },
            { id: '#12343', subject: 'Grade Query', status: 'Pending', color: 'text-amber-500' },
          ].map((ticket, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 dash-card-alt rounded-lg"
            >
              <div>
                <p className="text-sm font-medium dash-text">{ticket.subject}</p>
                <p className="text-xs dash-text-muted">{ticket.id}</p>
              </div>
              <span className={`px-3 py-1 dash-card-alt rounded-full text-xs font-medium ${ticket.color}`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
