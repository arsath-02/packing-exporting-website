
import React from 'react';
import { FaUsers, FaClipboardList, FaFileAlt, FaCalendarCheck, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { MdDashboard, MdPeople, MdEventNote, MdWork } from 'react-icons/md';
import Sidebar from './Sidebar';

export default function HRDashboard() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">HR Department Dashboard</h2>
          <button className="flex items-center space-x-2 bg-zinc-800 px-4 py-2 rounded">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </header>

        <p className="mb-6 text-gray-400">Welcome back! Here's an overview of employee management operations.</p>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded">
            <p className="text-gray-400">Total Employees</p>
            <h3 className="text-3xl font-bold">52</h3>
            <p className="text-sm text-gray-500">Across all departments</p>
            <button className="text-blue-400 mt-2 text-sm">View details →</button>
          </div>
          <div className="bg-zinc-900 p-4 rounded">
            <p className="text-gray-400">Present Today</p>
            <h3 className="text-3xl font-bold">48</h3>
            <p className="text-sm text-gray-500">92% attendance rate</p>
            <button className="text-blue-400 mt-2 text-sm">View details →</button>
          </div>
          <div className="bg-zinc-900 p-4 rounded">
            <p className="text-gray-400">Open Positions</p>
            <h3 className="text-3xl font-bold">3</h3>
            <p className="text-sm text-gray-500">Vacancies to be filled</p>
            <button className="text-blue-400 mt-2 text-sm">View details →</button>
          </div>
          <div className="bg-zinc-900 p-4 rounded">
            <p className="text-gray-400">Pending Approvals</p>
            <h3 className="text-3xl font-bold">5</h3>
            <p className="text-sm text-gray-500">Leave requests & documents</p>
            <button className="text-blue-400 mt-2 text-sm">View details →</button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-4 rounded">
            <h4 className="text-lg font-bold mb-4">Recent Activities</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>🔘 <b className="text-white">New employee onboarding completed</b> — 1 hour ago · HR Team</li>
              <li>🔘 <b className="text-white">Leave request approved for Sarah Johnson</b> — 2 hours ago · HR Manager</li>
              <li>🔘 <b className="text-white">Monthly attendance report generated</b> — 3 hours ago · System</li>
              <li>🔘 <b className="text-white">Interview scheduled for Production Operator position</b> — 4 hours ago · Recruitment Team</li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-4 rounded">
            <h4 className="text-lg font-bold mb-4">Department Overview</h4>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span>Dyeing Department</span> <span className="text-gray-400">8 employees</span></li>
              <li className="flex justify-between"><span>Production Department</span> <span className="text-gray-400">15 employees</span></li>
              <li className="flex justify-between"><span>Quality & Shipping</span> <span className="text-gray-400">10 employees</span></li>
              <li className="flex justify-between"><span>Management</span> <span className="text-gray-400">5 employees</span></li>
              <li className="flex justify-between"><span>Administration & HR</span> <span className="text-gray-400">4 employees</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
