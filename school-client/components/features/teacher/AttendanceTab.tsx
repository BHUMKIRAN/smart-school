'use client';

import axios from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '@/lib/endpoints';

interface AttendanceTabProps {
  onMarkAttendance: () => boolean;
  attendanceStatus: string;
}

export default function AttendanceTab({ onMarkAttendance, attendanceStatus }: AttendanceTabProps) {
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    const trimmedCode = code.trim();

      await axios.post(`${API_BASE_URL}/mark`, {
        teacherId :1 ,
        ...(trimmedCode ? { code: trimmedCode } : {}),
      });
      onMarkAttendance();
      alert('Attendance marked successfully');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="tab-content space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="dash-card bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dash-text">Today&apos;s Attendance</h3>
            <span id="attendanceStatus" className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
              {attendanceStatus}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm dash-text-muted mb-2">Enter Attendance Code</label>
              <input
                id="attendanceCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={6}
                placeholder="XXXXXX"
                className="dash-input w-full text-center text-2xl font-bold tracking-widest"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="attendance-btn w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Mark Attendance
            </button>
          </div>
        </div>

        <div className="dash-card bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold dash-text mb-4">This Week Summary</h3>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
              <div key={day} className="flex items-center justify-between p-3 dash-card-alt rounded-lg">
                <span className="text-sm dash-text">{day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold dash-text">{92 + index}%</span>
                  <div className="w-20 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--dash-border)' }}>
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${92 + index}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-card p-6">
        <h3 className="text-lg font-semibold dash-text mb-4">Recent Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Feb 12, 2024', class: 'Math 101-A', present: 28, absent: 2, percentage: 93.3 },
                { date: 'Feb 11, 2024', class: 'Math 101-B', present: 25, absent: 5, percentage: 83.3 },
                { date: 'Feb 10, 2024', class: 'Math 201-A', present: 30, absent: 0, percentage: 100 },
              ].map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td className="font-medium">{record.class}</td>
                  <td className="text-green-500">{record.present}</td>
                  <td className="text-red-500">{record.absent}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.percentage >= 90 ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                      {record.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
