import express from "express";
import cors from 'cors';
import { connectDB } from "./db/connect";
import studentRouter from "./routes/student";
const app = express();
require("dotenv").config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(studentRouter);

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})