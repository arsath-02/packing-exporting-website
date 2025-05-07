import React, { useState } from "react";
import { FaUser, FaClipboardList, FaCalendarCheck, FaBriefcase, FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";

const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Dyeing",
    position: "Senior Dyer",
    joinDate: "2020-01-15",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    department: "Production",
    position: "Senior Cutter",
    joinDate: "2020-03-10",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    department: "Production",
    position: "Senior Stitcher",
    joinDate: "2019-11-05",
    status: "Active",
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    department: "Quality",
    position: "Quality Inspector",
    joinDate: "2021-02-20",
    status: "Active",
  },
  {
    id: "EMP005",
    name: "David Wilson",
    department: "Production",
    position: "Cutter",
    joinDate: "2021-05-12",
    status: "Active",
  },
  {
    id: "EMP006",
    name: "Lisa Chen",
    department: "Dyeing",
    position: "Dyer",
    joinDate: "2021-06-15",
    status: "Active",
  },
];

export default function EmployeeDirectory() {
  const [filter, setFilter] = useState("All");

  const filteredEmployees = employees.filter(emp => {
    if (filter === "All") return true;
    return emp.status === filter;
  });

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === "Active").length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Employee Directory</h2>
            <button className="bg-white text-black px-4 py-2 rounded flex items-center space-x-2">
              <FaPlus /> <span>Add Employee</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#1F1F1F] p-4 rounded">
              <p className="text-gray-400">Total Employees</p>
              <p className="text-2xl font-bold">{totalEmployees}</p>
            </div>
            <div className="bg-[#1F1F1F] p-4 rounded">
              <p className="text-gray-400">Active Employees</p>
              <p className="text-2xl font-bold">{activeEmployees}</p>
            </div>
            <div className="bg-[#1F1F1F] p-4 rounded">
              <p className="text-gray-400">Inactive Employees</p>
              <p className="text-2xl font-bold">{inactiveEmployees}</p>
            </div>
            <div className="bg-[#1F1F1F] p-4 rounded">
              <p className="text-gray-400">New Hires</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            {['All', 'Active', 'Inactive'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded ${filter === status ? 'bg-white text-black' : 'bg-[#2A2A2A] text-gray-300'}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="bg-[#1A1A1A] p-4 rounded">
            <div className="grid grid-cols-6 gap-4 font-semibold text-gray-400 mb-2">
              <div>Employee</div>
              <div>Department</div>
              <div>Position</div>
              <div>Join Date</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="grid grid-cols-6 gap-4 py-2 items-center border-t border-[#333]">
                <div>
                  <div className="font-semibold">{emp.name}</div>
                  <div className="text-sm text-gray-400">{emp.id}</div>
                </div>
                <div>{emp.department}</div>
                <div>{emp.position}</div>
                <div>{emp.joinDate}</div>
                <div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">{emp.status}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-white bg-[#2A2A2A] p-1 rounded">📄</button>
                  <button className="text-white bg-[#2A2A2A] p-1 rounded">👁️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
