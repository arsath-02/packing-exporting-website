
import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
    <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Dyeing Department Dashboard</h2>
            <p className="text-zinc-400">Welcome back! Here's an overview of your department's operations.</p>
          </div>
          <button className="text-sm text-zinc-300 hover:underline">Logout</button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Team Members', count: '8', desc: 'Dyeing department staff' },
            { title: 'Orders in Queue', count: '3', desc: 'Waiting for dyeing' },
            { title: 'In Progress', count: '2', desc: 'Currently being dyed' },
            { title: 'Completed Today', count: '4', desc: 'Ready for next stage' },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900 rounded p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-3xl font-bold mb-1">{item.count}</p>
              <p className="text-sm text-zinc-400">{item.desc}</p>
              <a href="#" className="text-sm text-blue-400 mt-2 inline-block">View details &rarr;</a>
            </div>
          ))}
        </div>

        {/* Activities and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-zinc-900 rounded p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            <p className="text-sm text-zinc-400 mb-4">Latest updates from your department</p>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="text-zinc-400">1 hour ago</span> • <strong>John Smith</strong><br />
                Order <span className="text-blue-400">#ORD-2023-003</span> dyeing started
              </li>
              <li>
                <span className="text-zinc-400">2 hours ago</span> • <strong>System</strong><br />
                New order <span className="text-blue-400">#ORD-2023-007</span> received for Navy Blue dyeing
              </li>
              <li>
                <span className="text-zinc-400">3 hours ago</span> • <strong>John Smith</strong><br />
                Order <span className="text-blue-400">#ORD-2023-002</span> dyeing completed
              </li>
              <li>
                <span className="text-zinc-400">4 hours ago</span> • <strong>Lisa Chen</strong><br />
                Color mixing prepared for order <span className="text-blue-400">#ORD-2023-008</span>
              </li>
            </ul>
          </div>

          {/* Department Status */}
          <div className="bg-zinc-900 rounded p-6">
            <h3 className="text-xl font-semibold mb-4">Department Status</h3>
            <p className="text-sm text-zinc-400 mb-4">Current status of dyeing operations</p>
            <ul className="text-sm space-y-3">
              <li className="flex justify-between">
                <span>Today's Attendance</span>
                <span className="text-zinc-300">7/8 present</span>
              </li>
              <li className="flex justify-between">
                <span>Dyeing Machines</span>
                <span className="text-zinc-300">3/4 in use</span>
              </li>
              <li className="flex justify-between">
                <span>Color Stock</span>
                <span className="text-zinc-300">Adequate</span>
              </li>
              <li className="flex justify-between">
                <span>Production Target</span>
                <span className="text-zinc-300">70% completed</span>
              </li>
              <li className="flex justify-between">
                <span>Quality Issues</span>
                <span className="text-zinc-300">None reported</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
