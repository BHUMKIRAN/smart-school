import Attendance from "../models/teacherAttendance.js";
import AttendanceCode from "../models/attendanceCode.js";

let io;

const setSocket = (socketIO) => {
  io = socketIO;
};

const markAttendance = async (req, res) => {

  const { teacherId, code } = req.body;

  const today = new Date().toISOString().split("T")[0];

  const validCode = await AttendanceCode.findOne({ date: today });

  if (!validCode || validCode.code !== code) {
    return res.status(400).json({
      message: "Invalid Code"
    });
  }

  const attendance = await Attendance.create({
    teacher: teacherId,
    date: today,
    status: "Present"
  });

  const populated = await attendance.populate("teacher");

  // 🔥 LIVE UPDATE
  if (io) {
    io.emit("attendanceMarked", populated);
  }

  res.json({
    message: "Attendance Marked",
    attendance: populated
  });

};

export {
  markAttendance,
  setSocket
};