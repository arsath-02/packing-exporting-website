// src/pages/employee/MyProfilePage.jsx
import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar"; // Import TopNavbar component

const MyProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe", // Example pre-filled data
    email: "john@example.com", // Email should not be editable
    phone: "",
    address: "",
    department: "Software Development",
    position: "Software Engineer",
    profilePicture: "", // To store the profile picture URL
  });

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Profile updated successfully! ✅");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Basic password validation
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    // Assuming current password is valid (this should be checked on backend)
    if (changePassword.currentPassword !== "oldpassword123") {
      setPasswordError("Current password is incorrect.");
      return;
    }

    // If everything is okay, simulate success
    setPasswordError("");
    setSuccessMessage("Password updated successfully! 🔐");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <TopNavbar role="employee" /> {/* Show TopNavbar for employee role */}
      <div className="container mx-auto p-6">

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4 shadow-md">
            {successMessage}
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

        <div className="flex justify-center mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
            {/* Profile Picture */}
            <div className="mb-4">
              <img
                src={profile.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500">{profile.position}</p>
            <p className="text-gray-500">{profile.department}</p>
          </div>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="block text-lg font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  className="w-full px-4 py-2 border rounded bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-lg font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium">Address</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>

        <hr className="my-8" />

        {/* Change Password Form */}
        <h2 className="text-3xl font-bold text-center mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-xl mx-auto">
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={changePassword.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={changePassword.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={changePassword.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
