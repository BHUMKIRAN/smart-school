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
import adminRoutes from "./routes/admin.js";
import initSocket from "./websocket/socket.js";
import { setSocket } from "./controllers/attendanceController.js";
import startCodeGenerator from "./service/CodeAt10.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const port = 8080;

// Initialize Socket.io
const io = initSocket(server);
setSocket(io);

// Start Cron Service
startCodeGenerator();

app.use(cors());
app.use(express.json());

// ✅ Public Auth Routes
app.use("/", authRoutes);

// ✅ Protected Routes
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/notices", noticeRoutes);
app.use("/emergencyNotices", emergencyNoticeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/admin", adminRoutes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
