// school-server/routes/schedule.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createSchedule,
  getTeacherSchedule,
} from "../controllers/schedule.js";

const router = Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save all files to public/uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Optional: accept only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ----------------------------
// Routes
// ----------------------------

// Admin uploads PDF schedule
router.post("/schedule", upload.single("pdf"), createSchedule);

// Teacher fetches schedules
router.get("/teacher/:teacherId", getTeacherSchedule);

export default router;