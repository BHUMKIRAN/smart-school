import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
{
  name: String,
  email: String,
  password: String,

  grade: String,

  attendance: {
    type: Number,
    default: 0
  },

  gpa: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["Active","New","Pending"],
    default: "Active"
  }
},
{ timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
