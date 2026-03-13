import express from "express";
import {
  createTeachers,
  readTeachers,
  readTeacherById,
  editTeacherById,
  deleteTeacherById,
} from "../controllers/teacher.js";

const router = express.Router();

router.post("/", createTeachers);

router.get("/", readTeachers);

router.get("/:id", readTeacherById);

router.put("/:id", editTeacherById);

router.delete("/:id", deleteTeacherById);

export default router;
