import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Production = () => {
  const [tab, setTab] = useState("Cutting");

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Production Department</h1>
          <button className="text-sm text-blue-400">Logout</button>
        </div>

        <p className="text-gray-400 mb-6">
          Manage cutting and stitching processes for garment orders.
        </p>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatusCard title="Cutting In Progress" count={1} subtitle="Orders being cut" />
          <StatusCard title="Stitching Queue" count={0} subtitle="Waiting for stitching" />
          <StatusCard title="Stitching In Progress" count={1} subtitle="Orders being stitched" />
          <StatusCard title="Completed Production" count={1} subtitle="Ready for packaging" />
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-6">
          {["Cutting", "Stitching", "Completed"].map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded font-medium ${
                tab === t ? "bg-gray-700" : "bg-zinc-900 hover:bg-gray-700"
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "Cutting" && <CuttingDepartment />}
      </div>
    </div>
  );
};

const StatusCard = ({ title, count, subtitle }) => (
  <div className="bg-zinc-900 p-4 rounded shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{count}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);

const CuttingDepartment = () => (
  <div className="bg-zinc-900 p-6 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Cutting Department</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-gray-400 border-b border-gray-700">
          <th className="p-2">Order ID</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Items</th>
          <th className="p-2">Sizes</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-700 hover:bg-gray-700">
          <td className="p-2">ORD-2023-002</td>
          <td className="p-2">Jane Smith</td>
          <td className="p-2">T-shirts (100)</td>
          <td className="p-2">S (25), M (25), L (25), XL (25)</td>
          <td className="p-2">
            <span className="bg-yellow-600 text-sm px-3 py-1 rounded-full text-white">
              In Progress
            </span>
          </td>
          <td className="p-2">
            <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-300">
              Complete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Production;
