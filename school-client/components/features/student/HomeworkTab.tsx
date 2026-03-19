'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '@/lib/endpoints';
import { api } from '@/Backend/axiosClientInstance';
import { FileText, Clock, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface HomeworkTabProps {
  onOpenModal: (assignmentId: string, subject: string) => void;
  refreshFlag?: boolean;
}

interface Assignment {
  _id: string;
  title: string;
  description: string;
  grade: string;
  teacher: string;
  fileUrl: string;
  dueDate: string;
}

interface Submission {
  _id: string;
  assignment: string;
  status: 'submitted' | 'checked';
}

export default function HomeworkTab({ onOpenModal, refreshFlag }: HomeworkTabProps) {
  const user = useSelector((state: any) => state.auth.user);
  const gradeId = user?.grade?._id;
  const userId = user?.id;

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!gradeId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const assignmentsRes = await api.get(`/assignments/grade/${gradeId}`);
        setAssignments(assignmentsRes.data);

        const submissionsRes = await api.get(`/submissions/student/${userId}`);
        setSubmissions(submissionsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gradeId, userId, refreshFlag]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  const getAssignmentStatus = (assignmentId: string) => {
    const submission = submissions.find((s) => s.assignment === assignmentId);
    return submission?.status ? 'Completed' : 'Pending';
  };

  return (
    <div className="animate-fadeIn space-y-6 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--dash-text)]">Academic Assignments</h3>
          <p className="text-xs text-[var(--dash-text-muted)]">Track and submit your homework</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[var(--dash-surface)] border border-[var(--dash-border)] px-4 py-2 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--dash-text-muted)]">Pending Tasks:</span>
          <span className="px-2.5 py-0.5 bg-[var(--primary)] text-white rounded-full text-xs font-bold animate-pulse">
            {assignments.filter(a => getAssignmentStatus(a._id) === 'Pending').length}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[var(--dash-text-muted)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
          <span className="ml-3 font-medium">Loading assignments...</span>
        </div>
      ) : assignments.length === 0 ? (
        <div className="dash-card py-20 flex flex-col items-center justify-center text-[var(--dash-text-muted)] opacity-60">
          <FileText className="w-12 h-12 mb-3" />
          <p>No assignments posted for your grade yet.</p>
        </div>
      ) : (
        /* Assignment Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {assignments.map((assignment) => {
            const status = getAssignmentStatus(assignment._id);
            const isPending = status === 'Pending';

            return (
              <div
                key={assignment._id}
                className="dash-card group flex flex-col justify-between hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-all duration-300 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight text-[var(--dash-text-muted)]  px-2 py-1 rounded border border-[var(--dash-border)]">
                      <Clock className="w-3 h-3 text-[var(--primary)]" />
                      Due: {formatDate(assignment.dueDate)}
                    </div>
                    
                    <div className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isPending 
                      ? "bg-[color-mix(in_srgb,var(--warning)_15%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]" 
                      : "bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]"
                    }`}>
                      {isPending ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {status}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-[var(--dash-text)] leading-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {assignment.title}
                  </h4>
                  <p className="text-sm text-[var(--dash-text-muted)] mb-4 line-clamp-2 italic">
                    {assignment.description}
                  </p>
                  
                  {assignment.fileUrl && (
                    <a
                      href={`${API_BASE_URL}${assignment.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--primary)] font-bold text-xs hover:text-[var(--primary-dark)] transition-colors p-2 bg-[var(--primary)]/5 rounded-lg border border-[var(--primary)]/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Reference Materials (PDF)
                    </a>
                  )}
                </div>

                <div className="px-5 pb-5 mt-auto">
                  {isPending ? (
                    <button
                      onClick={() => onOpenModal(assignment._id, assignment.title)}
                      className="w-full py-3 hero-gradient text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      Submit Assignment
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 py-3 bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)] border border-[color-mix(in_srgb,var(--success)_20%,transparent)] rounded-xl text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Assignment Turned In
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}