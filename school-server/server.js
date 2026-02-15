import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import protect from "./middleware/auth.js";
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
app.use("/students", protect , studentRoutes);
app.use("/teachers", protect , teacherRoutes);
app.use("/api/auth", protect ,authRoutes);

// 5️⃣ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
