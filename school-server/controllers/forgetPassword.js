import crypto from "crypto";
import nodemailer from "nodemailer";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Admin from "../models/admin.js";

export const forgetPassword = async (req, res) => {
  const { email, role } = req.body;

  try {
    // 1. Determine which model to use
    let Model;
    if (role === "admin") Model = Admin;
    else if (role === "student") Model = Student;
    else if (role === "teacher") Model = Teacher;
    else return res.status(400).json({ message: "Invalid role provided" });

    // 2. Find user
    const user = await Model.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    // 3. Generate Tokens
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");

    // Token expires in 15 minutes
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    // 4. Update user record
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // 5. Send Email
    const clientBaseUrl = (process.env.CLIENT_URL);
    const resetUrl = `${clientBaseUrl}/reset-password/${resetPasswordToken}?role=${encodeURIComponent(role)}`;

    const emailUser = process.env.EMAIL;
    const emailPass = process.env.PASSWORD;

    if (!emailUser || !emailPass) {
      return res.status(500).json({ message: "Email credentials are not configured on the server" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click this link: ${resetUrl}`,
    });

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
