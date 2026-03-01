'use client';

import { useState } from 'react';
import TeacherNav from '@/components/features/teacher/TeacherNav';
import StatsCards from '@/components/features/teacher/schedule'; 
import TabButtons from '@/components/features/teacher/TabButtons';
import AttendanceTab from '@/components/features/teacher/AttendanceTab';
import ClassesTab from '@/components/features/teacher/ClassesTab';
import SuccessModal from '@/components/features/teacher/SuccessModal';
import Logout from '@/modals/LogoutModal';
import CreateAssignment from '@/components/features/teacher/CreateAssigment';

export default function TeachersPanelPage() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [showModal, setShowModal] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('Not Marked');
  const [logout, setLogout] = useState(false);

  const handleMarkAttendance = () => {
    setShowModal(true);
    setAttendanceStatus('Marked ✓');
    return true;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <TeacherNav setLogout={setLogout} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="space-y-12">
          
          {/* Top Section: Greeting & Global Stats */}
          <section className="animate-in fade-in slide-in-from-top-4 duration-700">
         
            <StatsCards />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Core Workflows (Attendance/Classes) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-6 mb-2">
                <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="h-px flex-1 bg-slate-200/60 dark:bg-slate-800/60" />
              </div>

              <div className="min-h-[500px]">
                {activeTab === 'attendance' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <AttendanceTab
                      onMarkAttendance={handleMarkAttendance}
                      attendanceStatus={attendanceStatus}
                    />
                  </div>
                )}
                {activeTab === 'classes' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <ClassesTab />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Actions & Tools */}
            <aside className="lg:col-span-4 space-y-6 sticky top-24">
              <div className="group">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <span className="w-1.5 h-4 bg-indigo-600 rounded-full" />
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Actions</h2>
                </div>
                <CreateAssignment />
              </div>

              {/* Optional: Add a simple help card or small news snippet here later */}
            </aside>
            
          </div>
        </div>
      </main>

      {/* Overlays */}
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      {logout && <Logout onClose={() => setLogout(false)} />}
    </div>
  );
}