import React from "react";
import { FaBox, FaFlask, FaTshirt, FaUserTie, FaChartBar } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Sidebar from "./Sidebar";

const ConfirmOrders = () => {
  const orders = [
    {
      id: "ORD-2023-004",
      date: "2023-04-28",
      customer: "John Smith",
      items: "T-shirts (75), Pants (25)",
      color: "Black",
    },
    {
      id: "ORD-2023-005",
      date: "2023-04-29",
      customer: "Emily Johnson",
      items: "Shorts (100)",
      color: "Blue",
    },
    {
      id: "ORD-2023-006",
      date: "2023-04-30",
      customer: "Michael Brown",
      items: "T-shirts (50), Jackets (20)",
      color: "Red",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Confirm Orders</h1>
          <button className="flex items-center gap-1 text-white hover:text-red-500">
            <BiLogOut /> Logout
          </button>
        </div>
        <p className="mb-6 text-zinc-400">Review and confirm pending customer orders.</p>

        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700">
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Color</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800">
                  <td className="py-3">{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td>{order.color}</td>
                  <td>
                    <button className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-700">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ConfirmOrders;
