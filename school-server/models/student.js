import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: String,
    rollNumber: String,
    email: String,
    phone: String,
    class: String,
    section: String,
    address: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
