import React from "react";
import { FaUserEdit, FaPlay } from "react-icons/fa";
import Sidebar from "./Sidebar";

const DyeingTasks = () => {
  const tasks = [
    {
      id: "DYE-001",
      order: "ORD-2023-003",
      description: "Prepare green dye for 80 shorts",
      color: "Green",
      colorCode: "bg-green-500",
      assignedTo: "John Smith",
      progress: "w-1/3",
    },
    {
      id: "DYE-002",
      order: "ORD-2023-007",
      description: "Prepare navy blue dye for T-shirts and pants",
      color: "Navy Blue",
      colorCode: "bg-blue-800",
      assignedTo: "Lisa Chen",
      progress: "w-0",
    },
    {
      id: "DYE-003",
      order: "ORD-2023-008",
      description: "Prepare yellow dye for 100 T-shirts",
      color: "Yellow",
      colorCode: "bg-yellow-400",
      assignedTo: "John Smith, Mark Wilson",
      progress: "w-0",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dyeing Tasks</h2>
          <button className="text-sm text-gray-400 hover:text-white">Logout</button>
        </div>

        <p className="text-gray-400 mb-4">
          Manage and track dyeing tasks for garment orders.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold">Pending Tasks</h3>
            <p className="text-2xl">2</p>
            <p className="text-gray-500 text-sm">Not yet started</p>
          </div>
          <div className="border border-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold">In Progress</h3>
            <p className="text-2xl">1</p>
            <p className="text-gray-500 text-sm">Currently being processed</p>
          </div>
          <div className="border border-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold">Completed</h3>
            <p className="text-2xl">2</p>
            <p className="text-gray-500 text-sm">Ready for next stage</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4">
          <button className="px-4 py-2 bg-white text-black rounded-l">
            Active Tasks
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-r">
            Completed Tasks
          </button>
        </div>

        {/* Task Table */}
        <div className="bg-zinc-900 rounded p-4">
          <h3 className="text-lg font-bold mb-4">Current Dyeing Tasks</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="py-2">Task ID</th>
                <th>Order</th>
                <th>Description</th>
                <th>Color</th>
                <th>Assigned To</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t border-gray-700">
                  <td className="py-2">{task.id}</td>
                  <td>{task.order}</td>
                  <td>{task.description}</td>
                  <td className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${task.colorCode}`}
                    ></span>
                    {task.color}
                  </td>
                  <td>{task.assignedTo}</td>
                  <td>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 bg-white rounded-full ${task.progress}`}
                      ></div>
                    </div>
                  </td>
                  <td className="flex gap-2 mt-1">
                    {task.progress === "w-0" ? (
                      <button className="flex items-center gap-1 px-3 py-1 bg-white text-black rounded">
                        <FaPlay size={12} /> Start
                      </button>
                    ) : (
                      <button className="flex items-center gap-1 px-3 py-1 bg-white text-black rounded">
                        <FaUserEdit size={12} /> Update
                      </button>
                    )}
                    <button className="px-2 py-1 border border-white rounded">
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DyeingTasks;
