// PackingShipping.js
import React from 'react';
import Sidebar from './Sidebar';

const Packing = () => {
  return (
    <main className="flex bg-gray-950 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Packing & Shipping</h2>
          <button className="text-gray-400 hover:text-white">Logout</button>
        </header>

        <p className="mb-6 text-gray-400">Monitor and manage packing and shipping activities.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-400 mb-1">Orders Packed</h4>
            <p className="text-3xl font-bold">3</p>
            <p className="text-xs text-gray-400">Ready for dispatch</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-400 mb-1">In Transit</h4>
            <p className="text-3xl font-bold">1</p>
            <p className="text-xs text-gray-400">Currently shipping</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-400 mb-1">Delivered</h4>
            <p className="text-3xl font-bold">5</p>
            <p className="text-xs text-gray-400">Successfully delivered</p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Packing & Shipping Orders</h3>
          <table className="min-w-full table-auto text-left text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="pb-2 pr-4">Order ID</th>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4">Items</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Packed By</th>
                <th className="pb-2 pr-4">Shipped Via</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="py-3 pr-4">ORD-2023-005</td>
                <td className="pr-4">Alice Brown</td>
                <td className="pr-4">Hoodies (40)</td>
                <td className="pr-4">
                  <span className="bg-blue-500 text-black text-xs px-2 py-1 rounded">Packed</span>
                </td>
                <td className="pr-4">Mark Leo</td>
                <td className="pr-4">-</td>
                <td>
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded text-sm">Ship</button>
                </td>
              </tr>
              <tr className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="py-3 pr-4">ORD-2023-006</td>
                <td className="pr-4">Charlie White</td>
                <td className="pr-4">Jeans (25)</td>
                <td className="pr-4">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">In Transit</span>
                </td>
                <td className="pr-4">Susan Ray</td>
                <td className="pr-4">FedEx</td>
                <td>
                  <button className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-400">Track</button>
                </td>
              </tr>
              <tr className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="py-3 pr-4">ORD-2023-007</td>
                <td className="pr-4">Robert Lane</td>
                <td className="pr-4">Jackets (10)</td>
                <td className="pr-4">
                  <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Delivered</span>
                </td>
                <td className="pr-4">Emma Lee</td>
                <td className="pr-4">DHL</td>
                <td>
                  <button className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-400">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Packing;
