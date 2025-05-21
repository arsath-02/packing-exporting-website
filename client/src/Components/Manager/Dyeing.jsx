import React, { useState, useEffect } from 'react';
import { FaTshirt, FaUserCog, FaBoxes, FaChartBar, FaIndustry, FaCheckCircle, FaPlay } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";

const Dyeing = () => {
  const [activeTab, setActiveTab] = useState('active');
   const [orders, setOrders] = useState([]);
   const [filteredOrders, setFilteredOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('https://packing-exporting-website.onrender.com/api/dyeing');

          const allOrders = res.data;

          // Filter orders that have "Dyeing" in their stages
          const dyeingOrders = allOrders.filter((order) =>( (order.stages === 'Dyeing') || order.stages.startsWith('dye'))&& order.status!='Completed')

          const dyeingOrderscomplete = allOrders.filter((order) => ((order.stages === 'Dyeing') || order.stages.startsWith('dye'))&& order.status==='Completed')
          setFilteredOrders(dyeingOrderscomplete)


          setOrders(dyeingOrders);
          setDisplayedOrders(dyeingOrders);

          // Filter only those where "Dyeing" is not completed



      } catch (error) {
        console.error('Failed to fetch orders:', error.message);
      }
    };

    fetchOrders();
  }, []);

const handleAction=async (order)=>{
  console.log("It is clicked");
  try{
    const id=order._id
    console.log("Id in frontend ",id);
    const res=await axios.put("https://packing-exporting-website.onrender.com/Manager/",{oid:id});
    console.log(res);
    fetchOrders();
  }
  catch(err)
  {
    console.log("Error",err);
  }
}




  // const displayedOrders = activeTab === 'active' ? filteredOrders : completedOrders;

  return (
    <div className="flex min-h-screen text-white bg-black">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">Dyeing Department</h2>
            <p className="text-gray-400">Manage and track orders in the dyeing process.</p>
          </div>
          <button className="text-gray-300 hover:text-red-500 flex items-center gap-1" onClick={()=> navigate('/')}>
            <BiLogOut className="text-lg " /> Logout
          </button>
        </div>

        {/* <div className="grid grid-cols-3 gap-6 mt-8">
          <StatusCard count={queueOrders.length} label="Orders in Queue" subtext="Waiting to start dyeing process" />
          <StatusCard count={inProgressOrders.length} label="Orders in Progress" subtext="Currently being dyed" />
          <StatusCard count={completedOrders.length} label="Completed Orders" subtext="Ready for cutting department" />
        </div> */}

        <div className="flex gap-4 mt-10">
          <button className={`px-4 py-2 rounded ${activeTab === 'active' ? 'bg-white text-black' : 'bg-gray-700'}`} onClick={() => setActiveTab('active')}>Active Orders</button>
          <button className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-white text-black' : 'bg-gray-700'}`} onClick={() => setActiveTab('completed')}>Completed Orders</button>
        </div>

       { activeTab === 'active'?(<div className="mt-6">
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
                      {(order.status === 'Completed') ? (
                        <span className="text-green-400 flex items-center gap-2"><FaCheckCircle /> Completed</span>
                      ) : (
                        <button
                          className="flex items-center gap-2 px-4 py-1 rounded bg-white text-black"
                          onClick={() => handleAction(order)}
                        >
                          <FaPlay /> {order.status === 'Pending' ? 'Start' : 'Complete'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>):(<div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Orders in Dyeing Process completed</h3>
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
                {filteredOrders.map(order => (
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

                        <button
                          className="flex items-center gap-2 px-4 py-1 rounded bg-white text-black"
                          onClick={() => handleAction(order)}
                        >
                          <FaPlay /> Move to
                        </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>)}
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

export default Dyeing;
