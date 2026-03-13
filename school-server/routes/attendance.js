import express from "express";
import {
  markSelfAttendance,
  markStudentAttendance,
  getTodayAttendance,
} from "../controllers/attendance.js";

const router = express.Router();

router.post("/teacherAttendance", markSelfAttendance);        // Teacher marks self
router.post("/studentAttendance", markStudentAttendance);  // Teacher marks students
router.get("/teacher/today", (req, res) => getTodayAttendance(req, res));

export default router;