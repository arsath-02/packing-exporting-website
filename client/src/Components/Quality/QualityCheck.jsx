import React from "react";
import Sidebar from "./Sidebar";

const QualityCheck = () => {
    return (
      <div className="flex bg-zinc-900 text-white min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Quality Control</h2>
            <button className="text-gray-400 hover:text-white">Logout</button>
          </header>
          <p className="mb-6 text-gray-400">Manage quality checks for completed garment orders.</p>
  
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="text-sm text-gray-400">Pending QC</h4>
              <p className="text-3xl font-bold">1</p>
              <p className="text-xs text-gray-400">Orders waiting for quality check</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="text-sm text-gray-400">In Progress</h4>
              <p className="text-3xl font-bold">1</p>
              <p className="text-xs text-gray-400">Orders being checked</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="text-sm text-gray-400">Completed</h4>
              <p className="text-3xl font-bold">2</p>
              <p className="text-xs text-gray-400">Orders that passed or failed QC</p>
            </div>
          </div>
  
          <div className="mb-4">
            <button className="bg-gray-700 text-white px-4 py-2 rounded mr-2">Active QC</button>
            <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded">Completed QC</button>
          </div>
  
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">Orders in Quality Control</h3>
            <table className="w-full text-left">
              <thead className="text-gray-400">
                <tr>
                  <th className="pb-2">Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Issues</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-800">
                  <td className="py-2">ORD-2023-001</td>
                  <td>John Doe</td>
                  <td>T-shirts (50), Shorts (30)</td>
                  <td><span className="bg-gray-700 text-xs px-2 py-1 rounded">Pending QC</span></td>
                  <td>Unassigned</td>
                  <td>0</td>
                  <td className="space-x-2">
                    <button className="bg-white text-black px-2 py-1 rounded text-sm">Start QC</button>
                    <button className="bg-gray-800 px-2 py-1 rounded text-sm">Assign</button>
                    <button className="bg-gray-800 px-2 py-1 rounded text-sm">Add Issue</button>
                  </td>
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="py-2">ORD-2023-002</td>
                  <td>Jane Smith</td>
                  <td>T-shirts (100)</td>
                  <td><span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">In Progress</span></td>
                  <td>Emily Davis</td>
                  <td>1</td>
                  <td className="space-x-2">
                    <button className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">✓ Pass</button>
                    <button className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">✗ Fail</button>
                    <button className="bg-gray-800 px-2 py-1 rounded text-sm">Assign</button>
                    <button className="bg-gray-800 px-2 py-1 rounded text-sm">Add Issue</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  };
  
  export default QualityCheck;
  