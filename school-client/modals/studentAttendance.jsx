'use client';

import { Dialog } from "@headlessui/react";


export default function AttendanceClassModal({
  isOpen,
  onClose,
  grade,
  students,
  toggleAttendance,
  saveAttendance
}: any) {

  return (

    <Dialog open={isOpen} onClose={onClose} className="relative z-50">

      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center">

        <Dialog.Panel className="bg-white p-6 rounded-lg w-[600px]">

          <Dialog.Title className="text-xl font-bold mb-4">

            Grade {grade?.grade} - {grade?.section} Attendance

          </Dialog.Title>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">
                <th>Name</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student: any) => (

                <tr key={student._id} className="border-b">

                  <td>{student.name}</td>

                  <td>

                    <button
                      onClick={() => toggleAttendance(student._id)}
                      className={`px-3 py-1 rounded text-white ${
                        student.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >

                      {student.status}

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="flex justify-end mt-4 gap-3">

            <button
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={saveAttendance}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Attendance
            </button>

          </div>

        </Dialog.Panel>

      </div>

    </Dialog>

  );
}