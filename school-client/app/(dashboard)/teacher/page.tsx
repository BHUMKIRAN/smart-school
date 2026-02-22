'use client';

import { useState } from 'react';
import TeacherNav from '@/components/features/teacher/TeacherNav';
import StatsCards from '@/components/features/teacher/StatsCards';
import TabButtons from '@/components/features/teacher/TabButtons';
import AttendanceTab from '@/components/features/teacher/AttendanceTab';
import ClassesTab from '@/components/features/teacher/ClassesTab';
import StudentsTab from '@/components/features/teacher/StudentsTab';
import ResourcesSection from '@/components/features/teacher/ResourcesSection';
import QuickLinks from '@/components/features/teacher/QuickLinks';
import SuccessModal from '@/components/features/teacher/SuccessModal';
import Logout from '@/modals/LogoutModal';

export default function TeachersPanelPage() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [showModal, setShowModal] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('Not Marked');
  const [logout , setLogout] = useState(false)

  const handleMarkAttendance = (code: string) => {
    if (code.length === 6) {
      setShowModal(true);
      setAttendanceStatus('Marked ✓');
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen">
      <TeacherNav setLogout={setLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <StatsCards />
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-effect rounded-xl p-6 border border-blue-500/20">
                <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <div className="mt-6">
                  {activeTab === 'attendance' && (
                    <AttendanceTab 
                      onMarkAttendance={handleMarkAttendance}
                      attendanceStatus={attendanceStatus}
                    />
                  )}
                  {activeTab === 'classes' && <ClassesTab />}
                  {activeTab === 'students' && <StudentsTab />}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ResourcesSection />
              <QuickLinks />
            </div>
          </div>
        </div>
      </main>

      <SuccessModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      {logout && <Logout onClose={()=>setLogout(false)}/>}
    </div>
  );
}
