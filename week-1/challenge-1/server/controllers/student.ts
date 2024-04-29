import { Request, Response } from "express";
import { StudentModel } from "../models/studentData";
import { StudentDataSchema } from "../utils/zodSchema";

export const addData= async(req: Request,res:Response)=>{
    try{
        const {image, name, rollNo, collegeName} = StudentDataSchema.parse(req.body);

        const checkRollNo = await StudentModel.findOne({rollNo});
        if(checkRollNo){
            return res.json({msg: "Student roll no. already exists"});
        }

        const response = await StudentModel.create({
            image,
            name,
            rollNo,
            collegeName
        })
        return res.status(200).json({msg: "Details added successfully"});
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
}

export const getData= async(req: Request,res:Response)=>{
    try{
        const data = await StudentModel.find({});
        return res.status(200).json(data);
    }
    catch(e){
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
}
