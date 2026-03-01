import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  date: String,

  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  },

  timeMarked: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Attendance", attendanceSchema);
