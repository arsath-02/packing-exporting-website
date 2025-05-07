import { useState } from 'react';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { BsPlayFill } from 'react-icons/bs';
import Sidebar from './Sidebar';
const stitchingData = [
  {
    id: 'STI-001',
    order: 'ORD-2023-001',
    description: 'Stitch 50 T-shirts and 30 shorts',
    sizes: 'T-shirts: M (25), L (25) | Shorts: M (15), L (15)',
    assignedTo: 'Michael Brown',
    progress: 65,
  },
  {
    id: 'STI-002',
    order: 'ORD-2023-002',
    description: 'Stitch 100 T-shirts',
    sizes: 'S (25), M (25), L (25), XL (25)',
    assignedTo: null,
    progress: 0,
  },
  {
    id: 'STI-003',
    order: 'ORD-2023-005',
    description: 'Stitch T-shirts and pants',
    sizes: 'T-shirts: S (15), M (30), L (15) | Pants: M (20), L (20)',
    assignedTo: null,
    progress: 0,
  },
];

const StitchingTasks = ()=> {
  const [activeTab, setActiveTab] = useState('active');
  const [tasks, setTasks] = useState(stitchingData);

  const startTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, progress: 10 } : task
      )
    );
  };

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
          <button onClick={() => setActiveTab('active')} className={`px-4 py-2 rounded ${activeTab === 'active' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}>Active Tasks</button>
          <button onClick={() => setActiveTab('completed')} className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}>Completed Tasks</button>
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
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-800">
                  <td className="p-4">{task.id}</td>
                  <td>{task.order}</td>
                  <td>{task.description}</td>
                  <td>{task.sizes}</td>
                  <td>{task.assignedTo || 'Unassigned'}</td>
                  <td>
                    <div className="w-28 h-2 bg-gray-700 rounded">
                      <div className="h-full bg-white rounded" style={{ width: `${task.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="space-x-2">
                    {task.progress === 0 && (
                      <button onClick={() => startTask(task.id)} className="bg-white text-black rounded px-2 py-1 flex items-center gap-1">
                        <BsPlayFill /> Start
                      </button>
                    )}
                    <button className="bg-white text-black rounded px-2 py-1 flex items-center gap-1">
                      <FiUserPlus /> Update
                    </button>
                    <button className="bg-black border border-gray-500 text-white rounded px-2 py-1">Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StitchingTasks;