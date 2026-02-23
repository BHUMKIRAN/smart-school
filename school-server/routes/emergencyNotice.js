import { Router } from "express";
import { createEmergencyNotice, deleteEmergencyNotice , getAllEmergencyNotices} from "../controllers/emergencyNotice.js";

const router = Router();


// GET all notices
router.get("/", getAllEmergencyNotices);

// POST a new notice
router.post("/", createEmergencyNotice);

// DELETE a notice by id
router.delete("/:id", deleteEmergencyNotice);

export default router;