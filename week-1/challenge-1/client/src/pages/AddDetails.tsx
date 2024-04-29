import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface StudentData {
 image: string;
 name: string;
 rollNo: number;
 collegeName: string;
}

export const AddDetails = () => {
 const [studentData, setStudentData] = useState<StudentData>({
   image: "",
   name: "",
   rollNo: 0,
   collegeName: "",
 });
 
 const navigate = useNavigate();

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   transformFile(file!);
 };

 const transformFile = (file: File | null) => {
   const reader = new FileReader();
   if (file) {
     reader.readAsDataURL(file);
     reader.onloadend = () => {
       setStudentData({ 
        ...studentData,
        image: reader.result as string
       })
       
     };
   } else {
    setStudentData({ 
      ...studentData,
      image: ""
     })
   }
 };

 const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
   try {
     const response = await axios.post("http://localhost:8080/addInfo", {
       image: studentData.image, 
       name: studentData.name,
       rollNo: studentData.rollNo,
       collegeName: studentData.collegeName,
     });
     alert(response.data.msg);
   } catch (e) {
     console.log(e);
   }
 };

 return (
   <div>
     <form className="max-w-sm mx-auto mt-32">
      <p className="font-bold text-3xl mb-6">
        Enter Your Details
      </p>
       <div className="mb-5">
         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
           Upload Image
         </label>
         <input
           type="file"
           onChange={handleImageChange}
           accept="image/*"
         />
       </div>
       <div className="mb-5">
         <label className="block mb-2 text-sm font-medium text-gray-900">
           Name
         </label>
         <input
           id="text"
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
           onChange={(e) => {
             setStudentData({ ...studentData, name: e.target.value });
           }}
         />
       </div>
       <div className="mb-5">
         <label className="block mb-2 text-sm font-medium text-gray-900">
           Roll No.
         </label>
         <input
           type="number"
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
           onChange={(e) => {
             setStudentData({ ...studentData, rollNo: parseInt(e.target.value) });
           }}
         />
       </div>

       <div className="mb-5">
         <label className="block mb-2 text-sm font-medium text-gray-900">
           College Name
         </label>
         <input
           id="text"
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
           onChange={(e) => {
             setStudentData({ ...studentData, collegeName: e.target.value });
           }}
         />
       </div>
       <button
         type="submit"
         onClick={onClickHandler}
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       >
         Submit
       </button>
       <br />
       <br />
       <br />
       <button
         type="submit"
         onClick={() => {
           navigate("/getData");
         }}
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       >
         Student Details
       </button>
     </form>
   </div>
 );
};