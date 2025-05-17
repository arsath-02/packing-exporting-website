import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios'; // Make sure axios is installed: npm install axios

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const departments = ['Dyeing', 'Production', 'Quality&Packing'];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dye-emp'); // Update this path if different
        setEmployees(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const totalEmployees = employees.length;
  const presentCount = employees.filter(e => e.Status === 'Active').length;
  const supervisors = employees.filter(e => e.position === 'Supervisor').length;
  const operators = employees.filter(e => e.position === 'Employee').length;

  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
  Emp_ID: '',
  Emp_Name: '',
  Dept: '',
  position: '',
  Status: 'Active',
});

const handleAddEmployee = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/dye-emp/add', newEmployee);
    setEmployees(prev => [...prev, res.data]);
    setShowModal(false);
    setNewEmployee({
      Emp_ID: '',
      Emp_Name: '',
      Dept: '',
      position: '',
      Status: 'Active',
    });
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};


  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <p className="text-gray-400">Manage employees, attendance, and payroll.</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
            >
              Add Employee
            </button>

          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-gray-400">Loading employee data...</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatCard label="Total Employees" value={totalEmployees} desc="Across all departments" />
              <StatCard label="Present Today" value={presentCount} desc={`${Math.round((presentCount / totalEmployees) * 100)}% attendance rate`} />
              <StatCard label="Supervisors" value={supervisors} desc="Department leaders" />
              <StatCard label="Operators" value={operators} desc="Production staff" />
            </div>

            {/* Department Tables */}
            {departments.map((dept) => {
              const deptEmployees = employees.filter(emp => emp.Dept === dept);
              if (deptEmployees.length === 0) return null;

              return (
                <div key={dept} className="mt-12">
                  <h2 className="text-xl font-semibold mb-4">
                    {dept === 'Quality&Packing' ? 'Quality & Packing Department' : `${dept} Department`}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                      <thead className="bg-[#2c2c2c]">
                        <tr>
                          <th className={thClass}>ID</th>
                          <th className={thClass}>Name</th>
                          <th className={thClass}>Department</th>
                          <th className={thClass}>Position</th>
                          <th className={thClass}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deptEmployees.map(emp => (
                          <tr key={emp._id || emp.Emp_ID} className="border-b border-[#333]">
                            <td className={tdClass}>{emp.Emp_ID}</td>
                            <td className={tdClass}>{emp.Emp_Name}</td>
                            <td className={tdClass}>{emp.Dept}</td>
                            <td className={tdClass}>{emp.position}</td>
                            <td className={tdClass}>
                              <span className={`text-sm px-3 py-1 rounded-full ${emp.Status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}>
                                {emp.Status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Employee ID"
          value={newEmployee.Emp_ID}
          onChange={(e) => setNewEmployee({ ...newEmployee, Emp_ID: e.target.value })}
          className="w-full px-3 py-2 bg-[#2c2c2c] rounded text-white"
        />
        <input
          type="text"
          placeholder="Employee Name"
          value={newEmployee.Emp_Name}
          onChange={(e) => setNewEmployee({ ...newEmployee, Emp_Name: e.target.value })}
          className="w-full px-3 py-2 bg-[#2c2c2c] rounded text-white"
        />
        <select
          value={newEmployee.Dept}
          onChange={(e) => setNewEmployee({ ...newEmployee, Dept: e.target.value })}
          className="w-full px-3 py-2 bg-[#2c2c2c] rounded text-white"
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          className="w-full px-3 py-2 bg-[#2c2c2c] rounded text-white"
        >
          <option value="">Select Position</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
          Cancel
        </button>
        <button onClick={handleAddEmployee} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">
          Add
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

const StatCard = ({ label, value, desc }) => (
  <div className="bg-[#1f1f1f] p-5 rounded-lg min-w-[180px]">
    <h3 className="text-xl font-semibold">{value}</h3>
    <p className="text-sm mt-1">{label}</p>
    <p className="text-xs text-gray-400 mt-1">{desc}</p>
  </div>
);

const thClass = "py-3 px-4 font-bold text-white";
const tdClass = "py-3 px-4";

export default EmployeeManagement;
