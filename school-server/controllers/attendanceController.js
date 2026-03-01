import Attendance from "../models/teacherAttendance.js";
import AttendanceCode from "../models/attendanceCode.js";

let io;

const setSocket = (socketIO) => {
  io = socketIO;
};

const markAttendance = async (req, res) => {
  try {
    const { teacherId, code } = req.body;

    if (!teacherId) {
      return res.status(400).json({
        message: "teacherId is required",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    // Code is optional. If provided, validate against today's code.
    if (code) {
      const validCode = await AttendanceCode.findOne({ date: today });

      if (!validCode || validCode.code !== code) {
        return res.status(400).json({
          message: "Invalid Code",
        });
      }
    }

    const existing = await Attendance.findOne({
      teacher: teacherId,
      date: today,
    });

    if (existing) {
      return res.status(409).json({
        message: "Attendance already marked for today",
        attendance: existing,
      });
    }

    const attendance = await Attendance.create({
      teacher: teacherId,
      date: today,
      status: "Present",
    });

    const populated = await attendance.populate("teacher");

    if (io) {
      io.emit("attendanceMarked", populated);
    }

    return res.json({
      message: "Attendance Marked",
      attendance: populated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while marking attendance",
      error: error.message,
    });
  }
};

export {
  markAttendance,
  setSocket,
};
