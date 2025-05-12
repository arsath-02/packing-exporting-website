import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const EmployeeAttendanceDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [departments, setDepartments] = useState({});
  const [employeeeId, setEmployeeId] = useState(localStorage.getItem("employeeId"));


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const deptObj = {};
          response.data.departments.forEach(dept => {
            deptObj[dept._id] = dept.dept_name;
          });
          setDepartments(deptObj);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
  
        // const loggedInEmployeeId = localStorage.getItem("employeeId");
  
        const response = await axios.get(`http://localhost:5000/api/attendance/${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.data.success && response.data.attendanceRecords) {
          const filteredRecords = response.data.attendanceRecords.filter(
            (record) => record.employeeId === employeeeId
          );
  
          const processedRecords = filteredRecords.map((record) => {
            let statusDisplay = "Absent";
            if (record.status === "present_full") {
              statusDisplay = "Present (Full Day)";
            } else if (record.status === "present_first_half") {
              statusDisplay = "Present (1st Half)";
            } else if (record.status === "present_second_half") {
              statusDisplay = "Present (2nd Half)";
            }
  
            return {
              employeeId: record.employeeId,
              name: record.name || "N/A",
              department: record.department,
              departmentName: departments[record.department] || "Unknown",
              status: record.status,
              statusDisplay: statusDisplay,
              date: record.date,
            };
          });
  
          setAttendanceData(processedRecords);
        } else {
          setAttendanceData([]);
        }
  
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to fetch attendance data"
        );
        setLoading(false);
      }
    };
  
    // Only fetch attendance after departments are loaded
    if (Object.keys(departments).length > 0) {
      fetchAttendanceData();
    }
  }, [selectedDate, departments]);
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const getStatusClass = (status) => {
    if (status === 'present_full') return 'bg-green-100 text-green-800';
    if (status === 'present_first_half' || status === 'present_second_half') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const fullDayCount = attendanceData.filter(record => record.status === 'present_full').length;
  const halfDayCount = attendanceData.filter(record => 
    record.status === 'present_first_half' || record.status === 'present_second_half'
  ).length;
  const absentCount = attendanceData.length > 0 ? attendanceData.filter(record =>
    record.status === 'absent' || !['present_full', 'present_first_half', 'present_second_half'].includes(record.status)
  ).length : 1; // If no records, default to absent

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">My Attendance Record</h2>
          <p className="text-gray-600">View your attendance status for a specific date</p>
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center h-32 text-gray-600">Loading attendance data...</div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">Error: {error}</div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left border-b">Employee ID</th>
                  <th className="py-3 px-4 text-left border-b">Name</th>
                  <th className="py-3 px-4 text-left border-b">Department</th>
                  <th className="py-3 px-4 text-left border-b">Status</th>
                  <th className="py-3 px-4 text-left border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.length > 0 ? (
                  attendanceData.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{record.employeeId}</td>
                      <td className="py-3 px-4">{record.name}</td>
                      <td className="py-3 px-4">{record.departmentName}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(record.status)}`}>
                          {record.statusDisplay}
                        </span>
                      </td>
                      <td className="py-3 px-4">{format(new Date(record.date), 'yyyy-MM-dd')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No attendance records found for {selectedDate}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Attendance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-3 rounded-md">
                <span className="block text-sm text-gray-500">Full Day Present</span>
                <span className="text-xl font-semibold text-green-600">{fullDayCount}</span>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <span className="block text-sm text-gray-500">Half Day Present</span>
                <span className="text-xl font-semibold text-yellow-600">{halfDayCount}</span>
              </div>
              <div className="bg-red-50 p-3 rounded-md">
                <span className="block text-sm text-gray-500">Absent</span>
                <span className="text-xl font-semibold text-red-600">{absentCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendanceDashboard;
