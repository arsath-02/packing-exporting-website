import React, { useState } from 'react';
import Sidebar from './Sidebar';

const initialEmployees = [
  { id: 'EMP001', name: 'John Smith', department: 'Dyeing', position: 'Supervisor', status: 'Present', joinDate: '2020-01-15' },
  { id: 'EMP002', name: 'Sarah Johnson', department: 'Cutting', position: 'Operator', status: 'Present', joinDate: '2020-03-10' },
  { id: 'EMP003', name: 'Michael Brown', department: 'Stitching', position: 'Supervisor', status: 'Present', joinDate: '2019-11-05' },
  { id: 'EMP004', name: 'Emily Davis', department: 'Packaging', position: 'Operator', status: 'Absent', joinDate: '2021-02-20' },
  { id: 'EMP005', name: 'David Wilson', department: 'Cutting', position: 'Operator', status: 'Present', joinDate: '2021-05-12' },
];

const EmployeeManagement=()=> {
  const [employees, setEmployees] = useState(initialEmployees);

  const totalEmployees = employees.length;
  const presentCount = employees.filter(e => e.status === 'Present').length;
  const supervisors = employees.filter(e => e.position === 'Supervisor').length;
  const operators = employees.filter(e => e.position === 'Operator').length;

  const markAttendance = () => {
    const updated = employees.map(e => ({
      ...e,
      status: Math.random() > 0.2 ? 'Present' : 'Absent',
    }));
    setEmployees(updated);
  };

  return (
    <div className="flex bg-[#121212] text-white min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <p className="text-gray-400">Manage employees, attendance, and payroll.</p>
          </div>
          <div className="space-x-2">
            <button onClick={markAttendance} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Mark Attendance
            </button>
            <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard label="Total Employees" value={totalEmployees} desc="Across all departments" />
          <StatCard label="Present Today" value={presentCount} desc={`${Math.round((presentCount / totalEmployees) * 100)}% attendance rate`} />
          <StatCard label="Supervisors" value={supervisors} desc="Department leaders" />
          <StatCard label="Operators" value={operators} desc="Production staff" />
        </div>

        {/* Employee Table */}
        <h2 className="mt-10 text-xl font-semibold">Employee Directory</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-[#2c2c2c]">
              <tr>
                <th className={thClass}>ID</th>
                <th className={thClass}>Name</th>
                <th className={thClass}>Department</th>
                <th className={thClass}>Position</th>
                <th className={thClass}>Status</th>
                <th className={thClass}>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-b border-[#333]">
                  <td className={tdClass}>{emp.id}</td>
                  <td className={tdClass}>{emp.name}</td>
                  <td className={tdClass}>{emp.department}</td>
                  <td className={tdClass}>{emp.position}</td>
                  <td className={tdClass}>
                    <span className={`text-sm px-3 py-1 rounded-full ${emp.status === 'Present' ? 'bg-green-600' : 'bg-red-600'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className={tdClass}>{emp.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, desc }) => (
  <div className="bg-[#1f1f1f] p-5 rounded-lg min-w-[180px]">
    <h3 className="text-xl font-semibold">{value}</h3>
    <p className="text-sm mt-1">{label}</p>
    <p className="text-xs text-gray-400 mt-1">{desc}</p>
  </div>
);

const thClass = "py-3 px-4 font-bold text-white";
const tdClass = "py-3 px-4";

export default EmployeeManagement;
