import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    remark: {
      type: String,
    },

    grade: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["submitted", "checked"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);