'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '@/lib/endpoints';
import { toast } from 'sonner';

interface SubmitModalProps {
  isOpen: boolean;
  assignmentId: string;
  subject: string;
  onClose: () => void;
  onSubmitted: () => void; // callback to refresh assignments list
 
}

export default function SubmitModal({ isOpen, assignmentId, subject, onClose, onSubmitted  }: SubmitModalProps) {
  const user = useSelector((state: any) => state.auth.user); // student info
  const studentId = user?._id || user?.id;

  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setIsConfirmed(false);
        setSelectedFile(null);
        setRemark('');
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files?.[0] || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) return;
    if (!selectedFile) {
      toast.error("Please upload at least one file");
      return;
    }

    const formData = new FormData();
    formData.append("assignment", assignmentId);
    formData.append("student", studentId);
    formData.append("remark", remark);
    formData.append("file", selectedFile);

    try {
      setIsSubmitting(true);
      await axios.post(`${API_BASE_URL}/submissions`, formData
       
      );
      toast.success("Assignment submitted successfully");
      onSubmitted(); // refresh assignments
      onClose(); // close modal
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fadeIn">
      <div className="dash-card max-w-lg w-full p-6 md:p-8 shadow-2xl animate-slide-up border-[var(--dash-border)]">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--foreground)] tracking-tight">Submit Homework</h3>
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mt-1">{subject}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors opacity-50 hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Area */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2 ml-1">Upload Files</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative group border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
                ${isDragging 
                  ? 'border-[var(--primary)] bg-[var(--primary)]/5 scale-[0.99]' 
                  : 'border-[var(--dash-border)] hover:border-[var(--primary)] hover:bg-[var(--secondary)]'
                }`}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-[var(--primary)] text-white' : 'bg-[var(--primary)]/10 text-[var(--primary)]'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                {selectedFile ? selectedFile.name : 'Click to upload or drag & drop'}
              </p>
              <p className="text-[10px] opacity-50 mt-1">PDF only (Max 10MB)</p>
              <input ref={fileInputRef} type="file" className="hidden" accept="application/pdf" onChange={handleFileSelect} />
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2 ml-1">Comments (Optional)</label>
            <textarea
              rows={3}
              placeholder="Add a note for your teacher..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="dash-input w-full resize-none text-sm"
            />
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="peer h-5 w-5 appearance-none rounded-md border-2 border-[var(--dash-border)] checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all"
              />
              <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity">
              I confirm this is my original work.
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity hover:bg-[var(--secondary)] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isConfirmed || !selectedFile || isSubmitting}
              className="flex-[2] py-3 hero-gradient text-white rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
