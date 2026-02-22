import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import noticeRoutes from "./routes/notice.js";

dotenv.config();
connectDB();

const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE']
}));

app.use(express.json());

// ✅ Public Auth Routes
app.use("/", authRoutes);

// ✅ Protected Routes
app.use("/students", studentRoutes);
app.use("/teachers",  teacherRoutes);
app.use("/notices", noticeRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
