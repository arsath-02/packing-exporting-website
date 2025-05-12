"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  Briefcase,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Printer,
  Download,
  CalendarDays,
  CalendarRange,
  Calculator,
} from "lucide-react"

const PayrollPage = () => {
  // State for category, employee type, and period selection
  const [selectedCategory, setSelectedCategory] = useState("staffs")
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("permanent")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

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
    {
      id: 1,
      empNo: "S001",
      name: "Alex Johnson",
      department: "engineering",
      role: "Senior Developer",
      fixedWages: 50000,
      presentDays: 22,
      shiftEarn: 2000,
      messDed: 1500,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      empNo: "S002",
      name: "Sarah Williams",
      department: "marketing",
      role: "Marketing Manager",
      fixedWages: 45000,
      presentDays: 21,
      shiftEarn: 1800,
      messDed: 1500,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      empNo: "S003",
      name: "Michael Brown",
      department: "finance",
      role: "Financial Analyst",
      fixedWages: 48000,
      presentDays: 23,
      shiftEarn: 1900,
      messDed: 1500,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      empNo: "S004",
      name: "Emily Davis",
      department: "hr",
      role: "HR Specialist",
      fixedWages: 42000,
      presentDays: 20,
      shiftEarn: 1700,
      messDed: 1500,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const workers = [
    {
      id: 101,
      empNo: "W001",
      name: "James Anderson",
      department: "operations",
      role: "Machine Operator",
      fixedWages: 25000,
      presentDays: 6,
      otHours: 8,
      shiftEarn: 1000,
      messDed: 1200,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 102,
      empNo: "W002",
      name: "Patricia Thomas",
      department: "operations",
      role: "Assembly Worker",
      fixedWages: 22000,
      presentDays: 5,
      otHours: 6,
      shiftEarn: 900,
      messDed: 1200,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 103,
      empNo: "W003",
      name: "John Jackson",
      department: "engineering",
      role: "Maintenance Technician",
      fixedWages: 28000,
      presentDays: 6,
      otHours: 10,
      shiftEarn: 1100,
      messDed: 1200,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 104,
      empNo: "W004",
      name: "Linda White",
      department: "operations",
      role: "Quality Inspector",
      fixedWages: 24000,
      presentDays: 5,
      otHours: 4,
      shiftEarn: 950,
      messDed: 1200,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Months array for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Years array for dropdown (current year and 2 previous years)
  const years = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2]

  // Weeks array for workers payroll
  const weeks = [
    { id: 1, period: "1st - 7th" },
    { id: 2, period: "8th - 14th" },
    { id: 3, period: "15th - 21st" },
    { id: 4, period: "22nd - 28th" },
    { id: 5, period: "29th - End" },
  ]

  // Calculate PF (12% of basic salary)
  const calculatePF = (fixedWages, presentDays, workingDays = 30) => {
    if (selectedEmployeeType === "temporary") return 0
    const dailyWage = fixedWages / workingDays
    const earnedWage = dailyWage * presentDays
    return Math.round(earnedWage * 0.12)
  }

  // Calculate ESI (1.75% of gross salary)
  const calculateESI = (fixedWages, presentDays, shiftEarn, workingDays = 30) => {
    if (selectedEmployeeType === "temporary") return 0
    const dailyWage = fixedWages / workingDays
    const earnedWage = dailyWage * presentDays
    const grossSalary = earnedWage + shiftEarn
    return Math.round(grossSalary * 0.0175)
  }

  // Calculate OT Earnings for workers (2x hourly rate)
  const calculateOTEarnings = (fixedWages, otHours, workingDays = 30, workingHours = 8) => {
    const hourlyRate = fixedWages / workingDays / workingHours
    return Math.round(hourlyRate * otHours * 2)
  }

  // Calculate Gross Earnings
  const calculateGrossEarnings = (fixedWages, presentDays, shiftEarn, otEarn = 0, workingDays = 30) => {
    const dailyWage = fixedWages / workingDays
    const earnedWage = dailyWage * presentDays
    return Math.round(earnedWage + shiftEarn + otEarn)
  }

  // Calculate Total Deductions
  const calculateTotalDeductions = (pfDeduction, esiDeduction, messDed) => {
    return pfDeduction + esiDeduction + messDed
  }

  // Calculate Net Amount
  const calculateNetAmount = (grossEarnings, totalDeductions) => {
    return grossEarnings - totalDeductions
  }

  // Filter employees based on search query
  const filteredEmployees = (selectedCategory === "staffs" ? staffs : workers).filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.empNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Handle calculate payroll
  const handleCalculatePayroll = () => {
    setIsCalculating(true)
    // Simulate calculation delay
    setTimeout(() => {
      setIsCalculating(false)
    }, 1500)
  }

  // Handle approve payroll
  const handleApprovePayroll = () => {
    setIsApproved(true)
  }

  // Get week date range
  const getWeekDateRange = (week) => {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1)
    const startDate = new Date(firstDayOfMonth)

    startDate.setDate(1 + (week - 1) * 7)

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6)

    // Format dates as DD.MM.YY
    const formatDate = (date) => {
      return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear().toString().substring(2)}`
    }

    return `${formatDate(startDate)} to ${formatDate(endDate)}`
  }

  return (
    <div className="bg-white min-h-screen p-6 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <p className="text-gray-500 mt-1">Calculate and approve employee payroll</p>
      </div>

      {/* Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Payroll Amount</h2>
              <p className="text-xl font-bold text-gray-900">₹ 245,680</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Employees</h2>
              <p className="text-xl font-bold text-gray-900">{staffs.length + workers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Payroll Status</h2>
              <div className="flex items-center mt-1">
                {isApproved ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category and Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employee Category</label>
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            <button
              className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium flex-1 ${
                selectedCategory === "staffs" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setSelectedCategory("staffs")}
            >
              <Briefcase className="h-4 w-4" />
              <span>Staffs</span>
            </button>
            <button
              className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium flex-1 ${
                selectedCategory === "workers"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setSelectedCategory("workers")}
            >
              <Users className="h-4 w-4" />
              <span>Workers</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employee Type</label>
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            <button
              className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium flex-1 ${
                selectedEmployeeType === "permanent"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setSelectedEmployeeType("permanent")}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Permanent</span>
            </button>
            <button
              className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium flex-1 ${
                selectedEmployeeType === "temporary"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setSelectedEmployeeType("temporary")}
            >
              <Clock className="h-4 w-4" />
              <span>Temporary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {selectedCategory === "staffs" ? "Monthly Payroll" : "Weekly Payroll"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value))}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CalendarDays className="w-4 h-4 text-gray-500" />
              </div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategory === "workers" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Week Period</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CalendarRange className="w-4 h-4 text-gray-500" />
                </div>
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(Number.parseInt(e.target.value))}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                >
                  {weeks.map((week) => (
                    <option key={week.id} value={week.id}>
                      {week.period} ({getWeekDateRange(week.id)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees by name, ID or department..."
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sl.No
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Emp No
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fixed Wages
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Present Days
                </th>
                {selectedCategory === "workers" && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    OT Hours
                  </th>
                )}
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Shift Earn
                </th>
                {selectedCategory === "workers" && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    OT Earn
                  </th>
                )}
                {selectedCategory === "workers" && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Gross Earn
                  </th>
                )}
                {selectedEmployeeType === "permanent" && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PF Deductions
                  </th>
                )}
                {selectedEmployeeType === "permanent" && (
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ESI Deductions
                  </th>
                )}
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mess Ded
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Ded
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Net Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee, index) => {
                // Calculate values based on employee data
                const workingDays = selectedCategory === "staffs" ? 30 : 7
                const otEarn =
                  selectedCategory === "workers"
                    ? calculateOTEarnings(employee.fixedWages, employee.otHours || 0, workingDays)
                    : 0
                const grossEarnings = calculateGrossEarnings(
                  employee.fixedWages,
                  employee.presentDays,
                  employee.shiftEarn,
                  otEarn,
                  workingDays,
                )
                const pfDeduction = calculatePF(employee.fixedWages, employee.presentDays, workingDays)
                const esiDeduction = calculateESI(
                  employee.fixedWages,
                  employee.presentDays,
                  employee.shiftEarn,
                  workingDays,
                )
                const totalDeductions = calculateTotalDeductions(pfDeduction, esiDeduction, employee.messDed)
                const netAmount = calculateNetAmount(grossEarnings, totalDeductions)

                return (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{employee.empNo}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img className="h-8 w-8 rounded-full" src={employee.avatar || "/placeholder.svg"} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{employee.department}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.role}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹ {employee.fixedWages.toLocaleString()}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.presentDays} / {workingDays}
                    </td>
                    {selectedCategory === "workers" && (
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.otHours || 0}</td>
                    )}
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹ {employee.shiftEarn.toLocaleString()}
                    </td>
                    {selectedCategory === "workers" && (
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">₹ {otEarn.toLocaleString()}</td>
                    )}
                    {selectedCategory === "workers" && (
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹ {grossEarnings.toLocaleString()}
                      </td>
                    )}
                    {selectedEmployeeType === "permanent" && (
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-red-600">
                        ₹ {pfDeduction.toLocaleString()}
                      </td>
                    )}
                    {selectedEmployeeType === "permanent" && (
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-red-600">
                        ₹ {esiDeduction.toLocaleString()}
                      </td>
                    )}
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-red-600">
                      ₹ {employee.messDed.toLocaleString()}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      ₹ {totalDeductions.toLocaleString()}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ₹ {netAmount.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Payroll Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
            <p className="text-xl font-bold text-gray-900">{filteredEmployees.length}</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Gross Amount</h3>
            <p className="text-xl font-bold text-gray-900">₹ 285,400</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Deductions</h3>
            <p className="text-xl font-bold text-red-600">₹ 39,720</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Net Payable</h3>
            <p className="text-xl font-bold text-green-600">₹ 245,680</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Payroll
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={isCalculating}
            onClick={handleCalculatePayroll}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isCalculating ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isCalculating ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Payroll
              </>
            )}
          </button>
          <button
            type="button"
            disabled={isApproved}
            onClick={handleApprovePayroll}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isApproved ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {isApproved ? "Approved" : "Approve Payroll"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PayrollPage
