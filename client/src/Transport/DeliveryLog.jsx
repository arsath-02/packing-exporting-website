import React from 'react'

const DeliveryLog = () => {
    const orders = [
        { id: 'ORD-001', customer: 'Fashion Trends Inc.', dispatch_date: '2024-04-10', delivery_date: '2024-05-28' ,status: 'Pending' },
        { id: 'ORD-002', customer: 'Style Boutique', dispatch_date: '2024-04-11', delivery_date: '2024-05-29' ,status: 'Pending' },
        { id: 'ORD-003', customer: 'Elegant Apparel', dispatch_date: '2024-04-12', delivery_date: '2024-05-30' ,status: 'Pending' },
      ];
    
      return (
        <div className="bg-gray-50 min-h-screen p-4">
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Delivery Log</h2>
              <p className="text-gray-600">Track dispatched orders and confirm deliveries</p>
            </div>
    
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Dispatched Orders</h3>
                <p className="text-sm text-gray-500">Monitor delivery status and update when completed</p>
              </div>
    
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left border-b bg-gray-100">
                      <th className="py-3 px-4 font-medium text-gray-600">Order ID</th>
                      <th className="py-3 px-4 font-medium text-gray-600">Customer</th>
                      <th className="py-3 px-4 font-medium text-gray-600">Dispatch Date</th>
                      <th className="py-3 px-4 font-medium text-gray-600">Delivery Date</th>
                      <th className="py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">{order.customer}</td>
                        <td className="py-3 px-4">{order.dispatch_date}</td>
                        <td className="py-3 px-4">{order.delivery_date}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="bg-black border text-white text-sm px-4 py-1 rounded transition">
                            View Details
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
    
export default DeliveryLog;
    