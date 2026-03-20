import { resetPassword } from "../controllers/resetPassword.js";
import { forgetPassword } from "../controllers/forgetPassword.js";
import { Router } from "express" ;

const router= Router();

router.post("/forget", forgetPassword);
router.put("/reset/:token", resetPassword);

export default router;
