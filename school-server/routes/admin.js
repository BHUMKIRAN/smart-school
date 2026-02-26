import express from "express";
import {
  getTodayCode,
  getTodayAttendance
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/code", getTodayCode);

router.get("/attendance", getTodayAttendance);

export default router;