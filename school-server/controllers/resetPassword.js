import Admin from "../models/admin.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

import crypto from "crypto";
import bcrypt from "bcryptjs";


export const resetPassword = async (req, res) => {
    const { token } = req.params; // Token from URL
    const { password } = req.body; // New password and role from form
    const { role } = req.query; // Role from URL
    try {
        if (!password || typeof password !== "string" || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const roleKey = Array.isArray(role) ? role[0] : role;
        if (!roleKey || typeof roleKey !== "string") {
            return res.status(400).json({ message: "Invalid role provided" });
        }

        // 1. Hash the token from the URL to compare with the DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // 2. Determine Model
       const model ={
        admin: Admin,
        student: Student,
        teacher: Teacher
       }

       const selectedModel = model[roleKey];
       if (!selectedModel) {
        return res.status(400).json({ message: "Invalid role provided" });
       }
       const Model = selectedModel;

        // 3. Find user with valid token and check expiry
        const user = await Model.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() } // Token must be greater than "now"
        });

        if (!user) {
            return res.status(400).json({ message: "Token is invalid or has expired" });
        }

        // 4. Update Password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
