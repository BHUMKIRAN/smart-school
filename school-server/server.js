import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
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
import scheduleRoutes from "./routes/scheduleHomewok.js";
import applicationRoutes from "./routes/application.js";
import gradeRoutes from "./routes/grade.js";
import initSocket from "./websocket/socket.js";
import startCodeGenerator from "./service/CodeAt10.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const port = 8080;

// Initialize Socket.io
initSocket(server);

// Start Cron Service
startCodeGenerator();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
  }),
);
app.use(express.json());

app.use("/", authRoutes);
app.use("/public", publicRoutes);
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/notices", noticeRoutes);
app.use("/emergencyNotices", emergencyNoticeRoutes);
app.use("/", attendanceRoutes);
app.use("/attendanceTeacher", adminRoutes);
app.use("/", adminRoutes);
app.use("/schedule",scheduleRoutes)
app.use("/applications", applicationRoutes);
app.use("/", attendanceCodeRoutes);
app.use("/grades", gradeRoutes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
