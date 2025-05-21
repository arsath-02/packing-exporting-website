import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("https://packing-exporting-website.onrender.com/api/dye-emp");
        setAttendanceData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // Helper function to calculate the attendance statistics
  const calculateStatistics = () => {
    const totalEmployees = attendanceData.length;
    const activeEmployees = attendanceData.filter(emp => emp.Status === "Active").length;
    const absentEmployees = attendanceData.filter(emp => emp.Status === "In-Active").length;
    
    const attendanceRate = ((activeEmployees / totalEmployees) * 100).toFixed(1);
    const weeklyAverage = "89.6%"; // Placeholder for weekly average calculation logic if available.

    return {
      totalEmployees,
      activeEmployees,
      absentEmployees,
      attendanceRate,
      weeklyAverage,
    };
  };

  const { totalEmployees, activeEmployees, absentEmployees, attendanceRate, weeklyAverage } = calculateStatistics();

  const thClass = "px-4 py-2 text-sm font-semibold text-left text-gray-200";
  const tdClass = "px-4 py-2 text-sm text-white";

  // Convert the attendance data to CSV format
  const convertToCSV = (data) => {
    const header = ["ID", "Name", "Department", "Position", "Status"];
    const rows = data.map(emp => [
      emp.Emp_ID,
      emp.Emp_Name,
      emp.Dept,
      emp.position,
      emp.Status
    ]);
    
    // Create CSV content
    const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");

    return csvContent;
  };

  // Function to download the CSV file
  const downloadCSV = () => {
    const csvContent = convertToCSV(attendanceData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance_report.csv";
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Attendance Management</h1>
              <p className="text-white">Track and manage employee attendance across departments.</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </header>

        {/* Attendance Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Today's Attendance</h3>
            <p className="text-2xl text-white">{activeEmployees}/{totalEmployees}</p>
            <small className="text-white">{attendanceRate}% attendance rate</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Absent Today</h3>
            <p className="text-2xl text-white">{absentEmployees}</p>
            <small className="text-white">Employees not present</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Weekly Average</h3>
            <p className="text-2xl text-white">{weeklyAverage}</p>
            <small className="text-white">Last 7 days</small>
          </div>
        </section>

        {/* Department Filter and Report Button */}
        <div className="flex items-center justify-between mb-4">
          <select className="border p-2 rounded">
            <option>All Departments</option>
            {/* Add departments here dynamically */}
          </select>
          <div className="space-x-2">
            <button 
              onClick={downloadCSV} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <section className="overflow-x-auto ">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-[#2c2c2c]">
                <tr>
                  <th className={thClass}>ID</th>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Position</th>
                  <th className={thClass}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((emp) => (
                  <tr key={emp._id || emp.Emp_ID} className="border-b border-[#333]">
                    <td className={tdClass}>{emp.Emp_ID}</td>
                    <td className={tdClass}>{emp.Emp_Name}</td>
                    <td className={tdClass}>{emp.Dept}</td>
                    <td className={tdClass}>{emp.position}</td>
                    <td className={tdClass}>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          emp.Status === "Active" ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {emp.Status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Attendance;
