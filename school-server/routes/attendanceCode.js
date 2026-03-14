import { Router } from "express";
import { getTodayAttendanceCode } from "../controllers/attendanceCode.js";

const router = Router();

// Get today's attendance code
router.get("/code", getTodayAttendanceCode);

export default router;