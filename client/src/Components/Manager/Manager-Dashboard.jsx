import React from 'react';
import { FaTshirt, FaUserCheck, FaBoxes, FaCogs, FaPalette, FaUsers, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import {LogOut, Clock, CheckCircle, AlertCircle, UserCheck,Droplets, Settings, Package } from 'lucide-react';
import Sidebar from './Sidebar';

const ManagerDashboard = () => {
  const activities = [
    { time: '2 hours ago', text: 'Order #ORD-2023-002 moved to stitching', dept: 'Production' },
    { time: '3 hours ago', text: 'New order #ORD-2023-005 received', dept: 'Orders' },
    { time: '5 hours ago', text: 'Order #ORD-2023-001 shipped to customer', dept: 'Shipping' },
    { time: 'Yesterday', text: 'Dyeing completed for order #ORD-2023-003', dept: 'Dyeing' },
    { time: 'Yesterday', text: 'Employee attendance updated', dept: 'HR' },
  ];

  const deptStatus = [
    { icon: <FaPalette />, name: 'Dyeing Department', status: '3 orders in progress' },
    { icon: <FaCogs />, name: 'Cutting Section', status: '2 orders in progress' },
    { icon: <FaTshirt />, name: 'Stitching Section', status: '5 orders in progress' },
    { icon: <FaBoxes />, name: 'Packaging Department', status: '2 orders in progress' },
    { icon: <FaUsers />, name: 'Employee Attendance', status: '45/50 present today' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Manager Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's an overview of the current operations.</p>
          </div>
          <div className="text-gray-400 cursor-pointer hover:text-white flex items-center gap-1">
            <LogOut size={18} /> Logout
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Pending Orders</h2>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-400">Awaiting confirmation</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">View details →</a>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Dyeing Queue</h2>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-400">Orders in dyeing process</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">View details →</a>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Production</h2>
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-gray-400">Orders in cutting/stitching</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">View details →</a>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Ready to Ship</h2>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-400">Packed and ready</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">View details →</a>
          </div>
        </div>

        {/* Activity and Status Sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
            <p className="text-sm text-gray-400 mb-4">Latest updates across departments</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1" /> Order #ORD-2023-002 moved to stitching <span className="text-gray-400 ml-auto">2 hours ago • Production</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1" /> New order #ORD-2023-005 received <span className="text-gray-400 ml-auto">3 hours ago • Orders</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1" /> Order #ORD-2023-001 shipped to customer <span className="text-gray-400 ml-auto">5 hours ago • Shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1" /> Dyeing completed for order #ORD-2023-003 <span className="text-gray-400 ml-auto">Yesterday • Dyeing</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-1" /> Employee attendance updated <span className="text-gray-400 ml-auto">Yesterday • HR</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Department Status</h2>
            <p className="text-sm text-gray-400 mb-4">Current status of each department</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center"><Droplets size={16} /> Dyeing Department <span className="text-gray-400">3 orders in progress</span></li>
              <li className="flex justify-between items-center"><Settings size={16} /> Cutting Section <span className="text-gray-400">2 orders in progress</span></li>
              <li className="flex justify-between items-center"><Settings size={16} /> Stitching Section <span className="text-gray-400">5 orders in progress</span></li>
              <li className="flex justify-between items-center"><Package size={16} /> Packaging Department <span className="text-gray-400">2 orders in progress</span></li>
              <li className="flex justify-between items-center"><UserCheck size={16} /> Employee Attendance <span className="text-gray-400">45/50 present today</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManagerDashboard;