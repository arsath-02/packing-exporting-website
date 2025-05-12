import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    if (formData.employeeType === "staff") {
      setFormData((prev) => ({ ...prev, pf: true, esi: true }));
    } else if (formData.employeeType === "worker") {
      setFormData((prev) => ({ ...prev, pf: false, esi: false }));
    }
  }, [formData.employeeType]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl text-center font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="block text-l font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-l font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Insert Email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-l font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-l font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-l font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-l font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-l font-medium text-gray-700">Department</label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dept_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Type */}
          <div>
            <label className="block text-l font-medium text-gray-700">Employee Type</label>
            <select
              name="employmentType"
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  employeeType: value,
                  employmentType: value, // Fixed: correctly setting employmentType
                  pf: value === "staff",
                  esi: value === "staff",
                }));
              }}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="staff">Staff</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          

          {/* PF */}
          <div>
            <label className="inline-flex items-center mt-4">
              <input
                type="checkbox"
                name="pf"
                checked={formData.pf || false}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pf: e.target.checked }))
                }
                className="form-checkbox h-5 w-5 text-teal-600"
              />
              <span className="ml-2 text-gray-700">Provident Fund (PF)</span>
            </label>
          </div>

          {/* ESI */}
          <div>
            <label className="inline-flex items-center mt-4">
              <input
                type="checkbox"
                name="esi"
                checked={formData.esi || false}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, esi: e.target.checked }))
                }
                className="form-checkbox h-5 w-5 text-teal-600"
              />
              <span className="ml-2 text-gray-700">Employee State Insurance (ESI)</span>
            </label>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-l font-medium text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-l font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Phone Number */}
            {/* Phone */}
<div>
  <label className="block text-l font-medium text-gray-700">Phone</label>
  <input
    type="text"
    name="phone"
    onChange={handleChange}
    placeholder="Phone Number"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
  />
</div>


            {/* Date of Joining */}
            <div>
              <label className="block text-l font-medium text-gray-700">Date of Joining</label>
              <input
                type="date"
                name="dateOfJoining"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-l font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                onChange={handleChange}
                rows={3}
                placeholder="Enter full address"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

          {/* Role */}
          <div>
            <label className="block text-l font-medium text-gray-700">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-l font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full"
              required
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
