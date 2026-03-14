// school-server/routes/schedule.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  createSchedule,
  getTeacherSchedule,
  assignHomework,
  submitHomework,
} from "../controllers/scheduleHomework.js";

const router = Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ----------------------------
// Multer Storage
// ----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ----------------------------
// Schedule Routes
// ----------------------------
router.post("/schedule", upload.single("pdf"), createSchedule);
router.get("/teacher/:teacherId", getTeacherSchedule);

// ----------------------------
// Homework Routes
// ----------------------------
router.post("/homework/:classId", upload.single("file"), assignHomework);
router.post("/homework/submission/:classId/:homeworkId", upload.single("file"), submitHomework);

export default router;