import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { PackageCheck } from "lucide-react";

const Production = () => {
  const [tab, setTab] = useState("Cutting");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(`Error fetching data: ${e.message}`);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = {
    Cutting: orders.filter((o) => o.status === "Pending"),
    Stitching: orders.filter((o) => o.status === "Pending"),
    Completed: orders.filter((o) => o.status === "Completed"),
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Production Department</h1>
          <button className="text-sm text-blue-400">Logout</button>
        </div>

        <p className="text-gray-400 mb-6">
          Manage cutting and stitching processes for garment orders.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatusCard
            title="Cutting In Progress"
            count={filteredOrders.Cutting.length}
            subtitle="Orders being cut"
          />
          <StatusCard
            title="Stitching Queue"
            count={orders.filter((o) => o.status === "Ready for Stitching").length}
            subtitle="Waiting for stitching"
          />
          <StatusCard
            title="Stitching In Progress"
            count={filteredOrders.Stitching.length}
            subtitle="Orders being stitched"
          />
          <StatusCard
            title="Completed Production"
            count={filteredOrders.Completed.length}
            subtitle="Ready for packaging"
          />
        </div>

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

        <DepartmentTable orders={filteredOrders[tab]} department={tab} />
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

const DepartmentTable = ({ orders, department }) => (
  <div className="bg-zinc-900 p-6 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">{department} Department</h2>
    {orders.length === 0 ? (
      <p className="text-gray-400">No orders in this department currently.</p>
    ) : (
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Items</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-gray-800">
              <td className="py-2">{order.order_id}</td>
              <td className="py-2">{order.customer || "N/A"}</td>
              <td className="py-2">
                {order.garmentTypes
                  ? Object.entries(order.garmentTypes)
                      .map(([type, qty]) => `${type} (${qty})`)
                      .join(", ")
                  : "N/A"}
              </td>
              <td className="py-2">
                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>
              </td>
              <td className="py-2">
                <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center gap-1">
                  <PackageCheck size={16} />
                  {department === "Completed" ? "Pack" : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default Production;
