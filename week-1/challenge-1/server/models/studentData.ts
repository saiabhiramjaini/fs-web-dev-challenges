import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  rollNo: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  collegeName: {
    type: String,
    required: true,
  }
});

export const StudentModel = mongoose.model("students", studentSchema);