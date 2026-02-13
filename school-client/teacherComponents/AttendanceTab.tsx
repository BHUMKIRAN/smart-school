'use client';

import { useState } from 'react';

interface AttendanceTabProps {
  onMarkAttendance: (code: string) => boolean;
  attendanceStatus: string;
}

export default function AttendanceTab({ onMarkAttendance, attendanceStatus }: AttendanceTabProps) {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    const success = onMarkAttendance(code);
    if (success) {
      setCode('');
    } else {
      alert('Please enter a valid 6-digit code');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="tab-content space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-200">Today&apos;s Attendance</h3>
            <span id="attendanceStatus" className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
              {attendanceStatus}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Enter Attendance Code</label>
              <input
                id="attendanceCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={6}
                placeholder="XXXXXX"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all text-center text-2xl font-bold tracking-widest"
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

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">This Week Summary</h3>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
              <div key={day} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-300">{day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-200">{92 + index}%</span>
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
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

      <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Recent Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Class</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Present</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Absent</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Feb 12, 2024', class: 'Math 101-A', present: 28, absent: 2, percentage: 93.3 },
                { date: 'Feb 11, 2024', class: 'Math 101-B', present: 25, absent: 5, percentage: 83.3 },
                { date: 'Feb 10, 2024', class: 'Math 201-A', present: 30, absent: 0, percentage: 100 },
              ].map((record, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-all">
                  <td className="py-3 px-4 text-sm text-slate-300">{record.date}</td>
                  <td className="py-3 px-4 text-sm text-slate-200 font-medium">{record.class}</td>
                  <td className="py-3 px-4 text-sm text-green-400">{record.present}</td>
                  <td className="py-3 px-4 text-sm text-red-400">{record.absent}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.percentage >= 90 ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
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
