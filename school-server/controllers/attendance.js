import Attendance from "../models/attendance.js";
import AttendanceCode from "../models/attendanceCode.js";
import generateCode from "../utils/CodeGenerator.js";
import Student from "../models/student.js";
import getNepalDateString from "../utils/attendanceDate.js";
import { getIO } from "../websocket/socket.js";

const getTodayDate = () => getNepalDateString();


// GET TODAY CODE
export const getTodayCode = async (req, res) => {
  try {
    const today = getTodayDate();

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

// ADMIN MARK TEACHER ATTENDANCE
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

    // 🔥 Emit event
    const io = getIO();
    io.emit("attendanceUpdate", {
      type: "teacher",
      attendance: populated,
    });

    res.status(201).json({
      message: "Teacher attendance marked",
      attendance: populated,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// TEACHER SELF ATTENDANCE
export const markSelfAttendance = async (req, res) => {
  try {
    const { teacherId, code } = req.body;

    if (!teacherId) return res.status(400).json({ message: "teacherId required" });

    const today = getTodayDate();

    const existing = await Attendance.findOne({ user: teacherId, date: today });

    if (existing)
      return res.status(409).json({ message: "Attendance already marked" });

    const todayCode = await AttendanceCode.findOne({ date: today });

    if (!todayCode || todayCode.code !== code) {
      return res.status(400).json({ message: "Invalid attendance code" });
    }

    const attendance = await Attendance.create({
      user: teacherId,
      userModel: "Teacher",
      date: today,
      status: "Present",
    });

    const populated = await attendance.populate("user");

    // 🔥 Emit event
    const io = getIO();
    io.emit("attendanceUpdate", {
      type: "teacher",
      attendance: populated,
    });

    res.status(201).json({
      message: "Self attendance marked",
      attendance: populated,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// MARK STUDENT ATTENDANCE
export const markStudentAttendance = async (req, res) => {
  try {
    const { gradeId, attendance } = req.body;

    if (!attendance || !Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({ message: "Attendance array required" });
    }

    const today = getTodayDate();
    const studentIds = attendance.map((record) => record.studentId);

    const alreadyMarked = await Attendance.find({
      userModel: "Student",
      user: { $in: studentIds },
      date: today,
    }).select("_id user");

    if (alreadyMarked.length > 0) {
      return res.status(409).json({
        message: "Attendance already marked for today",
        alreadyMarked: alreadyMarked.map((a) => a.user),
      });
    }

    const operations = await Promise.all(
      attendance.map(async (record) => {
        const student = await Student.findById(record.studentId);

        if (!student) {
          throw new Error(`Student not found: ${record.studentId}`);
        }

        const studentGrade = student.grade || gradeId;

        if (!studentGrade) {
          throw new Error(`Grade missing for student: ${record.studentId}`);
        }

        return {
          updateOne: {
            filter: {
              user: record.studentId,
              date: today,
            },
            update: {
              user: record.studentId,
              userModel: "Student",
              grade: studentGrade,
              date: today,
              status: record.status || "Absent",
            },
            upsert: true,
          },
        };
      })
    );

    await Attendance.bulkWrite(operations);

    // 🔥 Emit event
    const io = getIO();
    io.emit("attendanceUpdate", {
      type: "student",
      grade: gradeId,
      totalMarked: operations.length,
      attendance,
    });

    res.status(200).json({
      message: "Class attendance saved successfully",
      totalMarked: operations.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET TODAY ATTENDANCE
export const getTodayAttendance = async (req, res) => {
  try {
    const today = getTodayDate();
    const { role, grade } = req.query;

    const query = { date: today };

    if (role) query.userModel = role;
    if (grade) query.grade = grade;

    const attendance = await Attendance.find(query)
      .populate("user")
      .populate("grade");

    res.status(200).json(attendance);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// GET STUDENT ATTENDANCE BY GRADE
export const getStudentAttendance = async (req, res) => {
  try {
    const { gradeId } = req.params;

    const today = getTodayDate();

    const attendance = await Attendance.find({
      userModel: "Student",
      grade: gradeId,
      date: today,
    }).populate("user");

    res.json(attendance);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};