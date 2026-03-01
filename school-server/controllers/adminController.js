import AttendanceCode from "../models/attendanceCode.js";
import Attendance from "../models/teacherAttendance.js";
import generateCode from "../utils/CodeGenerator.js";

const getTodayCode = async (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  let code = await AttendanceCode.findOne({ date: today });

  if (!code) {
    code = await AttendanceCode.create({
      code: generateCode(),
      date: today
    });
  }

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
