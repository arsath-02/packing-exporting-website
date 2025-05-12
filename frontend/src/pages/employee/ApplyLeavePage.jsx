import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar"; // Import TopNavbar component
import LeaveIcon from "../../assets/apply-leave.png"; // Import leave icon image
import LeaveHistoryIcon from "../../assets/leave-history.jpg"; // Import leave history icon image


const ApplyLeavePage = () => {
  const [leaveData, setLeaveData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // To track selected card for details
  const [showPopup, setShowPopup] = useState(false); // To handle popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation check
    if (!leaveData.fromDate || !leaveData.toDate || !leaveData.reason) {
      alert("Please fill in all fields.");
      return;
    }

    // Add the new leave to history
    const newLeave = {
      ...leaveData,
      status: "Pending", // Default status when applied
    };

    setLeaveHistory([newLeave, ...leaveHistory]); // Add new leave to the top
    console.log("Leave applied:", newLeave);

    // Show confirmation popup
    setShowPopup(true);

    // Reset form after submission
    setLeaveData({
      fromDate: "",
      toDate: "",
      reason: "",
    });

    // Close popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleCardClick = (cardType) => {
    setSelectedCard(selectedCard === cardType ? null : cardType); // Toggle card details
    document.getElementById("details").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <TopNavbar role="employee" /> {/* Show TopNavbar for employee role */}
      <h1 className="text-3xl font-bold text-center mb-6 container mx-auto p-4">Apply for Leave</h1>

      {/* Cards Row */}
      <div className="flex gap-6 justify-center">
        {/* Card 1: Apply Leave */}
        <div
          className="card w-80 shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleCardClick("apply")}
        >
          <img
            src={LeaveIcon} // Use imported leave icon image
            alt="Apply Leave"
            className="rounded-t-lg"
          />
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold">Apply for Leave</h3>
            <p className="text-gray-600">Submit your leave requests for approval.</p>
          </div>
        </div>

        {/* Card 2: Applied Leaves */}
        <div
          className="card w-80 shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleCardClick("appliedLeaves")}
        >
          <img
            src={LeaveHistoryIcon} // Use imported leave history icon image
            alt="Applied Leaves"
            className="rounded-t-lg"
          />
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold">Applied Leaves</h3>
            <p className="text-gray-600">View the status of your applied leaves.</p>
          </div>
        </div>
      </div>

      {/* Card Details Section */}
      <div id="details" className="mt-10 transition-all">
        {selectedCard === "apply" && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-semibold mb-4">Apply Leave Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-lg font-medium">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={leaveData.fromDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={leaveData.toDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium">Reason</label>
                <textarea
                  name="reason"
                  value={leaveData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded mt-4">
                  Apply for Leave
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedCard === "appliedLeaves" && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-semibold mb-4">My Applied Leaves</h2>
            {leaveHistory.length === 0 ? (
              <p className="text-gray-600">No leaves applied yet.</p>
            ) : (
              <div className="space-y-4">
                {leaveHistory.map((leave, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-50">
                    <p><strong>From:</strong> {leave.fromDate}</p>
                    <p><strong>To:</strong> {leave.toDate}</p>
                    <p><strong>Reason:</strong> {leave.reason}</p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded ${leave.status === "Accepted" ? "bg-green-200 text-green-800" : leave.status === "Rejected" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}>
                        {leave.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popup Notification for Leave Applied */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-semibold">Leave Applied Successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeavePage;
