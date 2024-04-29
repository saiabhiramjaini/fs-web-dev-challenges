import express from "express";
import cors from 'cors';
import { connectDB } from "./db/connect";
import activityRouter from "./routes/activity";
const app = express();
require("dotenv").config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(activityRouter);

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})