import mongoose from "mongoose";

export const connectDB = async()=>{
    mongoose.connect("mongodb://localhost:27017")
        .then(()=>{console.log("DB connected")})
        .catch((e)=>{console.log(e)});
}