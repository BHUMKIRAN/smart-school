import Attendance from "../models/attendance.js";
import AttendanceCode from "../models/attendanceCode.js";
import generateCode from "../utils/CodeGenerator.js";

const getTodayDate = () => new Date().toISOString().split("T")[0];

export const getTodayCode = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    let code = await AttendanceCode.findOne({ date: today });

    if (!code) {
      code = await AttendanceCode.create({
        code: generateCode(),
        date: today,
      });
    }

    res.status(200).json(code);

  } catch (err) {
    console.error("GetTodayCode Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const markTeacherAttendanceByAdmin = async (req, res) => {
  try {
    const { teacherId, status } = req.body;
    if (!teacherId) return res.status(400).json({ message: "teacherId required" });

    const today = getTodayDate();
    const existing = await Attendance.findOne({ user: teacherId, date: today });
    if (existing)
      return res.status(409).json({ message: "Attendance already marked", attendance: existing });

    const attendance = await Attendance.create({
      user: teacherId,
      userModel: "Teacher",
      date: today,
      status: status || "Present",
    });

    const populated = await attendance.populate("user");

    res.status(201).json({ message: "Teacher attendance marked by admin", attendance: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const markSelfAttendance = async (req, res) => {
  try {
    const { teacherId, status, code } = req.body;
    if (!teacherId) return res.status(400).json({ message: "teacherId required" });

    const today = getTodayDate();

    // Check if already marked
    const existing = await Attendance.findOne({ user: teacherId, date: today });
    if (existing)
      return res.status(409).json({ message: "Attendance already marked", attendance: existing });

    // Fetch today's attendance code
    const todayCode = await AttendanceCode.findOne({ date: today });
    if (!todayCode || todayCode.code !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const attendance = await Attendance.create({
      user: teacherId,
      userModel: "Teacher",
      date: today,
      status: status || "Present",
    });

    const populated = await attendance.populate("user");

    res.status(201).json({ message: "Teacher self-attendance marked", attendance: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const markStudentAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    if (!studentId) return res.status(400).json({ message: "studentId required" });

    const today = getTodayDate();
    const existing = await Attendance.findOne({ user: studentId, date: today });
    if (existing)
      return res.status(409).json({ message: "Attendance already marked", attendance: existing });

    const attendance = await Attendance.create({
      user: studentId,
      userModel: "Student",
      date: today,
      status: status || "Present",
    });

    const populated = await attendance.populate("user");

    res.status(201).json({ message: "Student attendance marked by teacher", attendance: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getTodayAttendance = async (req, res) => {
  try {
    const today = getTodayDate();
    const { role } = req.query; // optional: "Teacher" or "Student"

    const query = { date: today };
    if (role) query.userModel = role;

    const attendance = await Attendance.find(query).populate("user");
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};