import { useState,useEffect } from 'react';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { BsPlayFill } from 'react-icons/bs';
import Sidebar from './Sidebar';
import axios from "axios"
const StitchingTasks = ()=> {
   const [activeTab, setActiveTab] = useState('active');
    const [completeblock,setcompleteblock]=useState(true);
    const [tasks, settask] = useState([]);
  useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/production-stiches/");
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
        const res = await axios.put("http://localhost:5000/api/production-stiches/put1", { id: OrderId });
        console.log("Order is started  successfully");
        const response = await axios.get("http://localhost:5000/api/production-stiches/");
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
        const res = await axios.put("http://localhost:5000/api/production-stiches/put2", { id: oid });
        console.log("Order is started  successfully");
        const response = await axios.get("http://localhost:5000/api/production-stiches/");
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
    <div className="flex text-white min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Stitching Tasks</h2>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white">
            <FiLogOut /> Logout
          </button>
        </div>
        <p className="text-gray-400 mt-2 mb-6">Manage and track stitching tasks for garment production.</p>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Pending Tasks</h3>
            <p className="text-2xl">2</p>
            <p className="text-sm text-gray-400">Not yet started</p>
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <p className="text-2xl">1</p>
            <p className="text-sm text-gray-400">Currently being processed</p>
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-2xl">1</p>
            <p className="text-sm text-gray-400">Ready for quality check</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button onClick={() =>{ setcompleteblock(!completeblock)
            setActiveTab('active')}
          } className={`px-4 py-2 rounded ${completeblock ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}>Active Tasks</button>
          <button onClick={() => {setcompleteblock(!completeblock)
          setActiveTab('active')}}
           className={`px-4 py-2 rounded ${completeblock ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}>Completed Tasks</button>
        </div>

        {/* Task Table */}
        <div className="border border-gray-700 rounded-lg">
          <div className="p-4 font-semibold border-b border-gray-700">Current Stitching Tasks</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-4">Task ID</th>
                <th>Order</th>
                <th>Description</th>
                <th>Sizes</th>
                <th>Assigned To</th>
                <th>Progress</th>
                <th>Actions</th>
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
  );
}

export default StitchingTasks;