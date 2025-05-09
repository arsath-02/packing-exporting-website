import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheck,FaTimes } from "react-icons/fa";

const ConfirmOrders = () => {
  const [porders, setpOrders] = useState([]);
  const [corders,setcOrders]=useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [show,setShow]=useState(false); // Store selected order details for view
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await axios.get("http://localhost:5000/api/orders");
        console.log(res.data);
        const data1=res.data.filter((order) => order.status == "Pending");
        const data2=res.data.filter((order) => order.status == "Completed"); //
        setpOrders(data1);
        setcOrders(data2);// Set orders state
      } catch (e) {
        console.log(`Error fetching data ${e.message}`);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set selected order to view its details
  };

  const handleConfirm = async (e) =>{
    console.log("Confirm order",e)
    const orderId = e._id;
    const res=axios.post(`http://localhost:5000/api/orders/updateDye`,{id:orderId})
    const res1 = await axios.get("http://localhost:5000/api/orders");
    console.log(res1.data);
    const data1=res1.data.filter((order) => order.status == "Pending");
    const data2=res1.data.filter((order) => order.status == "Completed"); //
    setpOrders(data1);
    setcOrders(data2);
  }

  const handleDecline = async (e) =>{
    console.log("Decline order",e)
    const orderId = e._id;
    const res=axios.put(`http://localhost:5000/api/orders/update`,{id:orderId})
    const res1 = await axios.get("http://localhost:5000/api/orders");
    console.log(res1.data);
    const data1=res1.data.filter((order) => order.status == "Pending");
    const data2=res1.data.filter((order) => order.status == "Completed"); //
    setpOrders(data1);
    setcOrders(data2);

  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Confirm Orders</h1>
          <button className="flex items-center gap-1 text-white hover:text-red-500" onClick={()=> navigate('/')}>
            <BiLogOut /> Logout
          </button>
        </div>
        <p className="mb-6 text-zinc-400">Review and confirm pending customer orders.</p>

        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700">
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Cloth Type</th> {/* Added Cloth Type column */}
                <th className="pb-2">Items</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Color</th>
                <th className="pb-2">Actions</th>
                <th className="pb-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {porders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800"
                >
                  <td className="py-3">{order.order_id}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{order.name || "N/A"}</td> {/* Directly display name from the order */}
                  <td>{order.clothType}</td> {/* Display Cloth Type */}
                  <td>
                    {Object.entries(order.garmentTypes)
                      .map(([type, qty]) => `${type} (${qty})`)
                      .join(", ")}
                  </td>
                  <td><div className="rounded-lg bg-yellow-500 w-25 text-center text-black">{order.status}</div></td>
                  <td>{order.dyeColor}</td>
                  <td>
                    <button
                      className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-700"
                      onClick={() =>{setShow(!show); handleViewDetails(order)}} // Call the function to set the selected order
                    >
                      View Details
                    </button>
                  </td>
                  <td className="flex gap-2 mt-2">
                      <button
                        className="bg-green-600 p-2 rounded-2xl hover:bg-green-700 text-white"
                        onClick={() => handleConfirm(order)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="bg-red-600 p-2 rounded-2xl hover:bg-red-700 text-white"
                        onClick={() =>{  handleDecline(order)}}
                      >
                        <FaTimes />
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Completed Orders</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700">
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Cloth Type</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Color</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {corders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800"
                >
                  <td className="py-3">{order.order_id}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{order.name || "N/A"}</td> {/* Directly display name from the order */}
                  <td>{order.clothType}</td> {/* Display Cloth Type */}
                  <td>
                    {Object.entries(order.garmentTypes)
                      .map(([type, qty]) => `${type} (${qty})`)
                      .join(", ")}
                  </td>
                  <td><div className="rounded-lg bg-green-500 w-25 text-center text-black">{order.status}</div></td>
                  <td>{order.dyeColor}</td>
                  <td>
                    <button
                      className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-700"
                      onClick={() =>{setShow(!show); handleViewDetails(order)}} // Call the function to set the selected order
                    >
                      View Details
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Display Selected Order Details */}
        {selectedOrder&&show && (
          <div className="bg-zinc-900 p-6 mt-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
              <p><strong>Customer:</strong> {selectedOrder.name || "N/A"}</p> {/* Directly access name */}
              <p><strong>Cloth Type:</strong> {selectedOrder.clothType}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Garments:</strong></p>
              <ul>
                {Object.entries(selectedOrder.garmentTypes).map(([type, qty]) => (
                  <li key={type}>{type}: {qty}</li>
                ))}
              </ul>
              <p><strong>Dye Color:</strong> {selectedOrder.dyeColor}</p>
              <p><strong>Order Status:</strong> {selectedOrder.status}</p>
              <p><strong>Notes:</strong> {selectedOrder.notes}</p>
              <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              {/* Add any other details you want to display here */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConfirmOrders;
