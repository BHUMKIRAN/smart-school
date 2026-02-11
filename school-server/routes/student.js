import { Router } from "express";
import {
  createStudents,
  deleteStudentById,
  editStudentById,
  readStudentById,
  readStudents,
} from "../controllers/student.js";

const router = Router();

// CREATE
router.post("/", createStudents);

// READ ALL
router.get("/", readStudents);

// READ ONE
router.get("/:id", readStudentById);

// UPDATE
router.put("/:id", editStudentById);

// DELETE
router.delete("/:id", deleteStudentById);

export default router;
