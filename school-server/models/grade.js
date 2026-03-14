import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true, // e.g., 10
    },

    section: {
      type: String,
      required: false, // optional section
    },

    subjects: [
      {
        name: String,
        teacher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
      },
    ],

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Grade", gradeSchema);