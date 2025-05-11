
import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">Quality & Shipping Dashboard</h1>
        <p className="text-gray-400 mb-6">Welcome back! Here's an overview of quality control and shipping operations.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">10</h2>
            <p className="text-gray-400">Team Members</p>
            <p className="text-xs mt-2 text-blue-400 cursor-pointer">View details →</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">5</h2>
            <p className="text-gray-400">Orders awaiting QC</p>
            <p className="text-xs mt-2 text-blue-400 cursor-pointer">View details →</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">3</h2>
            <p className="text-gray-400">Orders in packing</p>
            <p className="text-xs mt-2 text-blue-400 cursor-pointer">View details →</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">2</h2>
            <p className="text-gray-400">Orders ready for dispatch</p>
            <p className="text-xs mt-2 text-blue-400 cursor-pointer">View details →</p>
          </div>
        </div>

        {/* Activity & Department Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Recent Activities</h3>
            <p className="text-sm text-gray-400 mb-4">Latest updates from quality control and shipping</p>
            <ul className="text-sm space-y-2">
              <li>✅ Quality check completed for order #ORD-2023-001 - <span className="text-gray-300">Emily Davis</span></li>
              <li>📦 Order #ORD-2023-000 packed and ready for shipping - <span className="text-gray-300">Robert Garcia</span></li>
              <li>⚠️ Quality issue found in order #ORD-2023-004 - <span className="text-gray-300">Jennifer Lee</span></li>
              <li>🚚 Order #ORD-2022-099 shipped to customer - <span className="text-gray-300">Alex Johnson</span></li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Department Status</h3>
            <p className="text-sm text-gray-400 mb-4">Current status of quality and shipping operations</p>
            <ul className="text-sm space-y-2">
              <li><strong>Today's Attendance:</strong> 9/10 present</li>
              <li><strong>Quality Issues:</strong> 1 pending resolution</li>
              <li><strong>Packing Materials:</strong> Sufficient</li>
              <li><strong>Shipping Schedule:</strong> On time</li>
              <li><strong>Customer Returns:</strong> None this week</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
