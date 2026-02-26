import AttendanceCode from "../models/attendanceCode.js";
import Attendance from "../models/teacherAttendance.js";

const getTodayCode = async (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  const code = await AttendanceCode.findOne({ date: today });

  res.json(code);
};

const getTodayAttendance = async (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.find({ date: today })
    .populate("teacher");

  res.json(attendance);
};

export {
  getTodayCode,
  getTodayAttendance
};