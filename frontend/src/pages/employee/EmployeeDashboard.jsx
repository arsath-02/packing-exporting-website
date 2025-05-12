// src/pages/employee/EmployeeDashboard.jsx
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";

// Import your images here
import attendanceImg from "../../assets/employee-management.jpg";
import leaveImg from "../../assets/leave-management.jpg";
import payrollImg from "../../assets/payroll-management.jpg";
import noticeImg from "../../assets/notice-management.jpg";
import profileImg from "../../assets/employee-profile.png";

const EmployeeDashboard = () => {
  const functions = [
    {
      title: "My Attendance",
      description: "View your daily attendance record.",
      link: "/employee/my-attendance",
      image: attendanceImg,
    },
    {
      title: "Apply Leave",
      description: "Submit leave requests for approval.",
      link: "/employee/apply-leave",
      image: leaveImg,
    },
    {
      title: "Payroll Info",
      description: "Check your salary and benefits details.",
      link: "/employee/payroll-info",
      image: payrollImg,
    },
    {
      title: "Notice Board",
      description: "View the latest announcements from the company.",
      link: "/employee/notice-board",
      image: noticeImg,
    },
    {
      title: "My Profile",
      description: "View and edit your personal profile information.",
      link: "/employee/my-profile",
      image: profileImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar role="employee" />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Employee Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome Employee! Manage your tasks here:</p>

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

export default EmployeeDashboard;
