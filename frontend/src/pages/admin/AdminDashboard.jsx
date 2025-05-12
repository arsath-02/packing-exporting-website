// src/pages/admin/AdminDashboard.jsx
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import employeeImg from "../../assets/employee-management.jpg";
import attendanceImg from"../..//assets/attendance-management.jpg";
import leavesImg from"../../assets/leave-management.jpg";
import noticesImg from"../../assets/notice-management.jpg";
import payrollImg from"../../assets/payroll-management.jpg";
const AdminDashboard = () => {
  const functions = [
    {
      title: "Manage Employees",
      description: "Add, update or remove employees.",
      link: "/admin/manage-employee",
      image: employeeImg,
    },
    {
      title: "Manage Attendance",
      description: "View and edit employee attendance.",
      link: "/admin/manage-attendance",
      image: attendanceImg,
    },
    {
      title: "Manage Leaves",
      description: "Approve or reject leave requests.",
      link: "/admin/manage-leaves",
      image: leavesImg,
    },
    {
      title: "Manage Notices",
      description: "Post announcements for employees.",
      link: "/admin/manage-notices",
      image: noticesImg,
    },
    {
      title: "Manage Payroll",
      description: "Handle salary and compensation details.",
      link: "/admin/payroll",
      image: payrollImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar role="admin" />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome Admin! Choose an option to manage:</p>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {functions.map((item, index) => (
            <Link key={index} to={item.link}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                {/* Card Title */}
                <h2 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h2>
                
                {/* Card Description */}
                <p className="text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;