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

  return (
    <div className="animate-fadeIn max-w-3xl mx-auto">
      <div className="dash-card p-6 md:p-10">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Report an Issue</h3>
          <p className="text-sm opacity-60">Describe the problem you're experiencing and we'll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2 ml-1">
                Category
              </label>
              <select required className="dash-input w-full cursor-pointer">
                <option value="">Select category</option>
                <option value="technical">Technical</option>
                <option value="academic">Academic</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2 ml-1">
                Priority
              </label>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPriority(p)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all border ${
                      selectedPriority === p
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-md'
                        : 'bg-[var(--background)] border-[var(--dash-border)] text-[var(--dash-text-muted)] hover:border-[var(--primary)]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2 ml-1">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="What's the issue about?"
              className="dash-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2 ml-1">
              Description
            </label>
            <textarea
              rows={5}
              required
              placeholder="Provide details about the problem..."
              className="dash-input w-full resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full hero-gradient text-white py-4 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.01] transition-all active:scale-[0.98]"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}