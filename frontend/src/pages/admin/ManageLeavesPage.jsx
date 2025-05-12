import { useState } from "react";
import TopNavbar from "../../components/TopNavbar"; // Import TopNavbar component
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // For notifications

const leaveRequestsData = [
  { id: 1, employee: "John Doe", type: "Sick", status: "Pending", startDate: "2025-04-20", endDate: "2025-04-22" },
  { id: 2, employee: "Jane Smith", type: "Vacation", status: "Approved", startDate: "2025-04-25", endDate: "2025-04-30" },
];

const ManageLeavesPage = () => {
  const [leaveRequests, setLeaveRequests] = useState(leaveRequestsData);
  const [filter, setFilter] = useState("");

  const handleLeaveApproval = (id, status) => {
    const updatedLeaves = leaveRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    setLeaveRequests(updatedLeaves);
    toast.success(`Leave ${status} successfully!`);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRequests = leaveRequests.filter((request) =>
    request.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <TopNavbar role="admin" />
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            📝 Manage Leaves
          </h2>

          {/* Filter for Leave Type */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700">Filter by Leave Type:</label>
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Type of Leave"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Leave Request Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold text-gray-800">{request.employee}</div>
                  <div
                    className={`text-sm px-2 py-1 rounded-full ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.status}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">Leave Type: {request.type}</div>
                <div className="text-sm text-gray-600 mb-4">
                  {request.startDate} - {request.endDate}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLeaveApproval(request.id, "Approved")}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleLeaveApproval(request.id, "Rejected")}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageLeavesPage;
