// src/pages/employee/PayrollInfoPage.jsx
import React from "react";
import TopNavbar from "../../components/TopNavbar"; // Import TopNavbar component
import salaryIcon from "../../assets/salaryIcon.jpg"; // Example of importing image
import historyIcon from "../../assets/historyIcon.png"; // Example of importing image

const PayrollInfoPage = () => {
  const payrollData = {
    basicSalary: 3000,
    bonus: 500,
    deductions: 200,
    totalSalary: 3300,
    leaveDeductions: 100,  // Hardcoded for now, can fetch from back-end
    presentDays: 22,
    absentDays: 3,
    leaveDaysTaken: 5,
    salaryDetails: [
      { label: "Basic Salary", value: 3000 },
      { label: "Bonus", value: 500 },
      { label: "Deductions", value: 200 },
      { label: "Leave Deductions", value: 100 },
    ],
  };

  // Sample previous payroll history
  const previousPayrolls = [
    { month: "January", totalSalary: 3200 },
    { month: "February", totalSalary: 3300 },
    { month: "March", totalSalary: 3300 },
  ];

  const handleDownloadPayslip = () => {
    alert("Payslip download feature coming soon! 💻💥");
    // Later you can use a library like jsPDF to generate and download PDF payslips.
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNavbar role="employee" /> {/* Show TopNavbar for employee role */}
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Payroll Info 💵</h1>

        {/* Salary Details Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <img src={salaryIcon} alt="Salary Icon" className="w-12 h-12 mr-4" />
            <h2 className="text-3xl font-semibold text-blue-700">Salary Details 📊</h2>
          </div>
          
          <div className="space-y-4">
            {payrollData.salaryDetails.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium text-gray-700">{item.label}:</span>
                <span className="font-bold text-blue-600">${item.value}</span>
              </div>
            ))}
            <div className="flex justify-between border-t-2 pt-4">
              <span className="font-medium text-gray-700">Total Salary:</span>
              <span className="font-bold text-green-600">${payrollData.totalSalary}</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleDownloadPayslip}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg transition-all hover:bg-blue-800"
            >
              Download Payslip 📄
            </button>
          </div>
        </div>

        {/* Payroll History Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <img src={historyIcon} alt="History Icon" className="w-12 h-12 mr-4" />
            <h2 className="text-3xl font-semibold text-blue-700">Payroll History 🗓️</h2>
          </div>

          <ul className="space-y-4">
            {previousPayrolls.map((payroll, index) => (
              <li key={index} className="flex justify-between text-lg font-medium">
                <span>{payroll.month}</span>
                <span>${payroll.totalSalary}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Attendance Summary Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Attendance Summary 📝</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-xl font-medium">Present Days</h3>
              <p className="text-2xl font-bold text-green-600">{payrollData.presentDays}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-medium">Absent Days</h3>
              <p className="text-2xl font-bold text-yellow-600">{payrollData.absentDays}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="text-xl font-medium">Leave Days Taken</h3>
              <p className="text-2xl font-bold text-red-600">{payrollData.leaveDaysTaken}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollInfoPage;
