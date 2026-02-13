'use client';

import { useState } from 'react';
import StudentHeader from '@/components/features/student/StudentHeader';
import WelcomeSection from '@/components/features/student/WelcomeSection';
import TabButtons from '@/components/features/student/TabButtons';
import HomeworkTab from '@/components/features/student/HomeworkTab';
import GradesTab from '@/components/features/student/GradesTab';
import ApplicationsTab from '@/components/features/student/ApplicationsTab';
import SupportTab from '@/components/features/student/SupportTab';
import SubmitModal from '@/components/features/student/SubmitModal';
import SuccessToast from '@/components/features/student/SuccessToast';

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState('homework');
  const [showModal, setShowModal] = useState(false);
  const [modalSubject, setModalSubject] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleOpenModal = (subject: string) => {
    setModalSubject(subject);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitHomework = () => {
    setShowModal(false);
    displayToast('Homework submitted successfully!');
  };

  const handleSubmitApplication = () => {
    displayToast('Application submitted successfully!');
  };

  const handleSubmitIssue = () => {
    displayToast('Issue reported successfully!');
  };

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div>
      <StudentHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
              <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className="mt-6">
                {activeTab === 'homework' && (
                  <HomeworkTab onOpenModal={handleOpenModal} />
                )}
                {activeTab === 'grades' && <GradesTab />}
                {activeTab === 'applications' && (
                  <ApplicationsTab onSubmit={handleSubmitApplication} />
                )}
                {activeTab === 'support' && (
                  <SupportTab onSubmit={handleSubmitIssue} />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* This sidebar space can be used for additional widgets */}
          </div>
        </div>
      </main>

      <SubmitModal
        isOpen={showModal}
        subject={modalSubject}
        onClose={handleCloseModal}
        onSubmit={handleSubmitHomework}
      />

      <SuccessToast
        isVisible={showToast}
        message={toastMessage}
      />
    </div>
  );
}
