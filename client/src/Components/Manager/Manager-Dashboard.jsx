import React, { useEffect, useState } from 'react';
import { Clock, Droplets, Settings, Package, UserCheck } from 'lucide-react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [deptStatus, setDeptStatus] = useState({});
  const navigate = useNavigate();

  const [dashboardStats, setDashboardStats] = useState({
    pendingOrders: 0,
    dyeingQueue: 0,
    productionOrders: 0,
    readyToShip: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    axios.get('http://localhost:5000/api/dashboard/stats')
      .then(res => setDashboardStats(res.data))
      .catch(err => console.error('Error fetching dashboard stats:', err));

    // Fetch recent activities
    axios.get('http://localhost:5000/api/dashboard/activities')
      .then(res => setActivities(res.data))
      .catch(err => console.error('Error fetching activities:', err));

    // Fetch department statuses
    axios.get('http://localhost:5000/api/dashboard/department-status')
      .then(res => setDeptStatus(res.data))
      .catch(err => console.error('Error fetching department status:', err));
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Manager Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's an overview of the current operations.</p>
          </div>
          <div className="text-gray-400 cursor-pointer hover:text-white flex items-center gap-1">
            <button className="flex items-center gap-1 text-white hover:text-red-500" onClick={()=> navigate('/')}>
              <BiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Pending Orders</h2>
            <p className="text-2xl font-bold">{dashboardStats.pendingOrders}</p>
            <p className="text-sm text-gray-400">Awaiting confirmation</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Dyeing Queue</h2>
            <p className="text-2xl font-bold">{dashboardStats.dyeingQueue}</p>
            <p className="text-sm text-gray-400">Orders in dyeing process</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Production</h2>
            <p className="text-2xl font-bold">{dashboardStats.productionOrders}</p>
            <p className="text-sm text-gray-400">Orders in cutting/stitching</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="font-semibold">Ready to Ship</h2>
            <p className="text-2xl font-bold">{dashboardStats.readyToShip}</p>
            <p className="text-sm text-gray-400">Packed and ready</p>
          </div>
        </div>

        {/* Activity and Status Sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
            <p className="text-sm text-gray-400 mb-4">Latest updates across departments</p>
            <ul className="space-y-2 text-sm">
              {activities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Clock size={16} className="mt-1" />
                  {activity.text}
                  <span className="text-gray-400 ml-auto">{activity.time} • {activity.dept}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Department Status</h2>
            <p className="text-sm text-gray-400 mb-4">Current status of each department</p>
            <ul className="space-y-2 text-sm">
  {Object.entries(deptStatus).map(([deptName, status], idx) => (
    <li key={idx} className="flex justify-between items-center">
      {deptName.toLowerCase().includes('dyeing') && <Droplets size={16} />}
      {deptName.toLowerCase().includes('cutting') && <Settings size={16} />}
      {deptName.toLowerCase().includes('stitching') && <Settings size={16} />}
      {deptName.toLowerCase().includes('packing') && <Package size={16} />}
      {deptName.toLowerCase().includes('attendance') && <UserCheck size={16} />}
      <span className="capitalize">{deptName}</span>
      <span className="text-gray-400">{status} in progress</span>
    </li>
  ))}
</ul>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
