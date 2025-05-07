import React from "react";
import Sidebar from './Sidebar';

const teamMembers = [
  {
    initials: "JS",
    name: "John Smith",
    id: "EMP001",
    position: "Senior Dyer",
    skills: ["Color Mixing", "Fabric Dyeing", "Quality Control"],
    experience: "5 years",
    status: "Present",
    performance: "Excellent",
  },
  {
    initials: "LC",
    name: "Lisa Chen",
    id: "EMP006",
    position: "Dyer",
    skills: ["Color Mixing", "Fabric Dyeing"],
    experience: "3 years",
    status: "Present",
    performance: "Good",
  },
  {
    initials: "MW",
    name: "Mark Wilson",
    id: "EMP010",
    position: "Dyer",
    skills: ["Fabric Dyeing", "Machine Operation"],
    experience: "2 years",
    status: "Present",
    performance: "Good",
  },
  {
    initials: "SZ",
    name: "Sarah Zhang",
    id: "EMP015",
    position: "Junior Dyer",
    skills: ["Fabric Dyeing"],
    experience: "1 year",
    status: "Absent",
    performance: "Average",
  },
];

const getStatusClass = (status) => {
  return status === "Present"
    ? "bg-green-600"
    : status === "Absent"
    ? "bg-red-500"
    : "bg-gray-500";
};

const getPerformanceClass = (performance) => {
  return performance === "Excellent"
    ? "bg-green-600"
    : performance === "Good"
    ? "bg-blue-600"
    : "bg-yellow-500";
};

const TeamManagement = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dyeing Team Management</h1>
          <button className="bg-white text-black px-4 py-2 rounded shadow">Today's Attendance</button>
        </header>

        <section className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 p-4 rounded shadow">
            <p className="text-gray-400">Team Size</p>
            <p className="text-xl font-bold">4</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded shadow">
            <p className="text-gray-400">Present Today</p>
            <p className="text-xl font-bold">3</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded shadow">
            <p className="text-gray-400">Absent</p>
            <p className="text-xl font-bold">1</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded shadow">
            <p className="text-gray-400">Performance</p>
            <p className="text-xl font-bold">3</p>
          </div>
        </section>

        <section className="bg-zinc-900 p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Dyeing Team Members</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-2">Employee</th>
                <th className="pb-2">Position</th>
                <th className="pb-2">Skills</th>
                <th className="pb-2">Experience</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Performance</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, idx) => (
                <tr key={idx} className="border-t border-gray-800">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {member.initials}
                    </div>
                    <div>
                      <div>{member.name}</div>
                      <div className="text-gray-400 text-xs">{member.id}</div>
                    </div>
                  </td>
                  <td>{member.position}</td>
                  <td>
                    <div className="flex gap-2 flex-wrap">
                      {member.skills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-700 px-2 py-1 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{member.experience}</td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceClass(member.performance)}`}>
                      {member.performance}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="bg-gray-700 p-2 rounded">🔄</button>
                      <button className="bg-gray-700 p-2 rounded">👥</button>
                    </div>
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

export default TeamManagement;