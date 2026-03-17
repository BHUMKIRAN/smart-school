import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;

    // Select model based on role
    if (role === "student") {
      // Populate the 'grade' field to get full grade object
      user = await Student.findOne({ email }).populate("grade");
      
    } else if (role === "teacher") {
      user = await Teacher.findOne({ email });

    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Respond with user info including populated grade
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role,
        grade: user.grade, // This now contains the full grade object (id, name, section)
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { login };
