import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import Sidebar from "./Sidebar";
import axios from "axios";

const ConfirmOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({}); // Store user data by user ID
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order details for view

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);

        // Fetch user data based on user IDs from orders
        const userIds = res.data.map((order) => order.user); // Extract user IDs from orders
        const uniqueUserIds = [...new Set(userIds)]; // Get unique user IDs

        const usersData = await Promise.all(
          uniqueUserIds.map((userId) =>
            axios.get(`http://localhost:5000/api/users/${userId}`)
          )
        );

        // Store users by their IDs
        const usersMap = {};
        usersData.forEach((response) => {
          const user = response.data;
          usersMap[user._id] = user.name; // Assuming the user's name is in `name` field
        });

        setUsers(usersMap); // Set the users map state
      } catch (e) {
        console.log(`Error fetching data ${e.message}`);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set selected order to view its details
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Confirm Orders</h1>
          <button className="flex items-center gap-1 text-white hover:text-red-500">
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
                <th className="pb-2">Color</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
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
                  <td>{users[order.user] || "N/A"}</td> {/* Display user name */}
                  <td>{order.clothType}</td> {/* Display Cloth Type */}
                  <td>
                    {Object.entries(order.garmentTypes)
                      .map(([type, qty]) => `${type} (${qty})`)
                      .join(", ")}
                  </td>
                  <td>{order.dyeColor}</td>
                  <td>
                    <button
                      className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-700"
                      onClick={() => handleViewDetails(order)} // Call the function to set the selected order
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
        {selectedOrder && (
          <div className="bg-zinc-900 p-6 mt-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
              <p><strong>Customer:</strong> {users[selectedOrder.user] || "N/A"}</p>
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
