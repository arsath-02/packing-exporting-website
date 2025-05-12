"use client"

import { useState } from "react"
import { Calendar, Users, Briefcase, ChevronDown, Search, Clock, Filter, CheckCircle2, AlertCircle } from "lucide-react"

const ManageAttendancePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("staffs")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  // Sample data for departments
  const departments = [
    { id: "all", name: "All Departments" },
    { id: "engineering", name: "Engineering" },
    { id: "marketing", name: "Marketing" },
    { id: "finance", name: "Finance" },
    { id: "hr", name: "Human Resources" },
    { id: "operations", name: "Operations" },
  ]

  // Sample data for employees
  const staffs = [
    { id: 1, name: "Alex Johnson", department: "engineering", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Sarah Williams", department: "marketing", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Michael Brown", department: "finance", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Emily Davis", department: "hr", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "David Miller", department: "engineering", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 6, name: "Jessica Wilson", department: "marketing", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 7, name: "Robert Taylor", department: "operations", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 8, name: "Jennifer Moore", department: "finance", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const workers = [
    { id: 101, name: "James Anderson", department: "operations", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 102, name: "Patricia Thomas", department: "operations", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 103, name: "John Jackson", department: "engineering", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 104, name: "Linda White", department: "operations", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 105, name: "Robert Harris", department: "engineering", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 106, name: "Elizabeth Martin", department: "operations", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 107, name: "William Thompson", department: "operations", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 108, name: "Barbara Garcia", department: "engineering", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  // Attendance status options
  const attendanceOptions = [
    { value: "full", label: "Whole Day" },
    { value: "first-half", label: "1st Half Day" },
    { value: "second-half", label: "2nd Half Day" },
    { value: "absent", label: "Absent" },
  ]

  // Overtime options for workers
  const overtimeOptions = [
    { value: "0", label: "None" },
    { value: "1", label: "1 Hour" },
    { value: "2", label: "2 Hours" },
  ]

  // State for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState({})
  const [overtimeRecords, setOvertimeRecords] = useState({})

  // Handle attendance change
  const handleAttendanceChange = (employeeId, value) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [employeeId]: value,
    })
  }

  // Handle overtime change
  const handleOvertimeChange = (employeeId, value) => {
    setOvertimeRecords({
      ...overtimeRecords,
      [employeeId]: value,
    })
  }

  // Filter employees based on selected department and search query
  const filteredEmployees = (selectedCategory === "staffs" ? staffs : workers).filter((employee) => {
    const departmentMatch = selectedDepartment === "all" || employee.department === selectedDepartment
    const searchMatch = employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    return departmentMatch && searchMatch
  })

  // Get attendance status color
  const getStatusColor = (status) => {
    switch (status) {
      case "full":
        return "bg-emerald-100 text-emerald-800"
      case "first-half":
      case "second-half":
        return "bg-amber-100 text-amber-800"
      case "absent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white min-h-screen p-6 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Attendance</h1>
        <p className="text-gray-500 mt-1">Record and manage employee attendance</p>
      </div>

      {/* Date Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border border-gray-200 w-full md:w-auto">
          <Calendar className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Present</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Half Day</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Absent</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 w-full sm:w-auto">
          <button
            className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium ${
              selectedCategory === "staffs" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setSelectedCategory("staffs")}
          >
            <Briefcase className="h-4 w-4" />
            <span>Staffs</span>
          </button>
          <button
            className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium ${
              selectedCategory === "workers" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setSelectedCategory("workers")}
          >
            <Users className="h-4 w-4" />
            <span>Workers</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter className="w-4 h-4 text-gray-500" />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees..."
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Attendance Status
                </th>
                {selectedCategory === "workers" && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Overtime
                  </th>
                )}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={employee.avatar || "/placeholder.svg"} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">ID: {employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block w-full">
                        <select
                          value={attendanceRecords[employee.id] || ""}
                          onChange={(e) => handleAttendanceChange(employee.id, e.target.value)}
                          className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          {attendanceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </td>
                    {selectedCategory === "workers" && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative inline-block w-full">
                          <select
                            value={overtimeRecords[employee.id] || ""}
                            onChange={(e) => handleOvertimeChange(employee.id, e.target.value)}
                            className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="" disabled>
                              Select overtime
                            </option>
                            {overtimeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {attendanceRecords[employee.id] ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attendanceRecords[employee.id])}`}
                        >
                          {attendanceRecords[employee.id] === "full" && (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Present
                            </>
                          )}
                          {attendanceRecords[employee.id] === "first-half" && "1st Half"}
                          {attendanceRecords[employee.id] === "second-half" && "2nd Half"}
                          {attendanceRecords[employee.id] === "absent" && (
                            <>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Absent
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Not Set
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={selectedCategory === "workers" ? 5 : 4}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No employees found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Clock className="mr-2 h-4 w-4" />
          Save Attendance
        </button>
      </div>
    </div>
  )
}

export default ManageAttendancePage
