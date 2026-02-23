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
// import StudentModal from '@/modals/studentModal'; // ✅ import student modal

export default function AdminDashboardPage() {

  const [activeTab, setActiveTab] = useState('teachers');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logout, setLogout] = useState(false);

  const [modalType, setModalType] = useState<
    "teacher" | "student" | null
  >(null);

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    teachers: { title: 'Teacher Management', subtitle: 'Manage and monitor your teachers' },
    students: { title: 'Student Management', subtitle: 'Manage and monitor your students' },
    notices: { title: 'Notice Management', subtitle: 'Create and manage school notices' },
    emergency: { title: 'Emergency Notices', subtitle: 'Manage critical emergency alerts' },
    attendance: { title: 'Attendance Monitoring', subtitle: 'Track and analyze attendance data' },
    applications: { title: 'Application Review', subtitle: 'Review and approve student applications' },
  };

  return (
    <div className="min-h-screen">

      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setLogout={setLogout}
      />

      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'
          }`}
      >

        <AdminHeader
          title={tabTitles[activeTab].title}
          subtitle={tabTitles[activeTab].subtitle}
          onAdd={() => {
            if (activeTab === "teachers") {
              setModalType("teacher");
            } else if (activeTab === "students") {
              setModalType("student");
            }
          }}
        />

        <div className="p-8">
          {activeTab === 'teachers' && <TeachersTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'notices' && <NoticesTab />}
          {activeTab === 'emergency' && <EmergencyTab />}
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'applications' && <ApplicationsTab />}
        </div>

        {/* ✅ CORRECT MODAL RENDERING */}

        {modalType === "teacher" && (
          <TeacherModal
            isOpen={true}
            onClose={() => setModalType(null)}
            mode="create"
            teacherData={null}
            refreshTeachers={() => window.location.reload()}
          />
        )}

        {modalType === "student" && (
          <StudentModal
            isOpen={true}
            mode="create"
            onClose={() => setModalType(null)}
            refreshStudents={() => window.location.reload()}
          />
        )}

        {logout && <Logout onClose={() => setLogout(false)} />}

      </main>
    </div>
  );
}