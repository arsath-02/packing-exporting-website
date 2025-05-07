import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaCircle, FaRedo } from 'react-icons/fa';
import Sidebar from './Sidebar';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/');
        const data = await response.json();
        const formattedOrders = data.map((order) => ({
          id: order.order_id,
          date: new Date(order.createdAt).toISOString().split('T')[0],
          status: order.status,
          clothType: JSON.stringify(order.clothType),
          weight: `${order.weight}kg`,
          items: Object.entries(order.garmentTypes)
            .filter(([type, value]) => value)
            .map(([type]) => type)
            .join(', '),
          dyeColor: order.dyeColor,
          progress: formatStages(order.stages),
        }));
      
        setOrders(formattedOrders);
        console.log(formattedOrders)
        if (formattedOrders.length > 0) setSelectedOrder(formattedOrders[0]);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const formatStages = (stages) => {
    const allSteps = ['Order Confirmed', 'Dyeing', 'Cutting', 'Stitching', 'Packing', 'Shipped'];
    const statusMap = stages?.reduce((acc, stage) => {
      acc[stage.name] = { status: stage.status, date: stage.date };
      return acc;
    }, {}) || {};

    return allSteps.map((step) => {
      const stepData = statusMap[step] || { status: 'pending', date: null };
      return {
        step,
        status: stepData.status,
        date: stepData.date ? new Date(stepData.date).toISOString().split('T')[0] : null
      };
    });
  };

  return (
    <div className="flex h-screen text-white bg-black">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Order Status</h2>
          <button className="bg-white text-black px-4 py-2 rounded font-semibold">Place New Order</button>
        </div>
        <p className="text-gray-400 mb-6">Track the status of your garment orders.</p>

        <div className="flex gap-6">
          {/* Orders List */}
          <div className="w-1/3 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`cursor-pointer border rounded p-4 ${selectedOrder?.id === order.id ? 'border-white' : 'border-zinc-700'}`}
              >
                <div className="font-semibold">{order.id}</div>
                <div className="text-sm text-gray-400">Ordered on {order.date}</div>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-zinc-800 rounded-full">
                  {order.status}
                </span>
              </div>
            ))}
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="flex-1 border border-zinc-700 rounded p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Order Details: {selectedOrder.id}</h3>
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full">{selectedOrder.status}</span>
              </div>
              <div className="grid grid-cols-2 text-sm gap-y-2 mb-6">
                <div><strong>Order Date:</strong> {selectedOrder.date}</div>
                <div><strong>Items:</strong> {selectedOrder.items}</div>
                <div><strong>Cloth Type:</strong> {selectedOrder.clothType}</div>
                <div><strong>Dye Color:</strong> {selectedOrder.dyeColor}</div>
                <div><strong>Weight:</strong> {selectedOrder.weight}</div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Order Progress</h4>
                <ol className="space-y-4">
                  {selectedOrder.progress.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="mt-1">
                        {step.status === 'done' && <FaCheckCircle className="text-green-500" />}
                        {step.status === 'in_progress' && <FaRedo className="text-yellow-500 animate-spin" />}
                        {step.status === 'pending' && <FaCircle className="text-gray-500" />}
                      </span>
                      <div>
                        <div className="font-medium">{step.step}</div>
                        {step.date && <div className="text-xs text-gray-400">{step.date}</div>}
                        {step.status === 'in_progress' && <div className="text-xs text-yellow-400">In Progress</div>}
                        {step.status === 'pending' && <div className="text-xs text-gray-400">Pending</div>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
