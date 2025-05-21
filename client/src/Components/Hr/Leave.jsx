import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const LeaveManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    empId: "",
    empName: "",
    department: "",
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
    approvedBy: "",
    approvedDate: ""
  });

  // Leave type options
  const leaveTypes = [
    { value: "Casual", label: "Casual Leave" },
    { value: "Sick", label: "Sick Leave" },
    { value: "Annual", label: "Annual Leave" },
    { value: "Unpaid", label: "Unpaid Leave" },
    { value: "Maternity", label: "Maternity Leave" },
    { value: "Paternity", label: "Paternity Leave" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employee data
        const empRes = await axios.get("https://packing-exporting-website.onrender.com/api/dye-emp");
        setEmployees(empRes.data);
        
        // For demo purposes, generate some sample leave requests
        // In production, you would fetch this from your API
        const demoLeaveRequests = [
          {
            id: "LR001",
            empId: empRes.data[0]?.Emp_ID || "EMP001",
            empName: empRes.data[0]?.Emp_Name || "John Doe",
            department: empRes.data[0]?.Dept || "Dyeing",
            leaveType: "Sick",
            startDate: "2025-05-20",
            endDate: "2025-05-22",
            days: 3,
            reason: "Medical treatment",
            status: "Approved",
            approvedBy: "HR Manager",
            approvedDate: "2025-05-18",
            comments: "Approved with pay"
          },
          {
            id: "LR002",
            empId: empRes.data[1]?.Emp_ID || "EMP002",
            empName: empRes.data[1]?.Emp_Name || "Jane Smith",
            department: empRes.data[1]?.Dept || "Production",
            leaveType: "Casual",
            startDate: "2025-05-25",
            endDate: "2025-05-25",
            days: 1,
            reason: "Personal work",
            status: "Pending",
            approvedBy: "",
            approvedDate: "",
            comments: ""
          },
          {
            id: "LR003",
            empId: empRes.data[2]?.Emp_ID || "EMP003",
            empName: empRes.data[2]?.Emp_Name || "Robert Johnson",
            department: empRes.data[2]?.Dept || "Quality&Packing",
            leaveType: "Annual",
            startDate: "2025-06-01",
            endDate: "2025-06-10",
            days: 10,
            reason: "Family vacation",
            status: "Rejected",
            approvedBy: "HR Manager",
            approvedDate: "2025-05-15",
            comments: "Busy production period"
          }
        ];
        
        setLeaveRequests(demoLeaveRequests);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate number of days between two dates
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
    return diffDays;
  };

  // Handle employee selection
  const handleEmployeeChange = (empId) => {
    const selectedEmp = employees.find(emp => emp.Emp_ID === empId);
    if (selectedEmp) {
      setSelectedEmployee(empId);
      setNewLeaveRequest({
        ...newLeaveRequest,
        empId: selectedEmp.Emp_ID,
        empName: selectedEmp.Emp_Name,
        department: selectedEmp.Dept
      });
    }
  };

  // Handle submission of new leave request
  const handleSubmitLeaveRequest = () => {
    // Validate form data
    if (!newLeaveRequest.empId || !newLeaveRequest.startDate || !newLeaveRequest.endDate || !newLeaveRequest.reason) {
      alert("Please fill all required fields");
      return;
    }

    const days = calculateDays(newLeaveRequest.startDate, newLeaveRequest.endDate);
    
    // Create new leave request
    const newRequest = {
      id: `LR${String(leaveRequests.length + 1).padStart(3, '0')}`,
      ...newLeaveRequest,
      days,
      status: "Pending",
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to leave requests
    setLeaveRequests([...leaveRequests, newRequest]);
    
    // Clear form and close modal
    setNewLeaveRequest({
      empId: "",
      empName: "",
      department: "",
      leaveType: "Casual",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
      approvedBy: "",
      approvedDate: ""
    });
    setSelectedEmployee("");
    setShowModal(false);
  };

  // Update leave request status
  const updateLeaveStatus = (id, status) => {
    const updatedRequests = leaveRequests.map(request => {
      if (request.id === id) {
        return {
          ...request,
          status,
          approvedBy: "HR Manager",
          approvedDate: new Date().toISOString().split('T')[0]
        };
      }
      return request;
    });
    
    setLeaveRequests(updatedRequests);
  };

  // Table styling classes
  const thClass = "px-4 py-2 text-sm font-semibold text-left text-gray-200";
  const tdClass = "px-4 py-2 text-sm text-white";

  // Filter leave requests by status
  const pendingRequests = leaveRequests.filter(req => req.status === "Pending");
  const approvedRequests = leaveRequests.filter(req => req.status === "Approved");
  const rejectedRequests = leaveRequests.filter(req => req.status === "Rejected");

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Leave Management</h1>
              <p className="text-white">Manage employee leave requests and approvals.</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              New Leave Request
            </button>
          </div>
        </header>

        {/* Leave Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Pending Requests</h3>
            <p className="text-2xl text-white">{pendingRequests.length}</p>
            <small className="text-white">Awaiting approval</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Approved Leaves</h3>
            <p className="text-2xl text-white">{approvedRequests.length}</p>
            <small className="text-white">For current month</small>
          </div>
          <div className="bg-zinc-900 p-4 shadow rounded">
            <h3 className="font-semibold text-lg text-white">Rejected Requests</h3>
            <p className="text-2xl text-white">{rejectedRequests.length}</p>
            <small className="text-white">Not approved</small>
          </div>
        </section>

        {/* Leave Requests Table */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Pending Leave Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-[#2c2c2c]">
                <tr>
                  <th className={thClass}>ID</th>
                  <th className={thClass}>Employee</th>
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Leave Type</th>
                  <th className={thClass}>Duration</th>
                  <th className={thClass}>Days</th>
                  <th className={thClass}>Reason</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className={tdClass + " text-center"}>Loading leave requests...</td>
                  </tr>
                ) : pendingRequests.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={tdClass + " text-center"}>No pending leave requests</td>
                  </tr>
                ) : (
                  pendingRequests.map(request => (
                    <tr key={request.id} className="border-b border-[#333]">
                      <td className={tdClass}>{request.id}</td>
                      <td className={tdClass}>{request.empName}</td>
                      <td className={tdClass}>{request.department}</td>
                      <td className={tdClass}>{request.leaveType}</td>
                      <td className={tdClass}>
                        {request.startDate} to {request.endDate}
                      </td>
                      <td className={tdClass}>{request.days}</td>
                      <td className={tdClass}>{request.reason}</td>
                      <td className={tdClass}>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => updateLeaveStatus(request.id, "Approved")}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateLeaveStatus(request.id, "Rejected")}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Leave History Section */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Leave History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-[#2c2c2c]">
                <tr>
                  <th className={thClass}>ID</th>
                  <th className={thClass}>Employee</th>
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Leave Type</th>
                  <th className={thClass}>Duration</th>
                  <th className={thClass}>Days</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Approved By</th>
                  <th className={thClass}>Comments</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className={tdClass + " text-center"}>Loading leave history...</td>
                  </tr>
                ) : leaveRequests.filter(req => req.status !== "Pending").length === 0 ? (
                  <tr>
                    <td colSpan="9" className={tdClass + " text-center"}>No leave history found</td>
                  </tr>
                ) : (
                  leaveRequests
                    .filter(req => req.status !== "Pending")
                    .map(request => (
                      <tr key={request.id} className="border-b border-[#333]">
                        <td className={tdClass}>{request.id}</td>
                        <td className={tdClass}>{request.empName}</td>
                        <td className={tdClass}>{request.department}</td>
                        <td className={tdClass}>{request.leaveType}</td>
                        <td className={tdClass}>
                          {request.startDate} to {request.endDate}
                        </td>
                        <td className={tdClass}>{request.days}</td>
                        <td className={tdClass}>
                          <span
                            className={`text-sm px-3 py-1 rounded-full ${
                              request.status === "Approved" ? "bg-green-600" : "bg-red-600"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className={tdClass}>{request.approvedBy}</td>
                        <td className={tdClass}>{request.comments}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Leave Request Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-bold text-white mb-4">
                New Leave Request
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Employee</label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => handleEmployeeChange(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.Emp_ID} value={emp.Emp_ID}>
                        {emp.Emp_Name} - {emp.Dept}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Leave Type</label>
                  <select
                    value={newLeaveRequest.leaveType}
                    onChange={(e) => setNewLeaveRequest({...newLeaveRequest, leaveType: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                  >
                    {leaveTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newLeaveRequest.startDate}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, startDate: e.target.value})}
                      className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newLeaveRequest.endDate}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, endDate: e.target.value})}
                      className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Reason for Leave</label>
                  <textarea
                    value={newLeaveRequest.reason}
                    onChange={(e) => setNewLeaveRequest({...newLeaveRequest, reason: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 text-white rounded"
                    rows="3"
                  ></textarea>
                </div>
                
                {newLeaveRequest.startDate && newLeaveRequest.endDate && (
                  <div className="bg-zinc-800 p-3 rounded">
                    <p className="text-sm text-white">
                      Total Days: <span className="font-bold">
                        {calculateDays(newLeaveRequest.startDate, newLeaveRequest.endDate)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitLeaveRequest}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LeaveManagement;