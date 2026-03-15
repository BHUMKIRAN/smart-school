import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folders exist
const assignmentDir = "public/uploads/assignments";
const submissionDir = "public/uploads/submissions";
const scheduleDir = "public/uploads/schedule";

if (!fs.existsSync(assignmentDir)) fs.mkdirSync(assignmentDir, { recursive: true });
if (!fs.existsSync(submissionDir)) fs.mkdirSync(submissionDir, { recursive: true });
if (!fs.existsSync(scheduleDir)) fs.mkdirSync(scheduleDir, { recursive: true });

// Assignment storage
const assignmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, assignmentDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Submission storage
const submissionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, submissionDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Schedule storage
const scheduleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, scheduleDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Allow only PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

export const uploadAssignment = multer({
  storage: assignmentStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export const uploadSubmission = multer({
  storage: submissionStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadSchedule = multer({
  storage: scheduleStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});