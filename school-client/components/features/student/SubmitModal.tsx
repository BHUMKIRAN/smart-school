'use client';

import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { api } from '@/Backend/axiosClientInstance';
import { 
  X, 
  UploadCloud, 
  FileCheck, 
  Check, 
  Loader2,
  FileIcon
} from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  assignmentId: string;
  subject: string;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function SubmitModal({ isOpen, assignmentId, subject, onClose, onSubmitted }: SubmitModalProps) {
  const user = useSelector((state: any) => state.auth.user);
  const studentId = user?._id || user?.id;

  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsConfirmed(false);
      setSelectedFile(null);
      setRemark('');
    }
  }, [isOpen]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file?.type === 'application/pdf') setSelectedFile(file);
    else toast.error("Please upload a PDF");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Upload a file first");

    const formData = new FormData();
    formData.append("assignment", assignmentId);
    formData.append("student", studentId);
    formData.append("remark", remark);
    formData.append("file", selectedFile);

    try {
      setIsSubmitting(true);
      await api.post(`/submissions`, formData);
      toast.success("Submitted!");
      onSubmitted();
      onClose();
    } catch (error: any) {
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
      <div className="dash-card max-w-md w-full shadow-2xl animate-modalSlideIn overflow-hidden border-[var(--dash-border)] bg-[var(--dash-surface)]">
        
        {/* Compact Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[var(--primary)]/10 rounded-lg">
              <FileCheck className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--dash-text)] leading-none">Submit Work</h3>
              <p className="text-[10px] text-[var(--dash-text-muted)] font-semibold uppercase mt-0.5">{subject}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--dash-text-muted)] hover:text-[var(--error)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Compact Upload Box */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all
              ${isDragging ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--dash-border)] bg-[var(--dash-surface-2)] hover:border-[var(--primary)]'}
              ${selectedFile ? 'border-[var(--success)]/50 bg-[var(--success)]/5' : ''}`}
          >
            <input ref={fileInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            
            {selectedFile ? (
              <div className="flex items-center gap-3 text-left">
                <div className="bg-[var(--success)] p-2 rounded-lg text-white">
                  <FileIcon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-[var(--dash-text)] truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-[var(--success)] font-bold uppercase">Ready to turn in</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-2">
                <UploadCloud className="w-6 h-6 text-[var(--primary)] mb-1 opacity-70 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-[var(--dash-text)]">Click to upload PDF</p>
                <p className="text-[9px] text-[var(--dash-text-muted)] mt-0.5 uppercase tracking-tighter">Max size 10MB</p>
              </div>
            )}
          </div>

          {/* Compact Remarks Area */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--dash-text-muted)] tracking-widest ml-1">Notes</label>
            <textarea
              rows={2}
              placeholder="Optional message..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="dash-input w-full text-xs py-2 min-h-[60px]"
            />
          </div>

          {/* Simple Confirmation */}
          <label className="flex items-center gap-2.5 cursor-pointer py-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="peer h-4 w-4 appearance-none rounded border border-[var(--dash-border)] checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all cursor-pointer"
              />
              <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" strokeWidth={4} />
            </div>
            <span className="text-[11px] font-medium text-[var(--dash-text-muted)] select-none">
              I confirm this is my original work.
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-[var(--dash-text-muted)] hover:bg-[var(--muted-bg)] rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isConfirmed || !selectedFile || isSubmitting}
              className="flex-1 py-2.5 hero-gradient text-white rounded-lg text-xs font-bold shadow-md disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              {isSubmitting ? "Uploading..." : "Turn In Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}