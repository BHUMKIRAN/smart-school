import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      required: true, // must store hashed password
    },
    phone: String,
    subject: String,
    department: String,
    salary: Number,
    image: String,
    grades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
