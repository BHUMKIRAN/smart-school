'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/features/admin/AdminSidebar';
import AdminHeader from '@/components/features/admin/AdminHeader';
import TeachersTab from '@/components/features/admin/TeachersTab';
import StudentsTab from '@/components/features/admin/StudentsTab';
import NoticesTab from '@/components/features/admin/NoticesTab';
import EmergencyTab from '@/components/features/admin/EmergencyTab';
import AttendanceTab from '@/components/features/admin/AttendanceTab';
import ApplicationsTab from '@/components/features/admin/ApplicationsTab';
import Logout from '@/modals/LogoutModal';
import TeacherModal from '@/modals/teacherModals';
import StudentModal from '@/modals/studentModal';
import AdminHome from '@/components/features/admin/AdminHome';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logout, setLogout] = useState(false);
  const [modalType, setModalType] = useState<"teacher" | "student" | null>(null);

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'System Overview', subtitle: 'Real-time school performance & metrics' },
    teachers: { title: 'Teacher Management', subtitle: 'Manage and monitor your teachers' },
    students: { title: 'Student Management', subtitle: 'Manage and monitor your students' },
    notices: { title: 'Notice Management', subtitle: 'Create and manage school notices' },
    emergency: { title: 'Emergency Notices', subtitle: 'Manage critical emergency alerts' },
    attendance: { title: 'Attendance Monitoring', subtitle: 'Track and analyze attendance data' },
    applications: { title: 'Application Review', subtitle: 'Review and approve student applications' },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex">

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setLogout={setLogout}
      />

      {/* Mobile overlay when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`
          flex-1 transition-all duration-300
          lg:ml-72
          ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
        `}
      >
        {/* Header */}
        <AdminHeader
          title={tabTitles[activeTab]?.title || "Dashboard"}
          subtitle={tabTitles[activeTab]?.subtitle || ""}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <AdminHome />}
          {activeTab === 'teachers' && <TeachersTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'notices' && <NoticesTab />}
          {activeTab === 'emergency' && <EmergencyTab />}
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'applications' && <ApplicationsTab />}
        </div>

        {/* Teacher Modal */}
        {modalType === "teacher" && (
          <TeacherModal
            isOpen={true}
            onClose={() => setModalType(null)}
            mode="create"
            teacherData={null}
            refreshTeachers={() => window.location.reload()}
          />
        )}

        {/* Student Modal */}
        {modalType === "student" && (
          <StudentModal
            isOpen={true}
            mode="create"
            onClose={() => setModalType(null)}
            refreshStudents={() => window.location.reload()}
          />
        )}

        {/* Logout Modal */}
        {logout && <Logout onClose={() => setLogout(false)} />}
      </main>
    </div>
  );
}