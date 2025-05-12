import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const fetchedLeaves = response.data.leaves;
        setLeaves(fetchedLeaves);

        const approved = fetchedLeaves.filter(
          (leave) => leave.status.toLowerCase() === "approved"
        );

        const totalApprovedDays = approved.reduce((total, leave) => {
          const start = new Date(Date.parse(leave.startDate));
const end = new Date(Date.parse(leave.endDate));

          const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
          return total + days;
        }, 0);

        // Save approved leave days
        localStorage.setItem(`approvedLeaves-${user._id}`, totalApprovedDays);
        setApprovedCount(totalApprovedDays);
      }
    } catch (error) {
      alert(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold">Manage Leaves</h3>
        {/* <p className="text-lg mt-2 text-teal-700">
          ✅ Approved Leave Days: {approvedCount} / 5
        </p> */}
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          className="px-4 py-0.5 border"
          placeholder="Search By Leave Name"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3 text-base">S. No</th>
            <th className="px-6 py-3 text-base">Leave Type</th>
            <th className="px-6 py-3 text-base">From</th>
            <th className="px-6 py-3 text-base">To</th>
            <th className="px-6 py-3 text-base">Description</th>
            <th className="px-6 py-3 text-base">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={leave._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3 text-sm">{index + 1}</td>
              <td className="px-6 py-3 text-sm">{leave.leaveType}</td>
              <td className="px-6 py-3 text-sm">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 text-sm">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 text-sm">{leave.reason}</td>
              <td className="px-6 py-3 text-sm">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
