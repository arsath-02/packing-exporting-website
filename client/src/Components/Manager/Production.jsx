import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { PackageCheck } from "lucide-react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Production = () => {
  const [tab, setTab] = useState("Cutting");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [stage,setStage]=useState('Cutting');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("https://packing-exporting-website.onrender.com/api/production/cut");
        const res2 = await axios.get("https://packing-exporting-website.onrender.com/api/production-stiches/");

        const combinedData = [...res1.data, ...res2.data]; // Merging arrays

        setOrders(combinedData);
      } catch (e) {
        console.error(`Error fetching data: ${e.message}`);
      }
    };

    fetchData();
  }, []);


  const filteredOrders = {
    Cutting: orders.filter(
      (o) =>o.stages === "Cutting Section"
    ),
    Stitching: orders.filter(
      (o) => o.stages === "Stitching section"
    ),
    Completed: orders.filter((o) => o.status === "Completed" &&o.stages === "Stitching section"),
  };


  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Production Department</h1>
          <button
            className="text-gray-300 hover:text-white flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            <BiLogOut className="text-lg" /> Logout
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Manage cutting and stitching processes for garment orders.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatusCard
            title="Cutting In Progress"
            count={filteredOrders.Cutting.length}
            subtitle="Orders being cut"
          />
          <StatusCard
            title="Stitching Queue"
            count={orders.filter((o) => o.status === "Ready for Stitching").length}
            subtitle="Waiting for stitching"
          />
          <StatusCard
            title="Stitching In Progress"
            count={filteredOrders.Stitching.length}
            subtitle="Orders being stitched"
          />
          <StatusCard
            title="Completed Production"
            count={filteredOrders.Completed.length}
            subtitle="Ready for packaging"
          />
        </div>

        <div className="flex space-x-4 mb-6">

            <button

              className={`px-4 py-2 rounded font-medium ${
                tab === 'Cutting' ? "bg-gray-700" : "bg-zinc-900 hover:bg-gray-700"
              }`}
              onClick={() => {setStage('Cutting')
                setTab('Cutting')}}
            >
              Cutting

            </button>

            <button

              className={`px-4 py-2 rounded font-medium ${
                tab === 'Stitching' ? "bg-gray-700" : "bg-zinc-900 hover:bg-gray-700"
              }`}
              onClick={() => {setStage('Stitching')
                 setTab('Stitching')}}
            >
               Stitching

            </button>

            <button

              className={`px-4 py-2 rounded font-medium ${
                tab ===  'Completed' ? "bg-gray-700" : "bg-zinc-900 hover:bg-gray-700"
              }`}
              onClick={() =>{ setStage('Completed')
                setTab('Completed')
              }}
            >
             Completed

            </button>

        </div>

        <DepartmentTable orders={filteredOrders[stage]} department={stage} />
      </div>
    </div>
  );
};

const StatusCard = ({ title, count, subtitle }) => (
  <div className="bg-zinc-900 p-4 rounded shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{count}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);
const handlesumma=()=>{
  console.log("Summa Erru da");
 }
 const handlePacking = async (order)=>{
 try{
  const oid=order._id;
   const res=await axios.put("https://packing-exporting-website.onrender.com/api/production_sidemanager",{id:oid});
   console.log("Sent to packing side successfully",res.message);
 }
 catch(err)
 {
  console.log(err);
 }
 }
const DepartmentTable = ({ orders, department }) => (
  <div className="bg-zinc-900 p-6 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">{department} Department</h2>
    {orders.length === 0 ? (
      <p className="text-gray-400">No orders in this department currently.</p>
    ) : (
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Items</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-gray-800">
              <td className="py-2">{order.order_id}</td>
              <td className="py-2">{order.name || "N/A"}</td>
              <td className="py-2">
                {order.garmentTypes
                  ? Object.entries(order.garmentTypes)
                      .map(([type, qty]) => `${type} (${qty})`)
                      .join(", ")
                  : "N/A"}
              </td>
              <td className="py-2">
                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>
              </td>
              <td className="py-2">
                <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center gap-1" onClick={order.status=="Completed" ?(()=>handlePacking(order)):(handlesumma)}>
                  <PackageCheck size={16} />
                  {department === "Completed" ? "Pack" : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default Production;