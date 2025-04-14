import React from 'react';

const Orders = () => {
  const orders = [
    { id: 'ORD-001', customer: 'Fashion Trends Inc.', date: '2024-04-10', status: 'Pending' },
    { id: 'ORD-002', customer: 'Style Boutique', date: '2024-04-11', status: 'Pending' },
    { id: 'ORD-003', customer: 'Elegant Apparel', date: '2024-04-12', status: 'Pending' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Incoming Orders</h2>
          <p className="text-gray-600">Review and approve orders for packing</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Orders Pending Review</h3>
            <p className="text-sm text-gray-500">Check stock availability before approving</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b bg-gray-100">
                  <th className="py-3 px-4 font-medium text-gray-600">Order ID</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="bg-white border border-gray-300 text-sm px-4 py-1 rounded hover:bg-gray-100 transition">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
