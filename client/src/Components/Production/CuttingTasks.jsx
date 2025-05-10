import React, { useState } from 'react';
import Sidebar from './Sidebar';
const CuttingTasks = () => {
  const [activeTab, setActiveTab] = useState('active');

  const tasks = [
    {
      id: 'CUT-001',
      order: 'ORD-2023-002',
      description: 'Cut patterns for 100 T-shirts',
      sizes: 'S (25), M (25), L (25), XL (25)',
      assignedTo: 'Sarah Johnson',
      progress: 60,
    },
    {
      id: 'CUT-002',
      order: 'ORD-2023-003',
      description: 'Cut patterns for 80 shorts',
      sizes: 'M (40), L (40)',
      assignedTo: 'David Wilson',
      progress: 0,
    },
    {
      id: 'CUT-003',
      order: 'ORD-2023-005',
      description: 'Cut patterns for T-shirts and pants',
      sizes: 'T-shirts: S (15), M (30), L (15) | Pants: M (20), L (20)',
      assignedTo: 'Unassigned',
      progress: 0,
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Cutting Tasks</h2>
          <button className="text-sm underline">Logout</button>
        </div>

        <p className="text-gray-400 mb-6">Manage and track cutting tasks for garment production.</p>

        {/* Status Cards */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 bg-[#1a1a1a] p-4 rounded">
            <p className="text-sm text-gray-400">Pending Tasks</p>
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-gray-500">Not yet started</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] p-4 rounded">
            <p className="text-sm text-gray-400">In Progress</p>
            <p className="text-xl font-bold">1</p>
            <p className="text-xs text-gray-500">Currently being processed</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] p-4 rounded">
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-xl font-bold">1</p>
            <p className="text-xs text-gray-500">Ready for stitching</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-l ${activeTab === 'active' ? 'bg-gray-700' : 'bg-gray-900'} text-white`}
          >
            Active Tasks
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-r ${activeTab === 'completed' ? 'bg-gray-700' : 'bg-gray-900'} text-white`}
          >
            Completed Tasks
          </button>
        </div>

        {/* Task Table */}
      
        <div className="bg-[#1a1a1a] rounded p-4">
          <h3 className="text-xl font-semibold mb-4">Current Cutting Tasks</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-2">Task ID</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Sizes</th>
                  <th className="p-2">Assigned To</th>
                  <th className="p-2">Progress</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="p-2">{task.id}</td>
                    <td className="p-2">{task.order}</td>
                    <td className="p-2">{task.description}</td>
                    <td className="p-2">{task.sizes}</td>
                    <td className="p-2">{task.assignedTo}</td>
                    <td className="p-2">
                      <div className="h-2 bg-gray-700 rounded">
                        <div
                          className="bg-white h-2 rounded"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-2 flex space-x-2">
                      <button className="bg-white text-black px-3 py-1 rounded text-xs">{task.progress > 0 ? 'Update' : 'Start'}</button>
                      <button className="bg-gray-800 text-white px-3 py-1 rounded text-xs border border-gray-600">Assign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuttingTasks;
