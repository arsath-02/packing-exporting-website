import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null); // Track which order is being updated
  const [statusTimers, setStatusTimers] = useState({}); // Track timers for each order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusCounts = {
    Pending: orders.filter((o) => o.status === 'Pending').length,
    'In Progress': orders.filter((o) => o.status === 'In Progress').length,
    Completed: orders.filter((o) => o.status === 'Completed').length,
  };

  const handleStatusChange = async (orderId, newStatus, redirectTo) => {
    try {
      setUpdatingOrderId(orderId);
      await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      navigate(redirectTo);
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const startQC = (orderId) => {
    const intervalId = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderId && order.status === 'Pending') {
            return { ...order, status: 'In Progress' };
          }
          return order;
        })
      );
    }, 5000); // Update status every 5 seconds as an example
    setStatusTimers((prevTimers) => ({ ...prevTimers, [orderId]: intervalId }));
  };

  const renderStatusBadge = (status) => {
    const statusStyles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Incoming Orders</h2>
          <p className="text-gray-600">Review and approve orders for packing</p>
        </div>
        {/* Status Summary Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Quality Checked', count: statusCounts.Pending, route: '/Manager/quality-check' },
            { label: 'Ready To Ship', count: statusCounts['In Progress'], route: '/Manager/packed-orders' },
            { label: 'Shipped', count: statusCounts.Completed, route: '/Manager/packed-orders' },
          ].map(({ label, count, route }) => (
            <div key={label} className="bg-gray-300 p-4 text-center rounded-lg shadow">
              <div className="text-lg font-semibold">{label}</div>
              <div className="text-2xl font-bold">{count}</div>
              <button className="cursor-pointer underline text-sm mt-2" onClick={() => navigate(route)}>
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading orders...</div>
            ) : orders.length > 0 ? (
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b bg-gray-100">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Material</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Color</th>
                    <th className="py-3 px-4">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{order.order_id}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{order.name}</td>
                      <td className="py-3 px-4">{order.material}</td>
                      <td className="py-3 px-4">{order.size}</td>
                      <td className="py-3 px-4">{order.color}</td>
                      <td className="py-3 px-4">{order.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500 py-6">No orders found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
