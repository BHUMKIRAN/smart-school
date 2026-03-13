
import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  pdfUrl: { type: String, required: true }, // Store path to PDF
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);