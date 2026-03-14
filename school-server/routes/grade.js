import { Router } from "express";
import {
  createGrade,
  getAllGrades,
  getGradeById,
  getStudentsByTeacher,
} from "../controllers/grade.js";

const router = Router();

// GET all grades
router.get("/", getAllGrades);

// GET students by teacher (must be before :id)
router.get("/teacher/:teacherId/students", getStudentsByTeacher);

// GET grade by ID
router.get("/:id", getGradeById);

router.post("/", createGrade);

export default router;
