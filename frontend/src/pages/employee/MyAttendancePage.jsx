import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar";

const MyAttendancePage = () => {
  // Sample attendance data for different months
  const attendanceData = [
    { date: "2025-04-01", status: "Present" },
    { date: "2025-04-02", status: "Absent" },
    { date: "2025-04-03", status: "Present" },
    { date: "2025-03-30", status: "Present" },
    { date: "2025-03-29", status: "Absent" },
    { date: "2025-05-01", status: "Present" },
  ];

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const [selectedMonth, setSelectedMonth] = useState("04"); // Default: April
  const [selectedYear, setSelectedYear] = useState("2025");

  const filteredData = attendanceData.filter((entry) => {
    const [year, month] = entry.date.split("-");
    return year === selectedYear && month === selectedMonth;
  });

  const presentDays = filteredData.filter((d) => d.status === "Present").length;
  const absentDays = filteredData.filter((d) => d.status === "Absent").length;
  const totalDays = filteredData.length;
  const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

  return (
    <div>
      <TopNavbar role="employee" />
      <h1 className="text-3xl font-bold text-center mt-4">📅 My Attendance</h1>

      {/* Month & Year Filter */}
      <div className="flex justify-center gap-4 my-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {/* Summary */}
      <div className="container mx-auto max-w-xl bg-white shadow p-4 mb-6 rounded">
        <p className="text-lg mb-2">
          ✅ <strong>Present:</strong> {presentDays}
        </p>
        <p className="text-lg mb-2">
          ❌ <strong>Absent:</strong> {absentDays}
        </p>
        <p className="text-lg mb-2">
          📊 <strong>Attendance %:</strong> {attendancePercentage}%
        </p>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${attendancePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="container mx-auto max-w-xl">
        <table className="min-w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{entry.date}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      entry.status === "Present" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {entry.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  No records found for selected month/year.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAttendancePage;
