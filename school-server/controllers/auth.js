import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ===============================
// 🔹 REGISTER USER (Admin Creates)
// ===============================
const register = async (req, res) => {
  try {
    // Get data sent from frontend
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ",
      });
    }

    // Hash password before saving
    // bcrypt.hash(password, saltRounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
      role,
    });

    res.status(201).json({
      message: "User created successfully ",
      user: newUser,
      //    {
      //     id: newUser._id,
      //     name: newUser.name,
      //     email: newUser.email,
      //     role: newUser.role,
      //   },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error ",
      error: error.message,
    });
  }
};

// ===============================
// 🔹 LOGIN USER
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email ",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid  password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token valid for 7 days
      },
    );

    res.json({
      message: "Login successful ",
      token,
      user: user,
      //   {
      //     id: user._id,
      //     name: user.name,
      //     email: user.email,
      //     role: user.role,
      //   },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error ",
      error: error.message,
    });
  }
};

export { login, register };
