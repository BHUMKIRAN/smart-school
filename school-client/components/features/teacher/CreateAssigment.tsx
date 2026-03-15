'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  FilePlus2, 
  X, 
  Send,
  Link as LinkIcon,
  Hash
} from 'lucide-react';
import { toast } from 'sonner';

export default function CreateAssignment() {
  const [isUploading, setIsUploading] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [grade, setGrade] = useState<number>(10);
  const [section, setSection] = useState('A');

  const handlePublish = async () => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUploading(false);
    toast.success('Assignment Published', {
      description: `Homework assigned to Class ${grade}-${section} successfully.`,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Assign Homework</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Specific Class</p>
        </div>
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
          <Hash className="w-5 h-5 text-indigo-500" />
        </div>
      </div>

      <div className="space-y-5">
        {/* Class & Section Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class (1-10)</label>
            <input 
              type="number"
              min="1"
              max="10"
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section</label>
            <select 
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assignment Title</label>
          <input 
            type="text" 
            placeholder="e.g. Physics Lab Report"
            className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instructions</label>
          <textarea 
            rows={2}
            placeholder="Task details..."
            className="w-full p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Row: Date & Points */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="date"
                className="w-full h-11 pl-9 pr-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Points</label>
            <input 
              type="number"
              placeholder="100"
              className="w-full h-11 px-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => setAttachment("worksheet.pdf")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
          >
            <FilePlus2 className="w-3.5 h-3.5" /> PDF
          </button>
          <button 
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
          >
            <LinkIcon className="w-3.5 h-3.5" /> URL
          </button>
        </div>

        {attachment && (
          <div className="flex items-center justify-between p-3 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
            <div className="flex items-center gap-2">
              <FilePlus2 className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300">{attachment}</span>
            </div>
            <button onClick={() => setAttachment(null)}><X className="w-3.5 h-3.5 text-indigo-400 hover:text-indigo-600" /></button>
          </div>
        )}

        {/* Main Action */}
        <button 
          onClick={handlePublish}
          disabled={isUploading}
          className="w-full h-12 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-50"
        >
          {isUploading ? "Assigning..." : <>Assign to Class {grade}-{section} <Send className="w-3.5 h-3.5 ml-1" /></>}
        </button>
      </div>
    </div>
  );
}