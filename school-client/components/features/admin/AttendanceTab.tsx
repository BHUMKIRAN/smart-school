'use client';

import React from "react";

export default function AttendanceTab() {
  const attendance = [
    { class: 'Grade 10-A', present: 28, absent: 2, total: 30, percentage: 93 },
    { class: 'Grade 10-B', present: 26, absent: 4, total: 30, percentage: 87 },
    { class: 'Grade 11-A', present: 29, absent: 1, total: 30, percentage: 97 },
    { class: 'Grade 12-C', present: 22, absent: 8, total: 30, percentage: 73 },
  ];

  return (
    <div className="animate-fadeIn space-y-8">
      {/* 1. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card border-l-4 border-l-success group hover:bg-success/5 transition-all">
          <h3 className="text-4xl font-bold text-success mb-1 tracking-tight">92.3%</h3>
          <p className="text-sm dash-text-muted font-medium uppercase tracking-wider">Overall Attendance</p>
          <div className="mt-4 w-full bg-dash-border h-1.5 rounded-full overflow-hidden">
             <div className="bg-success h-full w-[92.3%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          </div>
        </div>

        <div className="stat-card border-l-4 border-l-primary group hover:bg-primary/5 transition-all">
          <h3 className="text-4xl font-bold dash-text mb-1 tracking-tight">784</h3>
          <p className="text-sm dash-text-muted font-medium uppercase tracking-wider">Present Today</p>
          <p className="text-xs text-primary mt-4 font-bold">+14 from yesterday</p>
        </div>

        <div className="stat-card border-l-4 border-l-error group hover:bg-error/5 transition-all">
          <h3 className="text-4xl font-bold text-error mb-1 tracking-tight">72</h3>
          <p className="text-sm dash-text-muted font-medium uppercase tracking-wider">Absent Today</p>
          <p className="text-xs text-error mt-4 font-bold">12 unexcused</p>
        </div>
      </div>

      {/* 2. Detailed Class Breakdown */}
      <div className="dash-card overflow-hidden">
        <div className="px-6 py-5 border-b dash-border bg-dash-surface-2 flex justify-between items-center">
           <h3 className="font-bold dash-text">Class-wise Breakdown</h3>
           <button className="btn-primary text-xs py-1.5 px-4 rounded-lg shadow-sm">Export Report</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full dash-table">
            <thead>
              <tr className="text-left dash-text-muted text-xs font-bold uppercase tracking-widest border-b dash-border">
                <th className="px-6 py-4">Class Name</th>
                <th className="px-6 py-4">Present</th>
                <th className="px-6 py-4">Absent</th>
                <th className="px-6 py-4">Total Capacity</th>
                <th className="px-6 py-4">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y dash-border">
              {attendance.map((item, i) => (
                <tr key={i} className="hover:bg-dash-surface-2/50 transition-colors group">
                  <td className="px-6 py-4 font-bold dash-text text-sm">
                    {item.class}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-success font-bold">{item.present}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-error font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.absent}
                    </span>
                  </td>
                  <td className="px-6 py-4 dash-text-muted text-sm">
                    {item.total} Students
                  </td>
                  <td className="px-6 py-4 min-w-[200px]">
                    <div className="flex items-center gap-4">
                      {/* Visual Bar */}
                      <div className="flex-1 h-2 bg-dash-border rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.percentage > 90 ? 'bg-success' : item.percentage > 80 ? 'bg-primary' : 'bg-warning'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      {/* Percent Tag */}
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                         item.percentage > 90 
                         ? 'bg-success/10 text-success border-success/20' 
                         : 'bg-primary/10 text-primary border-primary/20'
                      }`}>
                        {item.percentage}%
                      </span>
                    </div>
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