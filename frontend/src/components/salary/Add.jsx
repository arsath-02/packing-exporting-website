import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    setLoading(true);
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
    setLoading(false);
    // Reset selected employee when department changes
    setSelectedEmployee(null);
    setSalary(prev => ({
      ...prev,
      employeeId: "",
      basicSalary: 0
    }));
  };

  const handleEmployeeSelect = async (e) => {
    const selectedId = e.target.value;
    
    if (!selectedId) {
      setSelectedEmployee(null);
      setSalary(prev => ({
        ...prev,
        employeeId: "",
        basicSalary: 0
      }));
      return;
    }

    try {
      setLoading(true);
      // Fetch the complete employee details to get salary and employment type
      const response = await axios.get(
        `http://localhost:5000/api/employee/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const employeeData = response.data.employee;
        setSelectedEmployee(employeeData);
        
        // Set the employee's stored salary as the basicSalary
        setSalary(prev => ({
          ...prev,
          employeeId: selectedId,
          basicSalary: employeeData.salary || 0
        }));
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
      alert("Failed to fetch employee details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateNetSalary = () => {
    const basic = Number(salary.basicSalary) || 0;
    const allowances = Number(salary.allowances) || 0;
    const deductions = Number(salary.deductions) || 0;
    return basic + allowances - deductions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!salary.employeeId) {
      alert("Please select an employee");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Salary added successfully!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while adding salary");
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl text-center font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-l font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
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

              {/* Employee */}
              <div>
                <label className="block text-l font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleEmployeeSelect}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                  disabled={loading || employees.length === 0}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId} - {emp.userId?.name || "Unknown"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee Details Section */}
              {selectedEmployee && (
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-md mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Employee Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">ID: <span className="font-medium">{selectedEmployee.employeeId}</span></p>
                      <p className="text-sm text-gray-600">Name: <span className="font-medium">{selectedEmployee.userId?.name || "Unknown"}</span></p>
                      <p className="text-sm text-gray-600">Designation: <span className="font-medium">{selectedEmployee.designation}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type: <span className="font-medium capitalize">{selectedEmployee.employmentType}</span></p>
                      <p className="text-sm text-gray-600">Base Salary: <span className="font-medium">₹{selectedEmployee.salary}</span></p>
                      <p className="text-sm text-gray-600">
                        Benefits: <span className="font-medium">
                          {selectedEmployee.pf ? "PF, " : ""}{selectedEmployee.esi ? "ESI" : ""}
                          {!selectedEmployee.pf && !selectedEmployee.esi && "None"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Basic Salary */}
              <div>
                <label className="block text-l font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={salary.basicSalary}
                  onChange={handleChange}
                  placeholder="Basic Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Auto-filled from employee record
                </p>
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-l font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  value={salary.allowances}
                  onChange={handleChange}
                  placeholder="Allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-l font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  value={salary.deductions}
                  onChange={handleChange}
                  placeholder="Deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-l font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  value={salary.payDate}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Net Salary (Calculated) */}
              <div className="md:col-span-2 bg-blue-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-medium text-gray-800">
                    Net Salary:
                  </label>
                  <span className="text-xl font-bold text-blue-700">
                    ₹{calculateNetSalary()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  (Basic Salary + Allowances - Deductions)
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 text-xl bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
              disabled={loading || !salary.employeeId}
            >
              {loading ? "Loading..." : "Add Salary"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          <span className="ml-3 text-lg text-gray-700">Loading...</span>
        </div>
      )}
    </>
  );
};

export default Add;