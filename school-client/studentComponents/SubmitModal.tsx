'use client';

import { useState, useRef, useEffect } from 'react';

interface SubmitModalProps {
  isOpen: boolean;
  subject: string;
  onClose: () => void;
  onSubmit: () => void;
}

export default function SubmitModal({ isOpen, subject, onClose, onSubmit }: SubmitModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsConfirmed(false);
      setSelectedFiles([]);
    }
  }, [isOpen]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isConfirmed) {
      onSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 max-w-2xl w-full border border-purple-500/30 animate-slide-up">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Submit Homework</h3>
            <p className="text-sm text-slate-400">{subject}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-500/10 rounded-lg transition-all"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Your Work</label>
            <div
              className={`file-upload-area rounded-lg p-8 text-center cursor-pointer ${
                isDragging ? 'dragover' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg className="w-16 h-16 mx-auto text-purple-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-slate-300 mb-2">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : 'Drop your files here or click to browse'}
              </p>
              <p className="text-xs text-slate-500">PDF, DOC, DOCX, ZIP (max 25MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.zip"
                multiple
                onChange={handleFileSelect}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add any notes or comments about your submission..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="confirmSubmit"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-4 h-4 rounded border-purple-500/30 bg-slate-800/50 text-purple-500 focus:ring-purple-500/50"
            />
            <label htmlFor="confirmSubmit" className="text-sm text-slate-300">
              I confirm this is my original work
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 glass-card border border-purple-500/30 text-slate-300 rounded-lg font-medium hover:bg-purple-500/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isConfirmed}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Submit Homework
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
