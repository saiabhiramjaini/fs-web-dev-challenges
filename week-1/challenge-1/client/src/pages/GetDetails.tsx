import axios from "axios";
import { useEffect, useState } from "react";

interface Data {
  image: string;
  name: string;
  rollNo: number;
  collegeName: string;
}

export const GetDetails = () => {
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getInfo");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        data.map((student, index) => (
          <div key={index}>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  {/* <tr>
                    <th scope="col" className="px-6 py-3">
                      S.No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Roll No. 
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Student Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      College Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Student Image
                    </th>
                  </tr> */}
                  
                </thead>
                <tbody>
                  <tr className="bg-white border-b ">
                    <td className="px-6 py-4">{index}</td>
                    <td className="px-6 py-4">{student.rollNo}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.collegeName}</td>
                    <td className="px-6 py-4">
                      <img
                        src={student.image}
                        alt=""
                        className="w-10 h-10 rounded-3xl"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
