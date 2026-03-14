'use client';

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { X } from "lucide-react";


interface Student {
  id?: string;
  _id?: string;
  name: string;
  roll?: number | string;
  gradeId?: string;
  status: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  grade: { grade: number; section?: string; _id?: string } | null;
  students: Student[];
  toggleAttendance: (id: string) => void;
  saveAttendance: () => void; // save all toggled attendance
}

export default function AttendanceClassModal({
  isOpen,
  onClose,
  grade,
  students,
  toggleAttendance,
  saveAttendance,
}: Props) {

  if (!grade) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">

      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="bg-white rounded-xl w-full max-w-3xl shadow-xl">

          {/* Header */}
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="text-lg font-bold">
              Grade {grade.grade} {grade.section ? `- ${grade.section}` : ""} Students
            </h3>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Table */}
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3">Roll</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-400">
                      No students in this grade.
                    </td>
                  </tr>
                )}

                {students.map(student => (
                  <tr key={student.id || student._id} className="border-b">

                    <td className="py-3">{student.roll ?? "-"}</td>

                    <td className="font-medium">{student.name}</td>

                    <td>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded
                        ${
                          student.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => toggleAttendance(student.id || student._id || "")}
                        className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700"
                      >
                        Toggle
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer: Save attendance */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t">
            <button
              onClick={saveAttendance}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Attendance
            </button>
            <button
              onClick={onClose}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}