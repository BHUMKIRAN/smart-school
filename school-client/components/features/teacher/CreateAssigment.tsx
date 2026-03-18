'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon,
  X,
  Send,
  Hash
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/Backend/axiosClientInstance';
import { useSelector } from 'react-redux';

export default function CreateAssignment() {
  const user = useSelector((state: any) => state.auth.user);
  const teacherId = user?._id || user?.id; // 

  const [isUploading, setIsUploading] = useState(false);
  const [grades, setGrades] = useState<any[]>([]);
  const [grade, setGrade] = useState(""); // selected grade ID

  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Fetch grades on mount
  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const res = await api.get(`/grades`);
      setGrades(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load grades");
    }
  };

  // Handle Publish
  const handlePublish = async () => {
    if (!title || !file || !grade) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", instructions);
      formData.append("grade", grade);        
      formData.append("dueDate", dueDate);
      formData.append("file", file);
      formData.append("teacher", teacherId);   

      await api.post(`/assignments/`, formData);

      toast.success("Assignment Published");

      // Reset form
      setTitle("");
      setInstructions("");
      setDueDate("");
      setFile(null);
      setGrade("");

    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    }

    setIsUploading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black uppercase text-primary dark:text-slate-100">
            Assign Homework
          </h3>
          <p className="text-[10px] text-primary uppercase">
            Target Class
          </p>
        </div>

        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
          <Hash className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="space-y-5">

        {/* Grade Dropdown */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-black uppercase text-primary tracking-widest ml-1">
            Grade
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="
              w-full h-12 px-4 
              bg-slate-50 dark:bg-slate-900/50 
              border border-slate-100 dark:border-slate-800 
              rounded-xl text-sm font-bold 
              text-primary dark:text-slate-100 
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30
              transition-all cursor-pointer
              appearance-none
            "
          >
            <option value="" className="text-primary">Select Grade</option>
            {grades.map((g) => (
              <option key={g._id} value={g._id} className="text-primary dark:text-slate-100">
                {g.grade + (g.section ? " - " + g.section : "")}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 outline-none"
        />

        {/* Instructions */}
        <textarea
          rows={3}
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
        />

        {/* Due Date */}
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
          />
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-slate-900 dark:text-slate-100"
        />

        {/* File Preview */}
        {file && (
          <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{file.name}</span>
            <button onClick={() => setFile(null)}>
              <X className="w-4 h-4 text-indigo-500 hover:text-indigo-700" />
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handlePublish}
          disabled={isUploading}
          className="w-full h-12 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
        >
          {isUploading ? "Assigning..." : <>Assign Homework <Send className="w-4 h-4" /></>}
        </button>

      </div>

    </div>
  );
}
