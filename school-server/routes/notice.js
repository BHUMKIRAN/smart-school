import { Router } from "express";
import { createNotice, readNotice, deleteNotice, getAllNotices } from "../controllers/notices.js";

const router = Router();

// GET all notices
router.get("/", getAllNotices);

// GET single notice by id
router.get("/:id", readNotice);

// POST a new notice
router.post("/", createNotice);

// DELETE a notice by id
router.delete("/:id", deleteNotice);

export default router;