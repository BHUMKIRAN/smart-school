import { Router } from "express";
import {
  createGrade,
  getAllGrades,
  getGradeById,
} from "../controllers/grade.js";

const router = Router();

// GET all grades
router.get("/", getAllGrades);

// GET grade by ID
router.get("/:id", getGradeById);

router.post("/", createGrade);

export default router;
