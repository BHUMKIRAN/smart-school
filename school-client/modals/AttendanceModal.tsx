'use client';

import { useEffect, useState } from 'react';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AttendanceModal({ isOpen, onClose }: AttendanceModalProps) {
  const [studentData, setStudentData] = useState({
    total: 486,
    present: 465,
    absent: 21,
    rate: 96
  });

  const [teacherData, setTeacherData] = useState({
    total: 28,
    present: 27,
    absent: 1,
    rate: 96
  });

  const [currentTime, setCurrentTime] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Real-time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      setCurrentTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const updateAttendanceData = () => {
    setIsUpdating(true);

    // Simulate real-time data (replace with actual API call)
    const presentStudents = Math.floor(Math.random() * 30) + 455;
    const absentStudents = 486 - presentStudents;
    const studentRate = Math.round((presentStudents / 486) * 100);

    setStudentData({
      total: 486,
      present: presentStudents,
      absent: absentStudents,
      rate: studentRate
    });

    const presentTeachers = Math.floor(Math.random() * 3) + 26;
    const absentTeachers = 28 - presentTeachers;
    const teacherRate = Math.round((presentTeachers / 28) * 100);

    setTeacherData({
      total: 28,
      present: presentTeachers,
      absent: absentTeachers,
      rate: teacherRate
    });

    setTimeout(() => setIsUpdating(false), 500);
  };

  // Move to a separate useEffect or wrap in requested pattern
  useEffect(() => {
    if (isOpen) {
      // First update after a small delay to avoid cascading render warning
      const initialTimeout = setTimeout(() => {
        updateAttendanceData();
      }, 0);

      // Update every 3 seconds for real-time feel
      const interval = setInterval(() => {
        updateAttendanceData();
      }, 3000);

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="bg-primary  rounded-t-3xl px-6 py-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:rotate-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="pr-8">
            <h2 className="text-2xl font-bold text-white nepali-text mb-1">आजको उपस्थिति</h2>
            <div className="flex items-center gap-2 text-white/90">
              <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-green-400' : 'bg-accent'} animate-pulse`}></div>
              <span className="text-sm">लाइभ अपडेट - {currentTime}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Student Attendance Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-100">
            {isUpdating && (
              <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 nepali-text">विद्यार्थी</p>
                <p className="text-3xl font-bold text-blue-600">{studentData.rate}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/70 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${studentData.rate}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center bg-white/70 rounded-lg py-2 px-1">
                <p className="text-lg font-bold text-gray-800">{studentData.total}</p>
                <p className="text-xs text-gray-600 nepali-text">कुल</p>
              </div>
              <div className="text-center bg-white/70 rounded-lg py-2 px-1">
                <p className="text-lg font-bold text-green-600">{studentData.present}</p>
                <p className="text-xs text-gray-600 nepali-text">उपस्थित</p>
              </div>
              <div className="text-center bg-white/70 rounded-lg py-2 px-1">
                <p className="text-lg font-bold text-red-600">{studentData.absent}</p>
                <p className="text-xs text-gray-600 nepali-text">अनुपस्थित</p>
              </div>
            </div>
          </div>

          {/* Teacher Attendance Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5 border border-green-100">
            {isUpdating && (
              <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 nepali-text">शिक्षक</p>
                <p className="text-3xl font-bold text-accent">{teacherData.rate}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/70 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
              <div
                className="h-full bg-accent rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${teacherData.rate}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center bg-white/70 rounded-lg py-2 px-1">
                <p className="text-lg font-bold text-gray-800">{teacherData.total}</p>
                <p className="text-xs text-gray-600 nepali-text">कुल</p>
              </div>
              <div className="text-center bg-white/70 rounded-lg py-2 px-1">
                <p className="text-lg font-bold text-green-600">{teacherData.present}</p>
                <p className="text-xs text-gray-600 nepali-text">उपस्थित</p>
              </div>
              <div className="text-center bg-white/70 rounded-lg py-2 px-1">
                <p className="text-lg font-bold text-red-600">{teacherData.absent}</p>
                <p className="text-xs text-gray-600 nepali-text">अनुपस्थित</p>
              </div>
            </div>
          </div>

          {/* Auto Update Info */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="nepali-text">प्रत्येक ३ सेकेन्डमा स्वचालित अपडेट</span>
          </div>
        </div>
      </div>


    </div>
  );
}
