import axios from "axios";
import { useEffect, useState } from "react";
import { DropDown } from "../components/DropDown";

interface ActivityData {
  _id: string;
  name: string;
  deadLine: string;
  status?: string;
}

export const GetActivities = () => {
  const [activity, setActivity] = useState<ActivityData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getActivities");
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };
    fetchData();
  }, [activity]);

  const updateActivityStatus = async (activityId: string, status: string) => {
    try {
      const response = await axios.put("http://localhost:8080/updateStatus", {
        activityId,
        status,
      });
      alert(response.data.message);
      console.log(response.data.message);
      // You can also update the local state here to reflect the status change
    } catch (error) {
      console.error("Error updating activity status:", error);
    }
  };

  function getBackgroundColor(status: any) {
    switch (status) {
      case "select":
        return "bg-yellow-200 text-yellow-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      case "in progress":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  }

  const compareDates = (givenDate: Date) => {
    if (givenDate) {
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - givenDate.getTime();

      if (timeDifference < 0) {
        return "in progress";
      } else {
        return "pending";
      }
    }
    return "";
  };

  return (
    <div>
      {activity ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 text-gray-900">
                  S.no.
                </th>
                <th className="px-6 py-4 text-gray-900">Name</th>
                <th className="px-6 py-4 text-gray-900">DeadLine</th>
                <th className="px-6 py-4 text-gray-900">Status</th>
                <th className="px-6 py-4 text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((activity, index) => {
                const deadlineDate = new Date(activity.deadLine);
                const activityStatus = compareDates(deadlineDate);
                return (
                  <tr key={index} className="bg-white border-b ">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{activity.name}</td>
                    <td className="px-6 py-4">
                      {activity.deadLine.split("T")[0]}
                    </td>
                    <td
                      className={`px-6 py-4 ${activity.status === "" ? getBackgroundColor(activityStatus): getBackgroundColor(activity.status)}`}
                    >
                      {activity.status === "" ? activityStatus: activity.status}
                    </td>
                    <td className="px-6 py-4">
                      {activity.status === "completed" ||
                      activity.status === "cancelled" ? (
                        ""
                      ) : (
                        <DropDown
                          options={["select", "completed", "cancelled"]}
                          initialValue={activity.status || ""}
                          onValueChange={(value) =>
                            updateActivityStatus(activity._id, value)
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};