import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({ userId: user._id });
  const [year, setYear] = useState(new Date().getFullYear());
  const [remainingLeaves, setRemainingLeaves] = useState(20);
  const [deductedLeaves, setDeductedLeaves] = useState(0);
  const [leaveDeductionOption, setLeaveDeductionOption] = useState("total");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [workingDays, setWorkingDays] = useState(0);
  const navigate = useNavigate();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDeductedLeavesKey = (uid, yr, mon) => `deductedLeaves-${uid}-${yr}-${mon}`;

  const calculateWorkingDays = (month) => {
    const currentYear = parseInt(year);
    const startDate = new Date(currentYear, month - 1, 1);
    const endDate = new Date(currentYear, month, 0);
    let totalWorkingDays = 0;

    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      const dayOfWeek = day.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) totalWorkingDays++;
    }

    const storedDeductedLeaves = parseInt(localStorage.getItem(getDeductedLeavesKey(user._id, currentYear, month)), 10) || 0;
    const adjustedWorkingDays = totalWorkingDays - storedDeductedLeaves;

    setDeductedLeaves(storedDeductedLeaves); // Update deducted leaves for selected month
    setWorkingDays(adjustedWorkingDays);
  };

  useEffect(() => {
    const fetchApprovedLeavesForYear = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/leave/${user._id}/employee`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const allLeaves = res.data.leaves || [];
        const approvedThisYear = allLeaves
          .filter(l => new Date(l.startDate).getFullYear() === parseInt(year) && l.status === "Approved")
          .reduce((acc, leave) => {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
            return acc + days;
          }, 0);

        setRemainingLeaves(20 - approvedThisYear);
      } catch (err) {
        console.error("Error fetching leave data", err);
      }
    };

    fetchApprovedLeavesForYear();
    calculateWorkingDays(selectedMonth);
  }, [year, user._id, selectedMonth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleMonthChange = (e) => {
    const selected = parseInt(e.target.value);
    setSelectedMonth(selected);
    calculateWorkingDays(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(leave.startDate);
    const end = new Date(leave.endDate);
    const daysRequested = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (daysRequested > remainingLeaves && leaveDeductionOption === "total") {
      alert(`❌ Only ${remainingLeaves} leave days allowed for the year.`);
      return;
    }

    try {
      const payload = {
        ...leave,
        requestedYear: year,
        leaveDeductionOption,
      };

      const response = await axios.post(`http://localhost:5000/api/leave/add`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        if (leaveDeductionOption === "deductions") {
          const updatedDeducted = deductedLeaves + daysRequested;
          setDeductedLeaves(updatedDeducted);
          localStorage.setItem(getDeductedLeavesKey(user._id, year, selectedMonth), updatedDeducted.toString());
          alert("✅ Leave request submitted with deductions.");
        } else {
          alert("✅ Leave request submitted.");
        }

        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      alert(error?.response?.data?.error || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Request Leave</h2>

      <form onSubmit={handleSubmit}>
        {/* Year Selector */}
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">Leave For Which Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Month Selector */}
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">Select Month</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Remaining Leave Info */}
        <div className="mb-4 text-lg font-medium text-green-700">
          Remaining Leaves: {remainingLeaves} / 20
        </div>

        {/* Deducted Leave Info */}
        <div className="mb-4 text-lg font-medium text-red-700">
          Deducted Leaves for {months[selectedMonth - 1]}: {deductedLeaves}
        </div>

        {/* Working Days */}
        <div className="mb-4 text-lg font-medium text-blue-700">
          Working Days for {months[selectedMonth - 1]}: {workingDays}
        </div>

        {/* Leave Deduction Option */}
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">
            Deduct Leave from
          </label>
          <select
            value={leaveDeductionOption}
            onChange={(e) => setLeaveDeductionOption(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="total">Total Paid Leaves</option>
            <option value="deductions">Leave Deductions (Override Limit)</option>
          </select>
        </div>

        {/* Leave Type, Start Date, End Date */}
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">Leave Type</label>
          <input
            type="text"
            name="leaveType"
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default Add;
