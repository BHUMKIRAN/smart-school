import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";

// 1️⃣ Load env variables first
dotenv.config();

// 2️⃣ Connect DB
connectDB(); 

const app = express();
const port = 8080;

// 3️⃣ Middleware
app.use(cors());          // Allow frontend requests
app.use(express.json());  // Parse JSON body

// 4️⃣ Routes
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/api/auth", authRoutes);

// 5️⃣ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
