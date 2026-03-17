'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/features/admin/AdminHeader';
import AdminNavbar from '@/components/features/admin/AdminNavbar';
import TeachersTab, { Teacher } from '@/components/features/admin/TeachersTab';
import StudentsTab, { Student } from '@/components/features/admin/StudentsTab';
import NoticesTab from '@/components/features/admin/NoticesTab';
import EmergencyTab from '@/components/features/admin/EmergencyTab';
import AttendanceTab from '@/components/features/admin/AttendanceTab';
import ApplicationsTab from '@/components/features/admin/ApplicationsTab';
import Logout from '@/modals/LogoutModal';
import TeacherModal from '@/modals/teacherModals';
import StudentModal from '@/modals/studentModal';
import AdminHome from '@/components/features/admin/AdminHome';
import TeacherCardModal from '@/modals/teacherCard';
import StudentCardModal from '@/modals/studentCard';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {

  const router = useRouter();
  const { user, token } = useSelector((state: any) => state.auth);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [logout, setLogout] = useState(false);
  const [modalType, setModalType] = useState<"teacher" | "student" | null>(null);
  const [modalView, setModalView] = useState<{
    type: "teacher" | "student" | "view" | null;
    data?: Teacher | null;
  }>({ type: null, data: null });
  const [modalStudentView, setmodalStudentView] = useState<{
    type: "teacher" | "student" | "view" | null;
    data?: Student | null;
  }>({ type: null, data: null });

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'System Overview', subtitle: 'Real-time school performance & metrics' },
    teachers: { title: 'Teacher Management', subtitle: 'Manage and monitor your teachers' },
    students: { title: 'Student Management', subtitle: 'Manage and monitor your students' },
    notices: { title: 'Notice Management', subtitle: 'Create and manage school notices' },
    emergency: { title: 'Emergency Notices', subtitle: 'Manage critical emergency alerts' },
    attendance: { title: 'Attendance Monitoring', subtitle: 'Track and analyze attendance data' },
    applications: { title: 'Application Review', subtitle: 'Review and approve student applications' },
  };

  useEffect(() => {
    if (!token) {
      // Not logged in
      router.replace('/login');
      return;
    }

    if (user?.role !== 'admin') {
      // Role is not admin
      router.replace('/login');
    }
  }, [token, user, router]);

  return (
    <div className="min-h-screen min-w-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">

      {/* Header */}
      <AdminHeader
        setLogout={setLogout}
        title={tabTitles[activeTab]?.title || "Dashboard"}
        subtitle={tabTitles[activeTab]?.subtitle || ""}
      />

      {/* Full-width Horizontal Navbar */}
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}

      />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && <AdminHome />}
        {activeTab === 'teachers' && <TeachersTab setmodalView={setModalView} />}
        {activeTab === 'students' && <StudentsTab setmodalStudentView={setmodalStudentView} />}
        {activeTab === 'notices' && <NoticesTab />}
        {activeTab === 'emergency' && <EmergencyTab />}
        {activeTab === 'attendance' && <AttendanceTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
      </main>

      {/* Modals */}
      {modalType === "teacher" && (
        <TeacherModal
          isOpen={true}
          onClose={() => setModalType(null)}
          mode="create"
          teacherData={undefined}
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
      {modalView.type === "view" && modalView.data && (
        <TeacherCardModal
          isOpen={true}
          teacher={modalView.data}
          onClose={() => setModalView({ type: null, data: null })}
        />
      )}
      {modalStudentView.type === "view" && modalStudentView.data && (
        <StudentCardModal
          isOpen={true}
          onClose={() => setmodalStudentView({ type: null, data: null })}
          student={modalStudentView.data}
        />
      )}

      {logout && <Logout onClose={() => setLogout(false)} />}
    </div>
  );
}