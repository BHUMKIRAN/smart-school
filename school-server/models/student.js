import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
    image: String,
  },
  { timestamps: true },
);
const Student = mongoose.model("Student", studentSchema);
export default Student;
