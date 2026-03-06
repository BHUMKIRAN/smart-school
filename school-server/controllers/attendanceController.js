import Attendance from "../models/teacherAttendance.js";
import AttendanceCode from "../models/attendanceCode.js";

let ioInstance = null;

// Set socket instance safely
export const setSocket = (socketIO) => {
  ioInstance = socketIO;
};

// Utility: Get today's date in YYYY-MM-DD (safe format)
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// -----------------------------
// ADMIN MARK ATTENDANCE
// -----------------------------
export const markAttendanceByAdmin = async (teacherId, status) => {
  if (!teacherId || !status) {
    throw new Error("teacherId and status are required");
  }

  const today = getTodayDate();

  const existing = await Attendance.findOne({
    teacher: teacherId,
    date: today,
  });

  if (existing) {
    return existing; // Prevent duplicate
  }

  const attendance = await Attendance.create({
    teacher: teacherId,
    date: today,
    status,
  });

  const populated = await attendance.populate("teacher");

  if (ioInstance) {
    ioInstance.emit("attendanceMarked", populated);
  }

  return populated;
};

// -----------------------------
// TEACHER MARK ATTENDANCE
// -----------------------------
export const markAttendance = async (req, res) => {
  try {
    const { teacherId, code } = req.body;

    if (!teacherId) {
      return res.status(400).json({
        message: "teacherId is required",
      });
    }

    const today = getTodayDate();

    // Validate attendance code if provided
    if (code) {
      const validCode = await AttendanceCode.findOne({ date: today });

      if (!validCode || validCode.code !== code) {
        return res.status(400).json({
          message: "Invalid attendance code",
        });
      }
    }

    // Check if already marked
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

    // Emit real-time update
    if (ioInstance) {
      ioInstance.emit("attendanceMarked", populated);
    }

    return res.status(201).json({
      message: "Attendance marked successfully",
      attendance: populated,
    });

  } catch (error) {
    console.error("Mark Attendance Error:", error);

    return res.status(500).json({
      message: "Server error while marking attendance",
      error: error.message,
    });
  }
};