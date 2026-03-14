import express from "express";
import {
  markSelfAttendance,
  markStudentAttendance,
  getTodayAttendance,
  getStudentAttendance,
} from "../controllers/attendance.js";

const router = express.Router();

// Teacher marks self attendance using code
router.post("/teacherAttendance", markSelfAttendance);

// Teacher marks student attendance
router.post("/student/mark", markStudentAttendance);

// Get today's attendance (optional query ?role=Teacher or ?role=Student)
router.get("/today", getTodayAttendance);

// Toggle student attendance (Present ↔ Absent)
router.patch("/student/toggle/:studentId", markStudentAttendance);

// Get student attendance by grade/class
router.get("/student/class/:gradeId", getStudentAttendance);

export default router;