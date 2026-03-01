import express from "express";
import { getSchoolPageContent } from "../controllers/publicContent.js";

const router = express.Router();

router.get("/school-page", getSchoolPageContent);

export default router;
