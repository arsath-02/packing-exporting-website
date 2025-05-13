import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const getStatusClass = (status) => {
  return status === "Active"
    ? "bg-green-600"
    : "bg-red-500";
};

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dye-emp");
        setTeamMembers(res.data);
      } catch (e) {
        console.error(`An error occurred: ${e.message}`);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (empId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/dye-emp/status/${empId}`);
      setTeamMembers((prev) =>
        prev.map((emp) =>
          emp.Emp_ID === empId ? { ...emp, Status: res.data.status } : emp
        )
      );
    } catch (e) {
      console.error(`Failed to update status: ${e.message}`);
    }
  };
const QCMembers = teamMembers.filter((m) => m.Dept === "Quality&Packing");

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">QC & Packing Team Management</h1>
        </header>

        <section className="grid grid-cols-4 gap-6 mb-8">
  <div className="bg-zinc-900 p-4 rounded shadow">
    <p className="text-gray-400">Team Size</p>
    <p className="text-xl font-bold">{QCMembers.length}</p>
      <p className="text-gray-400">Size of the QC & Packing team</p>
  </div>
  <div className="bg-zinc-900 p-4 rounded shadow">
    <p className="text-gray-400">Active</p>
    <p className="text-xl font-bold">
      {QCMembers.filter((m) => m.Status === "Active").length}
    </p>
      <p className="text-gray-400">Number of Active Employees</p>
  </div>
  <div className="bg-zinc-900 p-4 rounded shadow">
    <p className="text-gray-400">In-Active</p>
    <p className="text-xl font-bold">
      {QCMembers.filter((m) => m.Status === "In-Active").length}
    </p>
      <p className="text-gray-400">Number of In-Active Employees</p>
  </div>
</section>

        <section className="bg-zinc-900 p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">QC & Packing Team Members</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-2">Emp_ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Department</th>
                <th className="pb-2">Position</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
           <tbody>
            {teamMembers
              .filter((member) => member.Dept === 'Quality&Packing')
              .map((member, idx) => (
                <tr key={idx} className="border-t border-gray-800">
                  <td className="py-3">{member.Emp_ID}</td>
                  <td>{member.Emp_Name}</td>
                  <td>{member.Dept}</td>
                  <td>{member.position}</td>
                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusClass(
                        member.Status
                      )}`}
                    >
                      {member.Status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(member.Emp_ID)}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Toggle Status
                    </button>
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
