import React, { useState } from 'react';
import { FaTshirt, FaUserCog, FaBoxes, FaChartBar, FaIndustry, FaCheckCircle, FaPlay } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { MdOutlineColorLens } from 'react-icons/md';
import { HiOutlineClipboardList } from 'react-icons/hi';
import Sidebar from './Sidebar';

const ordersData = [
  {
    id: 'ORD-2023-003',
    customer: 'Robert Davis',
    items: 'Shorts (80)',
    color: 'Green',
    colorCode: 'bg-green-500',
    status: 'In Progress',
    statusColor: 'bg-yellow-600',
    action: 'Complete'
  },
  {
    id: 'ORD-2023-007',
    customer: 'Sarah Wilson',
    items: 'T-shirts (60), Pants (40)',
    color: 'Navy Blue',
    colorCode: 'bg-blue-700',
    status: 'Queued',
    statusColor: 'bg-gray-700',
    action: 'Start Dyeing'
  },
  {
    id: 'ORD-2023-008',
    customer: 'David Thompson',
    items: 'T-shirts (100)',
    color: 'Yellow',
    colorCode: 'bg-yellow-400',
    status: 'Queued',
    statusColor: 'bg-gray-700',
    action: 'Start Dyeing'
  }
];

const Dyeing = () => {
  const [activeTab, setActiveTab] = useState('active');

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
          <StatusCard count={2} label="Orders in Queue" subtext="Waiting to start dyeing process" />
          <StatusCard count={1} label="Orders in Progress" subtext="Currently being dyed" />
          <StatusCard count={2} label="Completed Orders" subtext="Ready for cutting department" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-10">
          <button className={`px-4 py-2 rounded ${activeTab === 'active' ? 'bg-white text-black' : 'bg-gray-700'}`} onClick={() => setActiveTab('active')}>Active Orders</button>
          <button className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-white text-black' : 'bg-gray-700'}`} onClick={() => setActiveTab('completed')}>Completed Orders</button>
        </div>

        {/* Table */}
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
                {ordersData.map(order => (
                  <tr key={order.id} className="border-t border-gray-700">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4"><span className={`inline-block w-3 h-3 rounded-full ${order.colorCode} mr-2`}></span>{order.color}</td>
                    <td className="p-4">
                      <span className={`text-sm px-3 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-2 px-4 py-1 rounded bg-white text-black">
                        {order.action === 'Complete' ? <FaCheckCircle /> : <FaPlay />} {order.action}
                      </button>
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

const SidebarItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-2 rounded ${active ? 'bg-gray-700' : 'hover:bg-gray-800'}`}> 
    {icon} <span>{label}</span>
  </div>
);

const StatusCard = ({ count, label, subtext }) => (
  <div className="bg-[#1c1c1c] p-6 rounded-lg">
    <h4 className="text-3xl font-bold">{count}</h4>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
    <p className="text-xs text-gray-500 mt-2">{subtext}</p>
  </div>
);

export default Dyeing;