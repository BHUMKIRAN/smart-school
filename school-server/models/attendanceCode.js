import mongoose from "mongoose";

const attendanceCodeSchema = new mongoose.Schema({
  code: String,

  date: {
    type: String,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("AttendanceCode", attendanceCodeSchema);