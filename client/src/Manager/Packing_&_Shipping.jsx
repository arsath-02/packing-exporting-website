import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackingShipping = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormId, setShowFormId] = useState(null); // controls which row shows the form

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
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/packing/${orderId}/status`, {
        status: newStatus,
      });
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setShowFormId(null); // Close form after update
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredOrders =
    activeTab === 'active'
      ? allOrders.filter((order) => order.status === 'Pending' || order.status === 'In Progress')
      : activeTab === 'in-progress'
      ? allOrders.filter((order) => order.status === 'In Progress')
      : allOrders.filter((order) => order.status === 'Completed');

  const statusCounts = {
    Pending: allOrders.filter((order) => order.status === 'Pending').length,
    'In Progress': allOrders.filter((order) => order.status === 'In Progress').length,
    Completed: allOrders.filter((order) => order.status === 'Completed').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Packing & Shipping</h2>
        <p className="text-gray-600">Manage packing and shipping of completed garment orders.</p>

        {/* Status Summary Cards */}
        <div className="p-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-300 p-4 text-center rounded-lg shadow">
            <div className="text-lg font-semibold">Packing</div>
            <div className="text-2xl font-bold">{statusCounts['Pending']}</div>
          </div>
          <div className="bg-gray-300 p-4 text-center rounded-lg shadow">
            <div className="text-lg font-semibold">Ready To Ship</div>
            <div className="text-2xl font-bold">{statusCounts['In Progress']}</div>
          </div>
          <div className="bg-gray-300 p-4 text-center rounded-lg shadow">
            <div className="text-lg font-semibold">Shipped</div>
            <div className="text-2xl font-bold">{statusCounts['Completed']}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded ${activeTab === 'active' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Packing
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-4 py-2 rounded ${activeTab === 'in-progress' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Ready To Ship
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Shipped
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-6 text-gray-500">Loading orders...</div>
            ) : (
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b bg-gray-100">
                    <th className="py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Items</th>
                    <th className="py-3 px-4 font-medium text-gray-600">
                      {activeTab === 'in-progress' ? 'Address' : 'Status'}
                    </th>
                    {activeTab !== 'completed' && (
                      <th className="py-3 px-4 font-medium text-gray-600">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">{order.id || '-'}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">{order.customer || '-'}</td>
                        <td className="py-3 px-4">{order.category || '-'}</td>
                        <td className="py-3 px-4">
                          {activeTab === 'in-progress' ? (
                            <span className="text-sm text-gray-700">{order.address || '-'}</span>
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${
                                order.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : order.status === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>

                        {activeTab !== 'completed' && (
                          <td className="py-3 px-4">
                            {order.status === 'Pending' ? (
                              showFormId === order._id ? (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    handleStatusUpdate(order._id, 'In Progress');
                                  }}
                                  className="flex items-center space-x-2"
                                >
                                  <label className="text-sm">Packing Done?</label>
                                  <button
                                    type="submit"
                                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setShowFormId(null)}
                                    className="text-sm text-red-500"
                                  >
                                    Cancel
                                  </button>
                                </form>
                              ) : (
                                <button
                                  onClick={() => setShowFormId(order._id)}
                                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                  Start Packing
                                </button>
                              )
                            ) : activeTab === 'in-progress' && order.status === 'In Progress' ? (
                              <button
                                onClick={() => handleStatusUpdate(order._id, 'Completed')}
                                className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                              >
                                Mark as Shipped
                              </button>
                            ) : null}
                          </td>
                        )}
                      </tr>
                    </React.Fragment>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td className="py-4 px-4 text-gray-500" colSpan={activeTab === 'completed' ? 4 : 5}>
                        No orders found for this tab.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingShipping;
