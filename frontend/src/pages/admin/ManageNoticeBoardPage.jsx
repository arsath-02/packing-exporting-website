import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar"; // Import TopNavbar component
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // For notifications

const NoticeBoardPage = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: "Team Meeting", content: "We have a meeting tomorrow at 10 AM.", category: "Meetings" },
    { id: 2, title: "Holiday Announcement", content: "The office will be closed on Friday for a holiday.", category: "Holidays" },
    { id: 3, title: "Leave Request Reminder", content: "Employees need to submit their leave requests at least 2 days in advance.", category: "Leave Notices" },
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content || !newNotice.category) {
      toast.error("All fields are required.");
      return;
    }
    setNotices([...notices, { ...newNotice, id: notices.length + 1 }]);
    setNewNotice({ title: "", content: "", category: "" });
    toast.success("Notice added successfully!");
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
    toast.success("Notice deleted successfully!");
  };

  const handleEdit = (id) => {
    const noticeToEdit = notices.find((notice) => notice.id === id);
    setNewNotice({ ...noticeToEdit });
  };

  const categories = ["Meetings", "Holidays", "Leave Notices", "General"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <TopNavbar role="admin" />
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            📝 Manage Notices
          </h1>

          {/* Form to Add New Notice */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block text-lg font-medium mb-4">Title</label>
              <input
                type="text"
                name="title"
                value={newNotice.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-4">Content</label>
              <textarea
                name="content"
                value={newNotice.content}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-4">Category</label>
              <select
                name="category"
                value={newNotice.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="bg-blue-700 text-white py-2 px-6 rounded-md">
              Add Notice
            </button>
          </form>

          {/* All Notices Display */}
          <h2 className="text-2xl font-semibold mb-6">All Notices</h2>

          {/* Grouping Notices by Category */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {notices
                  .filter((notice) => notice.category === category)
                  .map((notice) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl"
                    >
                      <h4 className="text-lg font-semibold">{notice.title}</h4>
                      <p className="text-sm text-gray-600">{notice.content}</p>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleEdit(notice.id)}
                          className="bg-yellow-500 text-white py-1 px-4 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="bg-red-600 text-white py-1 px-4 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NoticeBoardPage;
