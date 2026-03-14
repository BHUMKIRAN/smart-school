import { Router } from "express";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
} from "../controllers/application.js";

const router = Router();


// Student submits application
router.post("/", createApplication);


// Admin gets all applications
router.get("/", getApplications);


// Admin updates status
router.put("/:id/status", updateApplicationStatus);


export default router;