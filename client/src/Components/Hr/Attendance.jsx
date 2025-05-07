import React from "react";
import Sidebar from "./Sidebar";
const Attendance = () => {
  const attendanceData = [
    {
      date: "2023-05-01",
      department: "All",
      present: 45,
      absent: 5,
      onLeave: 2,
      attendanceRate: 86.5,
    },
    {
      date: "2023-04-30",
      department: "All",
      present: 47,
      absent: 3,
      onLeave: 2,
      attendanceRate: 90.4,
    },
    {
      date: "2023-04-29",
      department: "All",
      present: 46,
      absent: 4,
      onLeave: 2,
      attendanceRate: 88.5,
    },
    {
      date: "2023-04-28",
      department: "All",
      present: 48,
      absent: 2,
      onLeave: 2,
      attendanceRate: 92.3,
    },
    {
      date: "2023-04-27",
      department: "All",
      present: 47,
      absent: 3,
      onLeave: 2,
      attendanceRate: 90.4,
    },
  ];

  const getAttendanceColor = (rate) => {
    if (rate >= 90) return "bg-green-500";
    if (rate >= 85) return "bg-yellow-400";
    return "bg-red-500";
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

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Today's Attendance</h3>
            <p className=" text-2xl text-white">45/52</p>
            <small className="text-white">86.5% attendance rate</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Absent Today</h3>
            <p className=" text-2xl text-white">5</p>
            <small className="text-white">Employees not present</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">On Leave</h3>
            <p className=" text-2xl text-white">2</p>
            <small className="text-white">Approved absences</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Weekly Average</h3>
            <p className=" text-2xl text-white">89.6%</p>
            <small className="text-white">Last 7 days</small>
          </div>
        </section>

        <div className="flex items-center justify-between mb-4">
          <select className="border p-2 rounded">
            <option>All Departments</option>
          </select>
          <div className="space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Generate Report</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Mark Attendance</button>
          </div>
        </div>

        <section className="overflow-x-auto">
          <table className="min-w-full bg-zinc-900 rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Present</th>
                <th className="px-4 py-2">Absent</th>
                <th className="px-4 py-2">On Leave</th>
                <th className="px-4 py-2">Attendance Rate</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">{entry.department}</td>
                  <td className="px-4 py-2">{entry.present}</td>
                  <td className="px-4 py-2">{entry.absent}</td>
                  <td className="px-4 py-2">{entry.onLeave}</td>
                  <td className="px-4 py-2">
                    <span className={`text-white px-2 py-1 rounded ${getAttendanceColor(entry.attendanceRate)}`}>
                      {entry.attendanceRate}%
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600">⬇</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Attendance;
