import express from "express";
import {
  getTodayCode,
  getTodayAttendance,
  markTeacherAttendanceByAdmin
} from "../controllers/attendance.js";

const router = express.Router();


router.get("/code", getTodayCode);
router.get("/", getTodayAttendance);
router.post("/", markTeacherAttendanceByAdmin);

export default router;