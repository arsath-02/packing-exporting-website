import React, { useState, useEffect } from 'react';
import Sidebar from '../Customer/Sidebar';
import axios from 'axios';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
        console.log("Fetched orders:", res.data);

      } catch (e) {
        console.log(`Error in fetching data: ${e.message}`);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === 'active') return order.stage !== 'Completed';
    if (filter === 'completed') return order.stage === 'Completed';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <a href="/" className="text-sm text-gray-300 hover:underline">Logout</a>
        </div>

        <p className="mb-4">Welcome back! Here's an overview of your recent orders.</p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-gray-800' : 'bg-gray-700'} text-white`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-gray-800' : 'bg-gray-700'} text-white`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-gray-800' : 'bg-gray-700'} text-white`}
          >
            Completed Orders
          </button>
        </div>

        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 rounded p-4 mb-4 shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{order.order_id}</h2>
              <span className="bg-gray-700 px-3 py-1 text-sm rounded-full">
                {order.stage}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-1">
              Ordered on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-sm mb-2">
              Items: {Object.entries(order.garmentTypes).map(([type, qty]) => `${type} (${qty})`).join(", ")}
            </p>

            <p className="text-sm">Progress</p>
            <div className="h-3 w-full bg-gray-700 rounded-full">
              <div
                className="h-3 bg-white rounded-full"
                style={{ width: `${order.progress || 0}%` }}
              ></div>
            </div>
            <p className="text-right text-sm mt-1">{order.progress || 0}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
