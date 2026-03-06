import express from "express";
import {
  markAttendance,
  markAttendanceByAdmin
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/attendance/teachers", markAttendance);
router.post("/attendance/teachersAdmin", markAttendanceByAdmin);
export default router;