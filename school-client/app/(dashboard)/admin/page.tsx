'use client';

import { useState } from 'react';
import AdminSidebar from '@/adminComponents/AdminSidebar';
import AdminHeader from '@/adminComponents/AdminHeader';
import TeachersTab from '@/adminComponents/TeachersTab';
import StudentsTab from '@/adminComponents/StudentsTab';
import NoticesTab from '@/adminComponents/NoticesTab';
import EmergencyTab from '@/adminComponents/EmergencyTab';
import AttendanceTab from '@/adminComponents/AttendanceTab';
import ApplicationsTab from '@/adminComponents/ApplicationsTab';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('teachers');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      />

      <main
        id="mainContent"
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        <AdminHeader
          title={tabTitles[activeTab].title}
          subtitle={tabTitles[activeTab].subtitle}
        />

        <div className="p-8">
          {activeTab === 'teachers' && <TeachersTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'notices' && <NoticesTab />}
          {activeTab === 'emergency' && <EmergencyTab />}
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'applications' && <ApplicationsTab />}
        </div>
      </main>
    </div>
  );
}
