import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  deadLine: { 
    type: Date, 
    required: true 
  },
  status: {
    type: String,
    default: "",
  }
});

export const ActivityModel = mongoose.model("activities", activitySchema);