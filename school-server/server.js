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
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Static files
app.use("/uploads", express.static("public/uploads"));

/* -------------------------
   ROUTES
------------------------- */

app.use("/", authRoutes);

app.use("/public", publicRoutes);

app.use("/students", studentRoutes);

app.use("/teachers", teacherRoutes);

app.use("/notices", noticeRoutes);

app.use("/emergencyNotices", emergencyNoticeRoutes);

app.use("/attendance", attendanceRoutes);

app.use("/attendanceCode", attendanceCodeRoutes);

app.use("/attendanceTeacher", adminRoutes);

app.use("/schedule", scheduleRoutes);

app.use("/applications", applicationRoutes);

app.use("/grades", gradeRoutes);

// Support both spellings
app.use("/assignments", assigmentRoutes);
app.use("/assigments", assigmentRoutes);

app.use("/submissions", submissionRoutes);

/* -------------------------
   SERVER START
------------------------- */

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
