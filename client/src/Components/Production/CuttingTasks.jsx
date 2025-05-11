import React, { useState, useEffect } from 'react';
import axios from "axios"
import Sidebar from './Sidebar';
const CuttingTasks = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [completeblock,setcompleteblock]=useState(true);
  const [tasks, settask] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/production/cut");
        console.log(response.data); // Optional: Check data format
        settask(response.data);
      } catch (error) {
        console.error("Error fetching cutting tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  const handleStart = async (task) => {
    const OrderId = task._id;
    try {
      console.log("Changing task to in progress");
      const res = await axios.put("http://localhost:5000/api/production/put1", { id: OrderId });
      console.log("Order is started  successfully");
      const response = await axios.get("http://localhost:5000/api/production/cut");
      console.log(response.data); // Optional: Check data format
      settask(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleComplete = async (task) => {
    try {
      const oid = task._id;
      console.log("Changing task to Completed");
      const res = await axios.put("http://localhost:5000/api/production/put2", { id: oid });
      console.log("Order is started  successfully");
      const response = await axios.get("http://localhost:5000/api/production/cut");
      console.log(response.data); // Optional: Check data format
      settask(response.data);


    }
    catch (err) {
      console.log("Order complete is error in frontend", err);
    }
  }

  const activetasks=tasks.filter((order)=> order.status!='Completed');
  const completedtask=tasks.filter((order)=>order.status=='Completed');
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Cutting Tasks</h2>
          <button className="text-sm underline">Logout</button>
        </div>

        <p className="text-gray-400 mb-6">Manage and track cutting tasks for garment production.</p>

        {/* Status Cards */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 bg-[#1a1a1a] p-4 rounded">
            <p className="text-sm text-gray-400">Pending Tasks</p>
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-gray-500">Not yet started</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] p-4 rounded">
            <p className="text-sm text-gray-400">In Progress</p>
            <p className="text-xl font-bold">1</p>
            <p className="text-xs text-gray-500">Currently being processed</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] p-4 rounded">
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-xl font-bold">1</p>
            <p className="text-xs text-gray-500">Ready for stitching</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <button
            onClick={() => setcompleteblock(!completeblock)}
            className={`px-4 py-2 rounded-l ${activeTab === 'active' ? 'bg-gray-700' : 'bg-gray-900'} text-white`}
          >
            Active Tasks
          </button>
          <button
            onClick={() => setcompleteblock(!completeblock)}
            className={`px-4 py-2 rounded-r ${activeTab === 'completed' ? 'bg-gray-700' : 'bg-gray-900'} text-white`}
          >
            Completed Tasks
          </button>
        </div>

        {/* Task Table */}

        <div className="bg-[#1a1a1a] rounded p-4">
          <h3 className="text-xl font-semibold mb-4">Current Cutting Tasks</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-2">Task ID</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Sizes</th>
                  <th className="p-2">Assigned To</th>
                  <th className="p-2">Progress</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              {completeblock?(<tbody>
                {activetasks.map((task, idx) => (
                  <tr key={task._id || idx} className="border-b border-gray-800">
                    <td className="p-2">{task._id}</td>
                    <td className="p-2">{task.order_id}</td>
                    <td className="p-2">{task.name}</td>
                    <td className="p-2">
                      {Object.entries(task.sizes || {}).map(([size, count]) => (
                        <span key={size} className="mr-2">{size.toUpperCase()}: {count}</span>
                      ))}
                    </td>
                    <td className="p-2">{task.user}</td>
                    <td className="p-2">
                      <div className="h-2 bg-gray-700 rounded">
                        <div
                          className="bg-white h-2 rounded"
                          style={{ width: task.status === 'Completed' ? '100%' : task.status === 'In Progress' ? '50%' : '0%' }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-2 flex space-x-2">
                      {
                        task.status === 'Pending' ? (
                          <button className="bg-white text-black px-3 py-1 rounded text-xs" onClick={() => handleStart(task)}>
                            Start
                          </button>
                        ) : task.status === 'Completed' ? (
                          <button className="bg-white text-black px-3 py-1 rounded text-xs">
                            Finished
                          </button>
                        ) : (
                          <button className="bg-white text-black px-3 py-1 rounded text-xs" onClick={() => handleComplete(task)}>
                            Complete
                          </button>
                        )
                      }

                    </td>
                  </tr>
                ))}
              </tbody>
             ):( <tbody>
              {completedtask.map((task, idx) => (
                  <tr key={task._id || idx} className="border-b border-gray-800">
                    <td className="p-2">{task._id}</td>
                    <td className="p-2">{task.order_id}</td>
                    <td className="p-2">{task.name}</td>
                    <td className="p-2">
                      {Object.entries(task.sizes || {}).map(([size, count]) => (
                        <span key={size} className="mr-2">{size.toUpperCase()}: {count}</span>
                      ))}
                    </td>
                    <td className="p-2">{task.user}</td>
                    <td className="p-2">
                      <div className="h-2 bg-gray-700 rounded">
                        <div
                          className="bg-white h-2 rounded"
                          style={{ width: task.status === 'Completed' ? '100%' : task.status === 'In Progress' ? '50%' : '0%' }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-2 flex space-x-2">
                      {
                        task.status === 'Pending' ? (
                          <button className="bg-white text-black px-3 py-1 rounded text-xs" onClick={() => handleStart(task)}>
                            Start
                          </button>
                        ) : task.status === 'Completed' ? (
                          <button className="bg-white text-black px-3 py-1 rounded text-xs">
                            Finished
                          </button>
                        ) : (
                          <button className="bg-white text-black px-3 py-1 rounded text-xs" onClick={() => handleComplete(task)}>
                            Complete
                          </button>
                        )
                      }

                    </td>
                  </tr>
                ))}
              </tbody>)}

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuttingTasks;
