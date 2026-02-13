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
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Report an Issue</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category
            </label>
            <select
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="">Select a category</option>
              <option value="technical">Technical Issue</option>
              <option value="academic">Academic Query</option>
              <option value="admin">Administrative</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Low', 'Medium', 'High'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handlePrioritySelect(priority)}
                  className={`priority-btn px-4 py-3 glass-card border rounded-lg font-medium transition-all ${
                    selectedPriority === priority
                      ? 'ring-2 ring-purple-500 border-purple-500/50 text-purple-400'
                      : 'border-purple-500/30 text-slate-300 hover:border-purple-500/50'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="Brief description of the issue"
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              rows={5}
              required
              placeholder="Please provide detailed information about your issue..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Submit Issue
          </button>
        </form>
      </div>

      <div className="glass-card rounded-xl p-6 border border-purple-500/20">
        <h4 className="font-semibold text-slate-200 mb-4">Your Recent Tickets</h4>
        <div className="space-y-3">
          {[
            { id: '#12345', subject: 'Portal Login Issue', status: 'Resolved', color: 'text-green-400' },
            { id: '#12344', subject: 'Assignment Upload Problem', status: 'In Progress', color: 'text-blue-400' },
            { id: '#12343', subject: 'Grade Query', status: 'Pending', color: 'text-amber-400' },
          ].map((ticket, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{ticket.subject}</p>
                <p className="text-xs text-slate-400">{ticket.id}</p>
              </div>
              <span className={`px-3 py-1 glass-card rounded-full text-xs font-medium ${ticket.color}`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
