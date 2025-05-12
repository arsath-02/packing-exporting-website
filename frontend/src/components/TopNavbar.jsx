import { Link } from "react-router-dom";
import { useState } from "react";

const TopNavbar = ({ role }) => {
  const [open, setOpen] = useState(false);

  const handleProfileClick = () => {
    setOpen(!open);
  };

  const handleCloseDropdown = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-16 bg-blue-700 flex items-center justify-between px-6 text-white relative">
      {/* Logo */}
      <div className="text-2xl font-bold">EMS</div>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>

        {/* Admin Dashboard Links */}
        {/* {role === "admin" && (
          <>
            <Link to="/admin/manage-employee" className="hover:underline">Manage Employee</Link>
            <Link to="/admin/manage-attendance" className="hover:underline">Manage Attendance</Link>
            <Link to="/admin/manage-leaves" className="hover:underline">Manage Leaves</Link>
            <Link to="/admin/manage-notices" className="hover:underline">Manage Notices</Link>
            <Link to="/admin/payroll" className="hover:underline">Payroll</Link>
          </>
        )} */}

        {/* Employee Dashboard Links
        {role === "employee" && (
          <>
            <Link to="/employee/my-attendance" className="hover:underline">My Attendance</Link>
            <Link to="/employee/apply-leave" className="hover:underline">Apply Leave</Link>
            <Link to="/employee/payroll-info" className="hover:underline">Payroll Info</Link>
            <Link to="/employee/notice-board" className="hover:underline">Notice Board</Link>
            <Link to="/employee/my-profile" className="hover:underline">My Profile</Link>
          </>
        )} */}

        {/* Profile Picture */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={handleProfileClick}
          />

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <div className="p-4 border-b font-bold">User Name</div>
              <Link onClick={handleCloseDropdown} to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
              <Link onClick={handleCloseDropdown} to="/login" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
