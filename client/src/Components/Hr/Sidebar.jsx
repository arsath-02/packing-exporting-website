import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCheckCircle, FaShippingFast, FaUsers } from 'react-icons/fa';


const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/Hr/dashboard' },
    { name: 'Employee Directory', icon: <FaCheckCircle />, path: '/Hr/employee-dir' },
    { name: 'Attendance', icon: <FaShippingFast />, path:'/Hr/attendance'}
  ];

  return (
    <div className="bg-black text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Garment Order Processing System</h2>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition ${
              location.pathname === item.path ? 'bg-gray-800' : ''
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

