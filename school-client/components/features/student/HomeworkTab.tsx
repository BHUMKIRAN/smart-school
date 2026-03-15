'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '@/lib/endpoints';

interface HomeworkTabProps {
  onOpenModal: (assignmentId: string) => void;
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

export default function HomeworkTab({ onOpenModal }: HomeworkTabProps) {
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
        const assignmentsRes = await axios.get(`${API_BASE_URL}/assignments/grade?grade=${gradeId}`);
        setAssignments(assignmentsRes.data);

        const submissionsRes = await axios.get(`${API_BASE_URL}/submissions/student/${userId}`);
        setSubmissions(submissionsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gradeId, userId]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  const getAssignmentStatus = () => {
    const submission = submissions.find(s => s.assignment );
    return submission?.status === 'submitted' ? 'Completed' : 'Pending';
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl font-bold text-[var(--foreground)]">Current Assignments</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Pending:</span>
          <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-bold">
            {assignments.filter(a => getAssignmentStatus(a._id) === 'Pending').length}
          </span>
        </div>
      </div>

      {loading && <p className="text-sm text-[var(--dash-text-muted)]">Loading assignments...</p>}

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => {
          const status = getAssignmentStatus();
          const isPending = status === 'Pending';

          return (
            <div
              key={assignment._id}
              className="dash-card group p-5 flex flex-col justify-between hover:border-[var(--primary)]/50 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 bg-[var(--secondary)] border border-[var(--dash-border)] rounded-md text-[10px] font-bold uppercase tracking-wider text-[var(--dash-text-muted)]">
                    {formatDate(assignment.dueDate)}
                  </span>
                  <div className="text-xs font-bold text-[var(--dash-text-muted)]">
                    Status: <span className="text-[var(--primary)]">{status}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-[var(--foreground)] leading-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {assignment.title}
                </h4>
                <p className="text-sm text-[var(--dash-text-muted)] mb-2">{assignment.description}</p>
                {assignment.fileUrl && (
                  <a
                    href={`${API_BASE_URL}${assignment.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] font-bold text-sm hover:underline"
                  >
                    View PDF
                  </a>
                )}
              </div>

              <div className="mt-6">
                {isPending ? (
                  <button
                    onClick={() => onOpenModal(assignment._id)}
                    className="w-full py-3 hero-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-[var(--primary)]/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Submit Assignment
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 bg-success/10 text-success rounded-xl text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Turned In
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
