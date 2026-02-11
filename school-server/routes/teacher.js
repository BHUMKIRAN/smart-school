import express from "express";
import { createTeacher, deleteTeacher, editTeacher, readTeacher, readTeachers } from "../controllers/teacher.js";

const router = express.Router();

router.post("/", createTeacher );

router.get("/", readTeachers);

router.get("/:id", readTeacher);

router.put("/:id", editTeacher);

router.delete("/:id", deleteTeacher);

export default router;
