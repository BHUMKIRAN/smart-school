import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import dns from "dns";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import noticeRoutes from "./routes/notice.js";
import emergencyNoticeRoutes from "./routes/emergencyNotice.js";
import attendanceRoutes from "./routes/attendance.js";
import attendanceCodeRoutes from "./routes/attendanceCode.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";
import scheduleRoutes from "./routes/schedule.js";
import assigmentRoutes from "./routes/assigment.js";
import submissionRoutes from "./routes/submission.js";
import applicationRoutes from "./routes/application.js";
import gradeRoutes from "./routes/grade.js";

import { protect } from "./middleware/authMiddleware.js";

import initSocket from "./websocket/socket.js";
import startCodeGenerator from "./service/CodeAt10.js";

// Force known DNS servers for SRV lookups (Atlas)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

initSocket(server);

startCodeGenerator();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://smart-school-pearl.vercel.app"],

    credentials: true,
  }),
);

app.use(express.json());

// Static files
app.use("/uploads", express.static("public/uploads"));

// Health check / root
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "smart-school-api" });
});

//test middleware
app.use("/test", protect, (req, res) => {
  res.status(200).json({ message: "protected route is running " });
});

/* -------------------------
   ROUTES
------------------------- */

app.use("/", authRoutes);

app.use("/public", protect, publicRoutes);

app.use("/students", protect, studentRoutes);

app.use("/teachers", protect, teacherRoutes);

app.use("/notices", noticeRoutes);

app.use("/emergencyNotices", emergencyNoticeRoutes);

app.use("/attendance",  attendanceRoutes);

app.use("/attendanceCode", protect, attendanceCodeRoutes);

app.use("/attendanceTeacher", protect, adminRoutes);

app.use("/schedule", protect, scheduleRoutes);

app.use("/applications", protect, applicationRoutes);

app.use("/grades", protect, gradeRoutes);

app.use("/assignments", protect, assigmentRoutes);

app.use("/submissions", protect, submissionRoutes);

/* -------------------------
   SERVER START
------------------------- */

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
