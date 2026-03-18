'use client';

import { useEffect, useState } from 'react';
import socket from "@/lib/socket";
import { api } from "@/Backend/axiosClientInstance";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttendanceState {
  total: number;
  present: number;
  absent: number;
  rate: number;
}

export default function AttendanceModal({ isOpen, onClose }: AttendanceModalProps) {

  const [studentData, setStudentData] = useState<AttendanceState>({
    total: 0,
    present: 0,
    absent: 0,
    rate: 0
  });

  const [teacherData, setTeacherData] = useState<AttendanceState>({
    total: 0,
    present: 0,
    absent: 0,
    rate: 0
  });

  const [currentTime, setCurrentTime] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  /* ---------------- CLOCK ---------------- */

  useEffect(() => {

    const updateClock = () => {
      const now = new Date();

      setCurrentTime(
        `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);

  }, []);


  /* ---------------- LOAD ATTENDANCE ---------------- */

  const loadAttendance = async () => {

    try {

      const [studentRes, teacherRes] = await Promise.all([
        api.get(`/attendance/today`, { params: { role: "Student" } }),
        api.get(`/attendance/today`, { params: { role: "Teacher" } }),
      ]);

      const students = studentRes.data;
      const teachers = teacherRes.data;

      const studentPresent = students.filter((s:any)=>s.status==="Present").length;
      const studentTotal = students.length;

      const teacherPresent = teachers.filter((t:any)=>t.status==="Present").length;
      const teacherTotal = teachers.length;

      setStudentData({
        total: studentTotal,
        present: studentPresent,
        absent: studentTotal - studentPresent,
        rate: studentTotal ? Math.round((studentPresent/studentTotal)*100) : 0
      });

      setTeacherData({
        total: teacherTotal,
        present: teacherPresent,
        absent: teacherTotal - teacherPresent,
        rate: teacherTotal ? Math.round((teacherPresent/teacherTotal)*100) : 0
      });

    } catch (err) {

      console.error("Attendance load error", err);

    }

  };
  useEffect(()=>{

    if(isOpen){
      loadAttendance();
    }

  },[isOpen]);


  /* ---------------- SOCKET LIVE UPDATE ---------------- */

  useEffect(()=>{

    if(!isOpen) return;

    const handleUpdate = () => {

      setIsUpdating(true);

      loadAttendance();

      setTimeout(()=>{

        setIsUpdating(false);

      },500);

    };

    socket.on("attendanceUpdate", handleUpdate);

    return ()=>{

      socket.off("attendanceUpdate", handleUpdate);

    };

  },[isOpen]);


  if(!isOpen) return null;


  return (

    <div
      className="fixed inset-0 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >

      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
        onClick={(e)=>e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="bg-primary rounded-t-3xl px-6 py-5 relative">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-white nepali-text mb-1">
            आजको उपस्थिति
          </h2>

          <div className="flex items-center gap-2 text-white/90">

            <div
              className={`w-2 h-2 rounded-full ${
                isUpdating ? "bg-green-400" : "bg-yellow-300"
              } animate-pulse`}
            />

            <span className="text-sm">
              लाइभ अपडेट - {currentTime}
            </span>

          </div>

        </div>


        {/* CONTENT */}

        <div className="p-6 space-y-6">

          {/* STUDENTS */}

          <div className="rounded-2xl bg-blue-50 p-5">

            <h3 className="text-lg font-bold text-blue-600 mb-2 nepali-text">
              विद्यार्थी
            </h3>

            <p className="text-3xl font-bold text-blue-700">
              {studentData.rate}%
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3">

              <div className="text-center">
                <p className="font-bold">{studentData.total}</p>
                <p className="text-xs nepali-text">कुल</p>
              </div>

              <div className="text-center">
                <p className="font-bold text-green-600">{studentData.present}</p>
                <p className="text-xs nepali-text">उपस्थित</p>
              </div>

              <div className="text-center">
                <p className="font-bold text-red-600">{studentData.absent}</p>
                <p className="text-xs nepali-text">अनुपस्थित</p>
              </div>

            </div>

          </div>


          {/* TEACHERS */}

          <div className="rounded-2xl bg-green-50 p-5">

            <h3 className="text-lg font-bold text-green-700 mb-2 nepali-text">
              शिक्षक
            </h3>

            <p className="text-3xl font-bold text-green-700">
              {teacherData.rate}%
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3">

              <div className="text-center">
                <p className="font-bold">{teacherData.total}</p>
                <p className="text-xs nepali-text">कुल</p>
              </div>

              <div className="text-center">
                <p className="font-bold text-green-600">{teacherData.present}</p>
                <p className="text-xs nepali-text">उपस्थित</p>
              </div>

              <div className="text-center">
                <p className="font-bold text-red-600">{teacherData.absent}</p>
                <p className="text-xs nepali-text">अनुपस्थित</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
