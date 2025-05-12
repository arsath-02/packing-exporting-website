import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const AttendanceTracker = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [attendance, setAttendance] = useState({});
  // Attendance type options: "full", "first_half", "second_half"
  const [attendanceType, setAttendanceType] = useState({});
  const [filter, setFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [departments, setDepartments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmployees(response.data.employees);

          const initialAttendance = {};
          const initialAttendanceType = {};
          response.data.employees.forEach((emp) => {
            initialAttendance[emp._id] = false;
            initialAttendanceType[emp._id] = "full"; // Default to full day
          });
          setAttendance(initialAttendance);
          setAttendanceType(initialAttendanceType);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchAttendanceForDate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance/${date}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.success && response.data.attendanceRecords) {
          const fetchedAttendance = {};
          const fetchedAttendanceType = {};
          response.data.attendanceRecords.forEach((record) => {
            fetchedAttendance[record.employeeId] = record.status.includes("present");
            
            // Extract attendance type
            if (record.status === "present_full") {
              fetchedAttendanceType[record.employeeId] = "full";
            } else if (record.status === "present_first_half") {
              fetchedAttendanceType[record.employeeId] = "first_half";
            } else if (record.status === "present_second_half") {
              fetchedAttendanceType[record.employeeId] = "second_half";
            } else {
              fetchedAttendanceType[record.employeeId] = "full"; // Default
            }
          });
          setAttendance(fetchedAttendance);
          setAttendanceType(fetchedAttendanceType);
        }
      } catch (error) {
        console.log("No existing attendance data for this date or error:", error.message);
      }
    };

    if (date) {
      fetchAttendanceForDate();
    }
  }, [date]);

  const handleAttendanceChange = (employeeId) => {
    setAttendance((prev) => ({
      ...prev,
      [employeeId]: !prev[employeeId],
    }));
  };
  
  const handleAttendanceTypeChange = (employeeId, type) => {
    setAttendanceType((prev) => ({
      ...prev,
      [employeeId]: type,
    }));
  };

  const markAllPresent = (type = "full") => {
    const updatedAttendance = {};
    const updatedAttendanceType = {};
    employees.forEach((emp) => {
      updatedAttendance[emp._id] = true;
      updatedAttendanceType[emp._id] = type;
    });
    setAttendance(updatedAttendance);
    setAttendanceType(updatedAttendanceType);
  };

  const markAllAbsent = () => {
    const updatedAttendance = {};
    employees.forEach((emp) => {
      updatedAttendance[emp._id] = false;
    });
    setAttendance(updatedAttendance);
  };

  // Fixed function to save attendance data
  // Replace this function in your AttendanceTracker.jsx file

// Replace this function in your AttendanceTracker.jsx file

const saveAttendance = async () => {
  try {
    setSavingData(true);
    setErrorMessage("");
    
    // Transform the attendance data for the API
    const attendanceData = employees.map((employee) => {
      // Ensure correct handling of employee.department which might be an object or ID
      const departmentId = typeof employee.department === 'object' 
        ? employee.department?._id 
        : employee.department;
      
      // Generate status based on presence and attendance type
      let status = "absent";
      if (attendance[employee._id]) {
        const type = attendanceType[employee._id] || "full";
        if (type === "full") {
          status = "present_full";
        } else if (type === "first_half") {
          status = "present_first_half";
        } else if (type === "second_half") {
          status = "present_second_half";
        }
      }
      
      // Make sure we have valid ObjectId values as strings
      const employeeObjectId = employee._id?.toString ? employee._id.toString() : employee._id;
      const departmentObjectId = departmentId && departmentId.toString ? departmentId.toString() : departmentId;
      
      return {
        employeeId: employeeObjectId,
        name: employee.userId?.name || "N/A",
        department: departmentObjectId,
        employmentType: employee.employmentType || "Regular",
        status: status,
        date: date
      };
    });
    
    // Create a properly structured object for the request body
    const requestData = {
      attendanceData: attendanceData,
      date: date
    };
    
    // Log the data being sent for debugging
    console.log("Sending attendance data:", requestData);
    
    const response = await axios.post(
      "http://localhost:5000/api/attendance/save",
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.success) {
      setSuccessMessage("Attendance saved successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  } catch (error) {
    console.error("Error saving attendance:", error);
    
    // Set specific error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorDetails = error.response.data?.error || error.response.data?.message || 'Unknown server error';
      setErrorMessage(`Server error: ${errorDetails}`);
      console.log("Server error details:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      setErrorMessage("No response from server. Please check your connection.");
    } else {
      // Something happened in setting up the request
      setErrorMessage(`Error: ${error.message}`);
    }
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  } finally {
    setSavingData(false);
  }
};
  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept._id === departmentId);
    return department ? department.dept_name : "Unknown";
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      (employee.userId?.name?.toLowerCase() || "").includes(filter.toLowerCase()) ||
      (employee.employeeId || "").toLowerCase().includes(filter.toLowerCase());

    // Handle department filter properly
    let matchesDepartment = false;
    if (departmentFilter === "") {
      matchesDepartment = true;
    } else {
      // Handle department as either an object or an ID
      const employeeDeptId = typeof employee.department === 'object' 
        ? employee.department?._id 
        : employee.department;
      matchesDepartment = employeeDeptId === departmentFilter;
    }
    
    return matchesSearch && matchesDepartment;
  });

  const exportToCSV = () => {
          const attendanceData = filteredEmployees.map((emp) => {
      // Handle department as either an object or an ID
      const deptId = typeof emp.department === 'object' 
        ? emp.department?._id 
        : emp.department;
      
      // Get attendance status with type
      let status = "Absent";
      if (attendance[emp._id]) {
        const type = attendanceType[emp._id] || "full";
        if (type === "full") {
          status = "Present (Full Day)";
        } else if (type === "first_half") {
          status = "Present (1st Half)";
        } else if (type === "second_half") {
          status = "Present (2nd Half)";
        }
      }
        
      return {
        "Employee ID": emp.employeeId,
        Name: emp.userId?.name || "N/A",
        Department: getDepartmentName(deptId),
        Designation: emp.designation || "N/A",
        Type: emp.employmentType,
        Status: status,
        Date: date,
      };
    });

    if (attendanceData.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(attendanceData[0]).join(",");
    const rows = attendanceData.map((obj) => Object.values(obj).join(",")).join("\n");
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${date}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Employee Attendance Tracker</h1>
      
      {successMessage && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Employee</label>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search by name or ID"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Mark All Present</span>
              <div className="flex gap-2">
                <button
                  onClick={() => markAllPresent("full")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-medium"
                >
                  Full Day
                </button>
                <button
                  onClick={() => markAllPresent("first_half")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-xs font-medium"
                >
                  1st Half
                </button>
                <button
                  onClick={() => markAllPresent("second_half")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-xs font-medium"
                >
                  2nd Half
                </button>
              </div>
            </div>
            
            <button
              onClick={markAllAbsent}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium h-fit self-end"
            >
              Mark All Absent
            </button>
            
            <button
              onClick={exportToCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium h-fit self-end"
            >
              Export to CSV
            </button>
            
            <button
              onClick={saveAttendance}
              disabled={savingData}
              className={`${
                savingData ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
              } text-white px-4 py-2 rounded-md text-sm font-medium flex items-center h-fit self-end`}
            >
              {savingData ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Attendance"
              )}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading employees...</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => {
                    // Handle department as either an object or an ID
                    const deptId = typeof employee.department === 'object' 
                      ? employee.department?._id 
                      : employee.department;
                      
                    return (
                      <tr key={employee._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {employee.employeeId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.userId?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getDepartmentName(deptId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.designation || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.employmentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                checked={attendance[employee._id] || false}
                                onChange={() => handleAttendanceChange(employee._id)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                {attendance[employee._id] ? (
                                  <span className="text-green-600">Present</span>
                                ) : (
                                  <span className="text-red-600">Absent</span>
                                )}
                              </span>
                            </label>
                            
                            {attendance[employee._id] && (
                              <div className="flex items-center space-x-2 ml-7">
                                <select
                                  value={attendanceType[employee._id] || "full"}
                                  onChange={(e) => handleAttendanceTypeChange(employee._id, e.target.value)}
                                  className="p-1 text-xs border border-gray-300 rounded"
                                  disabled={!attendance[employee._id]}
                                >
                                  <option value="full">Full Day</option>
                                  <option value="first_half">1st Half</option>
                                  <option value="second_half">2nd Half</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No employees found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50">
            <p className="text-sm text-gray-500">
              Total Employees: {filteredEmployees.length} | 
              Present: {filteredEmployees.filter(emp => attendance[emp._id]).length} (
                Full Day: {filteredEmployees.filter(emp => attendance[emp._id] && attendanceType[emp._id] === "full").length} | 
                1st Half: {filteredEmployees.filter(emp => attendance[emp._id] && attendanceType[emp._id] === "first_half").length} | 
                2nd Half: {filteredEmployees.filter(emp => attendance[emp._id] && attendanceType[emp._id] === "second_half").length}
              ) | 
              Absent: {filteredEmployees.filter(emp => !attendance[emp._id]).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;