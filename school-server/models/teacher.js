import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    department: String,
    salary: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
