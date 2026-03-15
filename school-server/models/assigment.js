import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    subject: {
      type: String,
    },

    fileUrl: {
      type: String, // pdf or document uploaded
    },

    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);