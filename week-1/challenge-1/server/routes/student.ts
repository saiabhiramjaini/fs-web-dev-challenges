import express from "express";
import { addData, getData } from "../controllers/student";
const studentRouter = express.Router();

studentRouter.post("/addInfo", addData);
studentRouter.get("/getInfo",getData);

export default studentRouter;