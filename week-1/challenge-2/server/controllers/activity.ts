import { Request, Response } from "express";
import { ActivityModel } from "../models/activityData";
import { ActivityDataSchema } from "../utils/zodSchema";


export const addActivity = async (req: Request, res: Response) => {
  try {
    const { name, deadLine } = req.body;
    const activity = await ActivityModel.create({ name, deadLine });
    return res.json({ msg: "Activity added successfully" });
  } 
  catch (error: any) {
    // If validation fails, return error message
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.json({ msg: message });
    }
    // For any other errors, print "Internal Server Error"
    console.error(error); // Log the error for debugging purposes
    return res.json({ msg: "Internal Server Error" });
  }
};

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find();
    return res.json(activities);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server Error");
  }
};


export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { activityId, status } = req.body;

    // Find the activity by its ID
    const activity = await ActivityModel.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Update the status
    activity.status = status;

    // Save the updated activity
    await activity.save();

    res.json({ message: 'Activity status updated successfully' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};