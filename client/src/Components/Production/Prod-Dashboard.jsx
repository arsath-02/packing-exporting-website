import React from "react";
import {
  LayoutDashboard,
  Scissors,
  Users,
  LogOut,
  CheckCircle,
  Clock,
  Pin
} from "lucide-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Production Department Dashboard</h2>
            <p className="text-sm text-gray-400">
              Welcome back! Here's an overview of cutting and stitching operations.
            </p>
          </div>
          <button className="text-gray-400 hover:text-white flex items-center gap-1">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Team Members</p>
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mt-2">15</p>
            <p className="text-sm text-gray-400">Production department staff</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">
              View details →
            </a>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Cutting Tasks</p>
              <Scissors className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mt-2">4</p>
            <p className="text-sm text-gray-400">Orders in cutting process</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">
              View details →
            </a>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Stitching Tasks</p>
              <Pin className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mt-2">6</p>
            <p className="text-sm text-gray-400">Orders in stitching process</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">
              View details →
            </a>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Completed Today</p>
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mt-2">3</p>
            <p className="text-sm text-gray-400">Ready for quality check</p>
            <a href="#" className="text-sm text-blue-400 mt-2 inline-block">
              View details →
            </a>
          </div>
        </div>

        {/* Activity & Status */}
        <div className="grid grid-cols-2 gap-4">
          {/* Recent Activities */}
          <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-2">Recent Activities</h3>
            <p className="text-sm text-gray-400 mb-4">
              Latest updates from cutting and stitching
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-1" />
                <span>
                  <span className="font-medium text-white">Order #ORD-2023-002</span> cutting completed<br />
                  <span className="text-gray-400">1 hour ago — Sarah Johnson</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-1" />
                <span>
                  Stitching started for order <span className="font-medium text-white">#ORD-2023-001</span><br />
                  <span className="text-gray-400">2 hours ago — Michael Brown</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-1" />
                <span>
                  Pattern preparation for order <span className="font-medium text-white">#ORD-2023-005</span><br />
                  <span className="text-gray-400">3 hours ago — David Wilson</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-1" />
                <span>
                  <span className="font-medium text-white">Order #ORD-2023-000</span> stitching completed<br />
                  <span className="text-gray-400">4 hours ago — Team</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Department Status */}
          <div className="bg-zinc-900 p-4 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-2">Department Status</h3>
            <p className="text-sm text-gray-400 mb-4">
              Current status of production operations
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Today's Attendance</span>
                <span className="text-white">14/15 present</span>
              </div>
              <div className="flex justify-between">
                <span>Cutting Machines</span>
                <span className="text-white">2/3 in use</span>
              </div>
              <div className="flex justify-between">
                <span>Sewing Machines</span>
                <span className="text-white">8/10 in use</span>
              </div>
              <div className="flex justify-between">
                <span>Material Stock</span>
                <span className="text-white">Sufficient</span>
              </div>
              <div className="flex justify-between">
                <span>Production Target</span>
                <span className="text-white">65% completed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
