import express from "express";
import { addActivity, getActivities, updateStatus } from "../controllers/activity";
const activityRouter = express.Router();

activityRouter.post("/addActivity", addActivity);
activityRouter.get("/getActivities",getActivities);
activityRouter.put("/updateStatus", updateStatus);

export default activityRouter;