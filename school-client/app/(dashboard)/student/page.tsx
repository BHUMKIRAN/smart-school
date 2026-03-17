'use client';

import { useState } from 'react';
import StudentHeader from '@/components/features/student/StudentHeader';
import WelcomeSection from '@/components/features/student/WelcomeSection';
import TabButtons from '@/components/features/student/TabButtons';
import HomeworkTab from '@/components/features/student/HomeworkTab';
import ApplicationsTab from '@/components/features/student/ApplicationsTab';
import SubmitModal from '@/components/features/student/SubmitModal';
import Logout from '@/modals/LogoutModal';

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // default to Dashboard
  const [showModal, setShowModal] = useState(false);
  const [modalSubject, setModalSubject] = useState('');
  const [modalAssignmentId, setModalAssignmentId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [logout, setLogout] = useState(false);
  const [refreshHomework, setRefreshHomework] = useState(false);

  const handleOpenModal = (assignmentId: string, subject: string) => {
    setModalAssignmentId(assignmentId);
    setModalSubject(subject);
    setShowModal(true);
  };

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen dash-page bg-[var(--dash-bg)]">
      {/* Header */}
      <StudentHeader toggleLogout={setLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="w-full space-y-6">
          <div className="mt-3 p-1 md:p-2 border border-[var(--dash-border)] bg-[var(--dash-surface)] overflow-hidden rounded-3xl">
            <div className="p-4 md:p-10 min-h-[550px] text-[var(--dash-text)]">
              {activeTab === 'dashboard' && <WelcomeSection />}
              {activeTab === 'homework' && (
                <HomeworkTab
                  onOpenModal={handleOpenModal}
                  refreshFlag={refreshHomework}
                />
              )}
              {activeTab === 'applications' && (
                <ApplicationsTab
                  onSubmit={() => displayToast('Application submitted successfully!')}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Submit Modal */}
      {modalAssignmentId && (
        <SubmitModal
          isOpen={showModal}
          assignmentId={modalAssignmentId}
          subject={modalSubject}
          onClose={() => setShowModal(false)}
          onSubmitted={() => {
            setShowModal(false);
            displayToast('Homework submitted successfully!');
            setRefreshHomework((prev) => !prev); // refresh homework list
          }}
        />
      )}

      {/* Logout Modal */}
      {logout && <Logout onClose={() => setLogout(false)} />}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-slide-up">
          <div className="bg-[var(--dash-glass)] backdrop-blur-md text-[var(--dash-text)] px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-[var(--dash-border)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_rgba(255,206,50,0.5)]" />
            <span className="text-sm font-bold tracking-tight">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
