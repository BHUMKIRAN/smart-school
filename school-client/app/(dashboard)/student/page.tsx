'use client';

import { useState } from 'react';
import StudentHeader from '@/components/features/student/StudentHeader';
import WelcomeSection from '@/components/features/student/WelcomeSection';
import TabButtons from '@/components/features/student/TabButtons';
import HomeworkTab from '@/components/features/student/HomeworkTab';
import ApplicationsTab from '@/components/features/student/ApplicationsTab';
import SupportTab from '@/components/features/student/SupportTab';
import SubmitModal from '@/components/features/student/SubmitModal';
import Logout from '@/modals/LogoutModal';

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState('homework');
  const [showModal, setShowModal] = useState(false);
  const [modalSubject, setModalSubject] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleOpenModal = (subject: string) => {
    setModalSubject(subject);
    setShowModal(true);
  };

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <StudentHeader toggleLogout={setLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Hero Section */}
        <WelcomeSection />

        <div className="w-full space-y-6">
          <div className="dash-card rounded-3xl p-1 md:p-2 border border-[var(--dash-border)] overflow-hidden">
            {/* Tab Navigation Tray */}
            <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Dynamic Tab Content - Full Width focused on Homework, Apps, and Support */}
            <div className="p-4 md:p-10 min-h-[550px]">
              {activeTab === 'homework' && (
                <HomeworkTab onOpenModal={handleOpenModal} />
              )}
              
              {activeTab === 'applications' && (
                <ApplicationsTab onSubmit={() => displayToast('Application submitted successfully!')} />
              )}
              
              {activeTab === 'support' && (
                <SupportTab onSubmit={() => displayToast('Issue reported successfully!')} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Overlays */}
      <SubmitModal
        isOpen={showModal}
        subject={modalSubject}
        onClose={() => setShowModal(false)}
        onSubmit={() => {
          setShowModal(false);
          displayToast('Homework submitted successfully!');
        }}
      />

      {logout && <Logout onClose={() => setLogout(false)} />}

      {/* Global Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-slide-up">
          <div className="bg-neutral-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-sm font-bold tracking-tight">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}