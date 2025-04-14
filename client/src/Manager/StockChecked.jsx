import React from 'react'
import Navbar from './Navbar';

const StockChecked = () => {
  const orders = [
    { id: 'P001', name: 'Fashion Trends Inc.', category: 'Tops', quantity:280 , reorder_level:100 ,status: 'Good' },
    { id: 'P002', name: 'Style Boutique', category: 'Bottoms', quantity:280 , reorder_level:100 , status: 'Good' },
    { id: 'P003', name: 'Elegant Apparel', category: 'Accessories',quantity:280 , reorder_level:100 , status: 'Good' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Stock Check</h2>
          <p className="text-gray-600">Monitor inventory levels and check product availability</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Current Inventory</h3>
            <p className="text-sm text-gray-500">Search and filter products to check availability</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b bg-gray-100">
                  <th className="py-3 px-4 font-medium text-gray-600">Product ID</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Product Name</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Category</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Quantity</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Reorder Level</th>
                  <th className="py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{order.name}</td>
                    <td className="py-3 px-4">{order.category}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4">{order.reorder_level}</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                        {order.status}
                      </span>
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

export default StockChecked
