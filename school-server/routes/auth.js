import express from "express";
import { login } from "../controllers/auth.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/auth/login", login);
export default router;
