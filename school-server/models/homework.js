import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema({
  title: String,
  description: String,

  subject: String,

  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  dueDate: Date,
});

export default mongoose.model("Homework", homeworkSchema);