import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ActivityData {
  name: string;
  deadLine: Date; 
}

export const AddActivity = () => {
  const [activityData, setActivityData] = useState<ActivityData>({
    name: "",
    deadLine: new Date(0), 
  });
  const navigate = useNavigate();

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/addActivity", {
        name: activityData.name,
        deadLine: activityData.deadLine,
      });
      alert(response.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className="max-w-sm mx-auto mt-32">
        <p className="font-bold text-3xl mb-6"> Enter Your Details </p>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              setActivityData({ ...activityData, name: e.target.value });
            }}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            DeadLine
          </label>
          <input
            id="text"
            type="date" // Use the date input type
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              const dateString = e.target.value;
              const date = dateString ? new Date(dateString) : new Date(0);
              setActivityData({ ...activityData, deadLine: date });
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
            navigate("/getActivities");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Activity Details
        </button>
      </form>
     
    </div>
  );
};