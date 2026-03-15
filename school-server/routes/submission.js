import { Router } from "express";
import {
  submitAssignment,
  getSubmissionsByAssignment,
  getStudentSubmissions,
  updateSubmissionStatus,
} from "../controllers/submission.js";

import { uploadSubmission } from "../middleware/upload.js";

const router = Router();

router.post("/", uploadSubmission.single("file"), submitAssignment);

router.get("/assignment/:assignmentId", getSubmissionsByAssignment);

router.get("/student/:studentId", getStudentSubmissions);

router.put("/:id", updateSubmissionStatus);

export default router;
