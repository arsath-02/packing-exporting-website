import React, { useState, useEffect } from 'react';
import { FaTshirt, FaUserCog, FaBoxes, FaChartBar, FaIndustry, FaCheckCircle, FaPlay } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import Sidebar from './Sidebar';
import axios from 'axios';

const DyeingTask = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dyeing");
        setOrders(res.data);
        console.log("Fetched orders:", res.data);
      } catch (e) {
        console.log(`Error in fetching data: ${e.message}`);
      }
    };
    fetchData();
  }, []);

  // Filtered groups
  const queueOrders = orders.filter(order => order.status === 'Pending');
  const inProgressOrders = orders.filter(order => order.status === 'In Progress');
  const completedOrders = orders.filter(order => order.status === 'Completed');

  const displayedOrders = activeTab === 'active'
    ? orders.filter(order => order.status !== 'Completed')
    : completedOrders;

  const handleAction = async (order) => {
    try{
      const orderId = order._id;
      if(order.status=='Pending'){
      const res= await axios.put(`http://localhost:5000/api/dyeing/`,{id:orderId});
      console.log("Order update",res.data);
      const res1 = await axios.get("http://localhost:5000/api/dyeing");
      setOrders(res1.data);
      }
      else if(order.status=='In Progress'){
        const res= await axios.put(`http://localhost:5000/api/dyeing/put2`,{id:orderId});
        console.log("Order update",res.data);
      const res1 = await axios.get("http://localhost:5000/api/dyeing");
      setOrders(res1.data);
      }


    }
    catch(err)
    {
      console.log("Error in updating order stage",err);
    }
  };

  return (
    <div className="flex min-h-screen text-white bg-black">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">Dyeing Department</h2>
            <p className="text-gray-400">Manage and track orders in the dyeing process.</p>
          </div>
          <button className="text-gray-300 hover:text-white flex items-center gap-1">
            <TbLogout className="text-lg" /> Logout
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <StatusCard count={queueOrders.length} label="Orders in Queue" subtext="Waiting to start dyeing process" />
          <StatusCard count={inProgressOrders.length} label="Orders in Progress" subtext="Currently being dyed" />
          <StatusCard count={completedOrders.length} label="Completed Orders" subtext="Ready for cutting department" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-10">
          <button className={`px-4 py-2 rounded ${activeTab === 'active' ? 'bg-white text-black' : 'bg-gray-700'}`} onClick={() => setActiveTab('active')}>Active Orders</button>
          <button className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-white text-black' : 'bg-gray-700'}`} onClick={() => setActiveTab('completed')}>Completed Orders</button>
        </div>

        {/* Orders Table */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Orders in Dyeing Process</h3>
          <div className="bg-[#1c1c1c] rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#2a2a2a]">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Color</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedOrders.map(order => (
                  <tr key={order._id} className="border-t border-gray-700">
                    <td className="p-4">{order.order_id}</td>
                    <td className="p-4">{order.name || 'N/A'}</td>
                    <td className="p-4">
                      {Object.entries(order.garmentTypes)
                        .map(([type, qty]) => `${type} (${qty})`)
                        .join(", ")}
                    </td>
                    <td className="p-4">
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: order.dyeColor?.toLowerCase() || '#ccc' }}
                      ></span>
                      {order.dyeColor}
                    </td>
                    <td className="p-4">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        order.status === 'Pending' ? 'bg-yellow-500' :
                        order.status === 'In Progress' ? 'bg-blue-500' :
                        order.status === 'Completed' ? 'bg-green-500' : 'bg-gray-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">

                       {order.status=='Pending'?( <button
                          className="flex items-center gap-2 px-4 py-1 rounded bg-white text-black"
                          onClick={() => handleAction(order)}
                        >
                          <FaPlay /> Start
                        </button>):(order.status=='In Progress'?( <button
                          className="flex items-center gap-2 px-4 py-1 rounded bg-white text-black"
                          onClick={() => handleAction(order)}
                        >
                          <FaPlay /> Complete
                        </button>):( <button
                          className="flex items-center gap-2 px-4 py-1 rounded bg-white text-black"
                        >
                         Finished
                        </button>))}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatusCard = ({ count, label, subtext }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-lg">
    <h4 className="text-3xl font-bold">{count}</h4>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
    <p className="text-xs text-gray-500 mt-2">{subtext}</p>
  </div>
);

export default DyeingTask;
