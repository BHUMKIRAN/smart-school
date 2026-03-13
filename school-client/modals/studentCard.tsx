'use client';

import { Dialog, DialogBackdrop, DialogPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Mail, GraduationCap, Percent, Award, Hash } from 'lucide-react';

interface StudentCardModalProps {
isOpen: boolean;
onClose: () => void;
student: {
_id: string;
name: string;
email: string;
grade: string;
attendance?: number;
gpa?: number;
status?: string;
};
}

export default function StudentCardModal({
isOpen,
onClose,
student
}: StudentCardModalProps) {

if (!student) return null;

return ( <Transition appear show={isOpen} as={Fragment}> <Dialog as="div" className="relative z-50" onClose={onClose}>

    {/* BACKDROP */}
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
    </Transition.Child>

    {/* MODAL WRAPPER */}
    <div className="fixed inset-0 flex items-center justify-center p-4">

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >

        <DialogPanel className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="text-lg font-bold">{student.name}</h3>
                <p className="text-sm opacity-80">
                  {student.status || "Active Student"}
                </p>
              </div>

            </div>

            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* BODY */}
          <div className="p-6 grid grid-cols-1 gap-4">

            {/* ID */}
            <div className="flex items-center gap-3 text-slate-600">
              <Hash className="w-4 h-4" />
              <span className="font-medium">Student ID:</span>
              {student._id}
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3 text-slate-600">
              <Mail className="w-4 h-4" />
              <span className="font-medium">Email:</span>
              {student.email}
            </div>

            {/* GRADE */}
            <div className="flex items-center gap-3 text-slate-600">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">Grade:</span>
              {student.grade}
            </div>

            {/* ATTENDANCE */}
            <div className="flex items-center gap-3 text-slate-600">
              <Percent className="w-4 h-4" />
              <span className="font-medium">Attendance:</span>
              {student.attendance ?? 0}%
            </div>

            {/* GPA */}
            <div className="flex items-center gap-3 text-slate-600">
              <Award className="w-4 h-4" />
              <span className="font-medium">GPA:</span>
              {student.gpa?.toFixed(2) || "0.00"}
            </div>

          </div>

          {/* FOOTER */}
          <div className="border-t p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              Close
            </button>
          </div>

        </DialogPanel>

      </Transition.Child>

    </div>

  </Dialog>
</Transition>

);
}
