import { useEffect, useState } from "react";
import { PackageCheck, LogOut } from "lucide-react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Packaging = () => {
  const [tab, setTab] = useState("processing");
  const [orders,setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
        console.log(res.data);
      }
      catch(e)
      {
        console.log(`Error fetching Data ${e.message}`);
      }
    }
    fetchData();
  },[])

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Packaging & Export</h1>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white" onClick={()=> navigate('/')}>
            <BiLogOut size={18} />
            Logout
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 mb-6">
          Manage ironing, quality check, packing, and shipping processes.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 rounded">
            <h2 className="text-lg font-semibold">In Processing</h2>
            <p className="text-sm text-gray-400 mt-1">1 Order being processed</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded">
            <h2 className="text-lg font-semibold">Ready for Dispatch</h2>
            <p className="text-sm text-gray-400 mt-1">1 Order ready to ship</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded">
            <h2 className="text-lg font-semibold">Shipped</h2>
            <p className="text-sm text-gray-400 mt-1">1 Order shipped to customer</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Processed</h2>
            <p className="text-sm text-gray-400 mt-1">3 All orders in packaging</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {["processing", "ready", "shipped"].map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded ${
                tab === key
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {key === "processing"
                ? "Processing"
                : key === "ready"
                ? "Ready for Dispatch"
                : "Shipped"}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-zinc-900 rounded p-4">
          <h2 className="text-lg font-semibold mb-4">
            Orders in {tab === "processing" ? "Processing" : tab === "ready" ? "Ready for Dispatch" : "Shipped"}
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-700">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Items</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-800">
                  <td className="py-2">{order.order_id}</td>
                  <td className="py-2">{order.customer || 'N/A'}</td>
                  <td className="p-4">
                      {Object.entries(order.garmentTypes)
                        .map(([type, qty]) => `${type} (${qty})`)
                        .join(", ")}
                    </td>
                  <td className="py-2">
                    <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">
                    <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center gap-1">
                      <PackageCheck size={16} />
                      Start Packing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Packaging;
