import { Router } from "express";
import {
  createAssignment,
  getAssignmentsByGrade,
  getAllAssignments,
  deleteAssignment,
} from "../controllers/assigment.js";
import { uploadAssignment } from "../middleware/upload.js";

const router = Router();

router.post("/", uploadAssignment.single("file"), createAssignment);
router.get("/", getAllAssignments);
router.get("/grade/:gradeId", getAssignmentsByGrade);
router.delete("/:id", deleteAssignment);

export default router;
