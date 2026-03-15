// school-server/routes/schedule.js
import { Router } from "express";
import { createSchedule, getTeacherSchedule } from "../controllers/schedule.js";
import { uploadSchedule } from "../middleware/upload.js";

const router = Router();

router.post("/schedule", uploadSchedule.single("file"), createSchedule);
router.get("/teacher/:teacherId", getTeacherSchedule);

export default router;
