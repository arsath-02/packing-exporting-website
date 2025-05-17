import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Salary = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salaryData, setSalaryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState({
    basicSalary: 0,
    daysWorked: 0,
    overtime: 0,
    bonus: 0,
    deductions: 0,
    comments: "",
  });

  // Constants for salary calculation
  const WORKING_DAYS_PER_MONTH = 26;
  const BASE_SALARY = {
    Supervisor: 40000,
    Employee: 25000,
  };
  const OVERTIME_RATE = 1.5; // 1.5x of basic daily rate

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dye-emp");
        setEmployees(res.data);
        
        // Generate initial salary data
        const initialSalaryData = res.data.map(emp => ({
          empId: emp.Emp_ID,
          empName: emp.Emp_Name,
          department: emp.Dept,
          position: emp.position,
          status: emp.Status,
          basicSalary: BASE_SALARY[emp.position] || 25000,
          daysWorked: emp.Status === "Active" ? WORKING_DAYS_PER_MONTH : 0,
          overtime: 0,
          bonus: 0,
          deductions: 0,
          netSalary: calculateNetSalary(
            BASE_SALARY[emp.position] || 25000,
            emp.Status === "Active" ? WORKING_DAYS_PER_MONTH : 0,
            0, 0, 0
          ),
          isPaid: false,
          month: selectedMonth,
          year: selectedYear
        }));
        
        setSalaryData(initialSalaryData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedMonth, selectedYear]);

  // Calculate net salary based on inputs
  const calculateNetSalary = (basic, daysWorked, overtime, bonus, deductions) => {
    const dailyRate = basic / WORKING_DAYS_PER_MONTH;
    const basicEarning = dailyRate * daysWorked;
    const overtimePay = dailyRate * OVERTIME_RATE * overtime;
    return basicEarning + overtimePay + bonus - deductions;
  };

  // Update salary details when the modal form is submitted
  const handleUpdateSalary = () => {
    if (!currentEmployee) return;
    
    const updatedSalaryData = salaryData.map(item => {
      if (item.empId === currentEmployee.empId) {
        const netSalary = calculateNetSalary(
          salaryDetails.basicSalary,
          salaryDetails.daysWorked,
          salaryDetails.overtime,
          salaryDetails.bonus,
          salaryDetails.deductions
        );
        
        return {
          ...item,
          basicSalary: salaryDetails.basicSalary,
          daysWorked: salaryDetails.daysWorked,
          overtime: salaryDetails.overtime,
          bonus: salaryDetails.bonus,
          deductions: salaryDetails.deductions,
          comments: salaryDetails.comments,
          netSalary
        };
      }
      return item;
    });
    
    setSalaryData(updatedSalaryData);
    setShowModal(false);
  };

  // Handle opening the edit modal for an employee
  const handleEditSalary = (employee) => {
    setCurrentEmployee(employee);
    setSalaryDetails({
      basicSalary: employee.basicSalary,
      daysWorked: employee.daysWorked,
      overtime: employee.overtime,
      bonus: employee.bonus,
      deductions: employee.deductions,
      comments: employee.comments || "",
    });
    setShowModal(true);
  };

  // Mark a salary as paid
  const markAsPaid = (empId) => {
    const updatedSalaryData = salaryData.map(item => {
      if (item.empId === empId) {
        return {
          ...item,
          isPaid: true,
          paidDate: new Date().toISOString()
        };
      }
      return item;
    });
    
    setSalaryData(updatedSalaryData);
  };

  // Generate a salary report in CSV format
  const generateSalaryReport = () => {
    const header = [
      "Employee ID", 
      "Name", 
      "Department", 
      "Position", 
      "Days Worked", 
      "Basic Salary", 
      "Overtime Pay", 
      "Bonus", 
      "Deductions", 
      "Net Salary",
      "Payment Status"
    ];
    
    const rows = salaryData.map(item => [
      item.empId,
      item.empName,
      item.department,
      item.position,
      item.daysWorked,
      item.basicSalary,
      item.overtime * (item.basicSalary / WORKING_DAYS_PER_MONTH) * OVERTIME_RATE,
      item.bonus,
      item.deductions,
      item.netSalary,
      item.isPaid ? "Paid" : "Pending"
    ]);
    
    const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `salary_report_${selectedMonth+1}_${selectedYear}.csv`;
    link.click();
  };

  // Month names for dropdown
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Years for dropdown (current year and previous 2 years)
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  // Table classes
  const thClass = "px-4 py-2 text-sm font-semibold text-left text-gray-200";
  const tdClass = "px-4 py-2 text-sm text-white";

  // Calculate summary stats
  const totalSalaries = salaryData.reduce((sum, emp) => sum + emp.netSalary, 0);
  const totalPaid = salaryData.filter(emp => emp.isPaid).reduce((sum, emp) => sum + emp.netSalary, 0);
  const totalPending = totalSalaries - totalPaid;

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Salary Management</h1>
              <p className="text-white">Calculate and process employee salaries based on attendance and performance.</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </header>

        {/* Salary Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Total Payroll</h3>
            <p className="text-2xl text-white">₹{totalSalaries.toLocaleString()}</p>
            <small className="text-white">Current month</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Paid Salaries</h3>
            <p className="text-2xl text-white">₹{totalPaid.toLocaleString()}</p>
            <small className="text-white">{salaryData.filter(emp => emp.isPaid).length} employees</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Pending Payments</h3>
            <p className="text-2xl text-white">₹{totalPending.toLocaleString()}</p>
            <small className="text-white">{salaryData.filter(emp => !emp.isPaid).length} employees</small>
          </div>
        </section>

        {/* Month/Year Filter and Report Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <select 
              className="border p-2 rounded bg-zinc-800 text-white"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select 
              className="border p-2 rounded bg-zinc-800 text-white"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="space-x-2">
            <button 
              onClick={generateSalaryReport} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate Salary Report
            </button>
          </div>
        </div>

        {/* Salary Table */}
        <section className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-[#2c2c2c]">
                <tr>
                  <th className={thClass}>ID</th>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Position</th>
                  <th className={thClass}>Days Worked</th>
                  <th className={thClass}>Overtime</th>
                  <th className={thClass}>Net Salary</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className={tdClass + " text-center"}>Loading salary data...</td>
                  </tr>
                ) : (
                  salaryData.map((emp) => (
                    <tr key={emp.empId} className="border-b border-[#333]">
                      <td className={tdClass}>{emp.empId}</td>
                      <td className={tdClass}>{emp.empName}</td>
                      <td className={tdClass}>{emp.department}</td>
                      <td className={tdClass}>{emp.position}</td>
                      <td className={tdClass}>{emp.daysWorked}</td>
                      <td className={tdClass}>{emp.overtime} hrs</td>
                      <td className={tdClass}>₹{emp.netSalary.toLocaleString()}</td>
                      <td className={tdClass}>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            emp.isPaid ? "bg-green-600" : "bg-yellow-600"
                          }`}
                        >
                          {emp.isPaid ? "Paid" : "Pending"}
                        </span>
                      </td>
                      <td className={tdClass}>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditSalary(emp)}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          {!emp.isPaid && (
                            <button 
                              onClick={() => markAsPaid(emp.empId)}
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Edit Salary Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">
                Edit Salary - {currentEmployee?.empName}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Basic Salary</label>
                  <input
                    type="number"
                    value={salaryDetails.basicSalary}
                    onChange={(e) => setSalaryDetails({...salaryDetails, basicSalary: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Days Worked (out of {WORKING_DAYS_PER_MONTH})</label>
                  <input
                    type="number"
                    min="0"
                    max={WORKING_DAYS_PER_MONTH}
                    value={salaryDetails.daysWorked}
                    onChange={(e) => setSalaryDetails({...salaryDetails, daysWorked: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Overtime Hours</label>
                  <input
                    type="number"
                    min="0"
                    value={salaryDetails.overtime}
                    onChange={(e) => setSalaryDetails({...salaryDetails, overtime: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Bonus</label>
                  <input
                    type="number"
                    min="0"
                    value={salaryDetails.bonus}
                    onChange={(e) => setSalaryDetails({...salaryDetails, bonus: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Deductions</label>
                  <input
                    type="number"
                    min="0"
                    value={salaryDetails.deductions}
                    onChange={(e) => setSalaryDetails({...salaryDetails, deductions: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Comments</label>
                  <textarea
                    value={salaryDetails.comments}
                    onChange={(e) => setSalaryDetails({...salaryDetails, comments: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                    rows="2"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Calculated Net Salary</label>
                  <div className="w-full px-3 py-2 bg-zinc-700 text-white rounded font-bold">
                    ₹{calculateNetSalary(
                      salaryDetails.basicSalary,
                      salaryDetails.daysWorked,
                      salaryDetails.overtime,
                      salaryDetails.bonus,
                      salaryDetails.deductions
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateSalary}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Update Salary
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Salary;