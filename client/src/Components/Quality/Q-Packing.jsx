// PackingShipping.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Packing = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packing');
        setAllOrders(res.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(); // initial fetch
    const interval = setInterval(fetchOrders, 10000); // every 10 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleStatusUpdate = async (orderId, newStatus, newStage = null) => {
    try {
      await axios.put(`http://localhost:5000/api/packing/${orderId}/status`, {
        status: newStatus,
        stages: newStage,
      });

      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus, stages: newStage || order.stages }
            : order
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleQualityCheck = async (orderId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/packing/${orderId}/quality-check`);
      const { isQualityChecked } = res.data;

      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, isQualityChecked }
            : order
        )
      );
    } catch (error) {
      console.error('Failed to update quality check status:', error);
    }
  };

  const filteredOrders =
    activeTab === 'active'
      ? allOrders.filter((order) => order.status === 'Pending' || order.status === 'In Progress')
      : activeTab === 'in-progress'
      ? allOrders.filter((order) => order.status === 'In Progress')
      : allOrders.filter((order) => order.status === 'Completed');

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

          {loading ? (
            <p className="text-center py-10 text-gray-400">Loading orders...</p>
          ) : (
            <table className="min-w-full table-auto text-left text-sm">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="pb-2 pr-4">Order ID</th>
                  <th className="pb-2 pr-4">Customer</th>
                  <th className="pb-2 pr-4">Items</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 pr-4">Quality Check</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No orders found for this status.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-gray-800 hover:bg-gray-800 transition"
                    >
                      <td className="py-3 pr-4">{order.order_id}</td>
                      <td className="pr-4">{order.name}</td>
                      <td className="pr-4">
                        {Object.entries(order.garmentTypes)
                          .filter(([_, count]) => count > 0)
                          .map(([item, count]) => `${item} (${count})`)
                          .join(', ')}
                      </td>
                      <td className="pr-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            order.status === 'Pending'
                              ? 'bg-yellow-500 text-black'
                              : order.status === 'In Progress'
                              ? 'bg-green-500 text-white'
                              : order.status === 'Completed'
                              ? 'bg-gray-500 text-white'
                              : 'bg-blue-500 text-black'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="pr-4">
                        <button
                          onClick={() => handleQualityCheck(order._id)}
                          className={`px-2 py-1 rounded text-xs ${
                            order.isQualityChecked ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                          }`}
                        >
                          {order.isQualityChecked ? 'Checked' : 'Check'}
                        </button>
                      </td>
                      <td className="flex space-x-2 py-3">
                        {order.status !== 'Completed' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'In Progress')}
                              className="bg-yellow-400 text-black px-2 py-1 rounded text-xs"
                            >
                              Mark In Progress
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'Completed')}
                              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Mark Completed
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default Packing;
