import React, { useState } from "react";
import { format } from "date-fns";

// Mock data for demonstration
const mockEmployees = [
  { id: "EMP001", name: "John Doe", department: "IT", role: "Senior Developer", joiningDate: "2022-05-15" },
  { id: "EMP002", name: "Jane Smith", department: "HR", role: "HR Executive", joiningDate: "2021-11-03" },
  { id: "EMP003", name: "Robert Johnson", department: "Finance", role: "Accountant", joiningDate: "2023-01-20" },
  { id: "EMP004", name: "Emily Davis", department: "Marketing", role: "Marketing Specialist", joiningDate: "2022-08-12" },
  { id: "EMP005", name: "Michael Wilson", department: "Sales", role: "Sales Representative", joiningDate: "2023-03-07" },
];

// Data for dropdowns
const departments = [
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Information Technology", value: "it" },
  { label: "Marketing", value: "marketing" },
  { label: "Operations", value: "operations" },
  { label: "Sales", value: "sales" },
  { label: "Research & Development", value: "r&d" },
];

const roles = [
  { label: "Manager", value: "manager" },
  { label: "Team Lead", value: "team_lead" },
  { label: "Senior Developer", value: "senior_dev" },
  { label: "Junior Developer", value: "junior_dev" },
  { label: "HR Executive", value: "hr_exec" },
  { label: "Accountant", value: "accountant" },
  { label: "Marketing Specialist", value: "marketing_specialist" },
  { label: "Sales Representative", value: "sales_rep" },
];

const bloodGroups = [
  { label: "A+", value: "a_positive" },
  { label: "A-", value: "a_negative" },
  { label: "B+", value: "b_positive" },
  { label: "B-", value: "b_negative" },
  { label: "AB+", value: "ab_positive" },
  { label: "AB-", value: "ab_negative" },
  { label: "O+", value: "o_positive" },
  { label: "O-", value: "o_negative" },
];

const languages = [
  { label: "Hindi", value: "hindi" },
  { label: "English", value: "english" },
  { label: "Tamil", value: "tamil" },
  { label: "Telugu", value: "telugu" },
  { label: "Kannada", value: "kannada" },
  { label: "Malayalam", value: "malayalam" },
  { label: "Bengali", value: "bengali" },
  { label: "Marathi", value: "marathi" },
  { label: "Gujarati", value: "gujarati" },
  { label: "Punjabi", value: "punjabi" },
];

// Utility function for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Main component
const ManageEmployee = () => {
  const [activeTab, setActiveTab] = useState("add");
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">Employee Management System</h1>
      
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${activeTab === "add" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("add")}
          >
            Add Employee
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "delete" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("delete")}
          >
            Delete Employee
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div>
        {activeTab === "add" ? <AddEmployeeCard /> : <DeleteEmployeeCard />}
      </div>
    </div>
  );
};

// Add Employee Card Component
const AddEmployeeCard = () => {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    name: "",
    dateOfJoining: null,
    department: "",
    role: "",
    salary: "",
    isContractor: "no",
    contractorName: "",
    category: "temporary",
    isPF: false,
    isESI: false,
    isEducated: "yes",
    generatedEmail: "",
    generatedPassword: "",
    // Personal details
    dob: null,
    gender: "",
    fathersName: "",
    maritalStatus: "",
    husbandsName: "",
    husbandsOccupation: "",
    bloodGroup: "",
    presentAddress: "",
    permanentAddress: "",
    contactNumber: "",
    alternateContactNumber: "",
    motherTongue: "",
    isMigrant: "no",
    // Bank details
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    branchName: "",
    // Education details
    educationDetails: "",
    // Family details
    familyMembersDetails: "",
  });

  // Dropdown states
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [openBloodGroup, setOpenBloodGroup] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDobCalendar, setOpenDobCalendar] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Auto-generate email and password when name and employee number are available
      if ((field === "name" || field === "employeeNumber") && newData.name && newData.employeeNumber) {
        const nameParts = newData.name.toLowerCase().split(" ");
        const firstName = nameParts[0];
        const email = `${firstName}.${newData.employeeNumber}@company.com`;
        const password = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}${newData.employeeNumber}!`;

        newData.generatedEmail = email;
        newData.generatedPassword = password;
      }

      // Handle category change
      if (field === "category") {
        if (value === "permanent") {
          newData.isPF = true;
          newData.isESI = true;
        } else {
          newData.isPF = false;
          newData.isESI = false;
        }
      }

      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Employee added successfully!");
  };

  // Simple date picker component
  const SimpleDatePicker = ({ value, onChange, isOpen, setIsOpen, label, fromYear, toYear }) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [viewDate, setViewDate] = useState(new Date());
    const [viewMonth, setViewMonth] = useState(viewDate.getMonth());
    const [viewYear, setViewYear] = useState(viewDate.getFullYear());
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: (toYear || 2030) - (fromYear || 1950) + 1 }, (_, i) => (fromYear || 1950) + i);
    
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay();
    };
    
    const handleDateSelect = (day) => {
      const newDate = new Date(viewYear, viewMonth, day);
      setSelectedDate(newDate);
      onChange(newDate);
      setIsOpen(false);
    };
    
    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(viewYear, viewMonth);
      const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
      const days = [];
      
      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
      }
      
      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(viewYear, viewMonth, day);
        const isSelected = selectedDate && 
                          date.getDate() === selectedDate.getDate() && 
                          date.getMonth() === selectedDate.getMonth() && 
                          date.getFullYear() === selectedDate.getFullYear();
        
        days.push(
          <button
            key={day}
            type="button"
            onClick={() => handleDateSelect(day)}
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              isSelected 
                ? "bg-blue-500 text-white" 
                : "hover:bg-gray-100"
            }`}
          >
            {day}
          </button>
        );
      }
      
      return days;
    };
    
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border rounded-md flex items-center justify-between"
        >
          {selectedDate ? format(selectedDate, "PPP") : label || "Select date"}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-4 w-64">
            <div className="flex justify-between mb-2">
              <select 
                value={viewMonth} 
                onChange={(e) => setViewMonth(parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              
              <select 
                value={viewYear} 
                onChange={(e) => setViewYear(parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="h-8 w-8 flex items-center justify-center font-medium">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Dropdown component
  const Dropdown = ({ options, value, onChange, placeholder, isOpen, setIsOpen }) => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const filteredOptions = options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSelect = (optionValue) => {
      onChange(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    };
    
    const selectedOption = options.find(option => option.value === value);
    
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border rounded-md flex items-center justify-between"
        >
          {selectedOption ? selectedOption.label : placeholder}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500">No options found</div>
            ) : (
              filteredOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center ${
                    value === option.value ? "bg-blue-50" : ""
                  }`}
                >
                  {value === option.value && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Add New Employee</h2>
        <p className="text-gray-500">Enter employee details to add them to the system.</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="employeeNumber" className="block text-sm font-medium">
                  Employee Number *
                </label>
                <input
                  id="employeeNumber"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.employeeNumber}
                  onChange={(e) => handleInputChange("employeeNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name *
                </label>
                <input
                  id="name"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dateOfJoining" className="block text-sm font-medium">
                  Date of Joining *
                </label>
                <SimpleDatePicker
                  value={formData.dateOfJoining}
                  onChange={(date) => handleInputChange("dateOfJoining", date)}
                  isOpen={openCalendar}
                  setIsOpen={setOpenCalendar}
                  label="Select date"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium">
                  Department *
                </label>
                <Dropdown
                  options={departments}
                  value={formData.department}
                  onChange={(value) => handleInputChange("department", value)}
                  placeholder="Select department"
                  isOpen={openDepartment}
                  setIsOpen={setOpenDepartment}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium">
                  Role *
                </label>
                <Dropdown
                  options={roles}
                  value={formData.role}
                  onChange={(value) => handleInputChange("role", value)}
                  placeholder="Select role"
                  isOpen={openRole}
                  setIsOpen={setOpenRole}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="salary" className="block text-sm font-medium">
                  Fixed Salary (in ₹) *
                </label>
                <input
                  id="salary"
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">By Contractor *</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="contractor-yes"
                      name="isContractor"
                      value="yes"
                      checked={formData.isContractor === "yes"}
                      onChange={() => handleInputChange("isContractor", "yes")}
                      className="mr-2"
                    />
                    <label htmlFor="contractor-yes">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="contractor-no"
                      name="isContractor"
                      value="no"
                      checked={formData.isContractor === "no"}
                      onChange={() => handleInputChange("isContractor", "no")}
                      className="mr-2"
                    />
                    <label htmlFor="contractor-no">No</label>
                  </div>
                </div>
              </div>

              {formData.isContractor === "yes" && (
                <div className="space-y-2">
                  <label htmlFor="contractorName" className="block text-sm font-medium">
                    Contractor Name *
                  </label>
                  <input
                    id="contractorName"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.contractorName}
                    onChange={(e) => handleInputChange("contractorName", e.target.value)}
                    required={formData.isContractor === "yes"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium">Category *</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-permanent"
                      name="category"
                      value="permanent"
                      checked={formData.category === "permanent"}
                      onChange={() => handleInputChange("category", "permanent")}
                      className="mr-2"
                    />
                    <label htmlFor="category-permanent">Permanent</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-temporary"
                      name="category"
                      value="temporary"
                      checked={formData.category === "temporary"}
                      onChange={() => handleInputChange("category", "temporary")}
                      className="mr-2"
                    />
                    <label htmlFor="category-temporary">Temporary</label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPF"
                    checked={formData.isPF}
                    onChange={(e) => handleInputChange("isPF", e.target.checked)}
                    disabled={formData.category === "permanent"}
                    className="rounded"
                  />
                  <label htmlFor="isPF" className="text-sm font-medium">PF</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isESI"
                    checked={formData.isESI}
                    onChange={(e) => handleInputChange("isESI", e.target.checked)}
                    disabled={formData.category === "permanent"}
                    className="rounded"
                  />
                  <label htmlFor="isESI" className="text-sm font-medium">ESI</label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Is the Employee Educated? *</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="educated-yes"
                      name="isEducated"
                      value="yes"
                      checked={formData.isEducated === "yes"}
                      onChange={() => handleInputChange("isEducated", "yes")}
                      className="mr-2"
                    />
                    <label htmlFor="educated-yes">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="educated-no"
                      name="isEducated"
                      value="no"
                      checked={formData.isEducated === "no"}
                      onChange={() => handleInputChange("isEducated", "no")}
                      className="mr-2"
                    />
                    <label htmlFor="educated-no">No</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="generatedEmail" className="block text-sm font-medium">
                  Generated Email
                </label>
                <input
                  id="generatedEmail"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  value={formData.generatedEmail}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="generatedPassword" className="block text-sm font-medium">
                  Generated Password
                </label>
                <input
                  id="generatedPassword"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  value={formData.generatedPassword}
                  readOnly
                />
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Personal Details (if not educated) */}
          {formData.isEducated === "no" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="dob" className="block text-sm font-medium">
                    Date of Birth *
                  </label>
                  <SimpleDatePicker
                    value={formData.dob}
                    onChange={(date) => handleInputChange("dob", date)}
                    isOpen={openDobCalendar}
                    setIsOpen={setOpenDobCalendar}
                    label="Select date"
                    fromYear={1950}
                    toYear={2010}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    required={formData.isEducated === "no"}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fathersName" className="block text-sm font-medium">
                    Father's Name *
                  </label>
                  <input
                    id="fathersName"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fathersName}
                    onChange={(e) => handleInputChange("fathersName", e.target.value)}
                    required={formData.isEducated === "no"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="maritalStatus" className="block text-sm font-medium">
                    Marital Status *
                  </label>
                  <select
                    id="maritalStatus"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                    required={formData.isEducated === "no"}
                  >
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>

                {formData.maritalStatus === "married" && formData.gender === "female" && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="husbandsName" className="block text-sm font-medium">
                        Husband's Name *
                      </label>
                      <input
                        id="husbandsName"
                        className="w-full px-3 py-2 border rounded-md"
                        value={formData.husbandsName}
                        onChange={(e) => handleInputChange("husbandsName", e.target.value)}
                        required={formData.maritalStatus === "married" && formData.gender === "female"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="husbandsOccupation" className="block text-sm font-medium">
                        Husband's Occupation *
                      </label>
                      <input
                        id="husbandsOccupation"
                        className="w-full px-3 py-2 border rounded-md"
                        value={formData.husbandsOccupation}
                        onChange={(e) => handleInputChange("husbandsOccupation", e.target.value)}
                        required={formData.maritalStatus === "married" && formData.gender === "female"}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label htmlFor="bloodGroup" className="block text-sm font-medium">
                    Blood Group *
                  </label>
                  <Dropdown
                    options={bloodGroups}
                    value={formData.bloodGroup}
                    onChange={(value) => handleInputChange("bloodGroup", value)}
                    placeholder="Select blood group"
                    isOpen={openBloodGroup}
                    setIsOpen={setOpenBloodGroup}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="presentAddress" className="block text-sm font-medium">
                    Present Address *
                  </label>
                  <textarea
                    id="presentAddress"
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                    value={formData.presentAddress}
                    onChange={(e) => handleInputChange("presentAddress", e.target.value)}
                    required={formData.isEducated === "no"}
                  ></textarea>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="permanentAddress" className="block text-sm font-medium">
                    Permanent Address *
                  </label>
                  <textarea
                    id="permanentAddress"
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                    required={formData.isEducated === "no"}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="block text-sm font-medium">
                    Contact Number *
                  </label>
                  <input
                    id="contactNumber"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    required={formData.isEducated === "no"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="alternateContactNumber" className="block text-sm font-medium">
                    Alternate Contact Number
                  </label>
                  <input
                    id="alternateContactNumber"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.alternateContactNumber}
                    onChange={(e) => handleInputChange("alternateContactNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="motherTongue" className="block text-sm font-medium">
                    Mother Tongue *
                  </label>
                  <Dropdown
                    options={languages}
                    value={formData.motherTongue}
                    onChange={(value) => handleInputChange("motherTongue", value)}
                    placeholder="Select language"
                    isOpen={openLanguage}
                    setIsOpen={setOpenLanguage}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Is Migrant? *</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="migrant-yes"
                        name="isMigrant"
                        value="yes"
                        checked={formData.isMigrant === "yes"}
                        onChange={() => handleInputChange("isMigrant", "yes")}
                        className="mr-2"
                      />
                      <label htmlFor="migrant-yes">Yes</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="migrant-no"
                        name="isMigrant"
                        value="no"
                        checked={formData.isMigrant === "no"}
                        onChange={() => handleInputChange("isMigrant", "no")}
                        className="mr-2"
                      />
                      <label htmlFor="migrant-no">No</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr className="my-6" />

          {/* Bank Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bank Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="bankAccountNumber" className="block text-sm font-medium">
                  Bank Account Number *
                </label>
                <input
                  id="bankAccountNumber"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.bankAccountNumber}
                  onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bankName" className="block text-sm font-medium">
                  Bank Name *
                </label>
                <input
                  id="bankName"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="ifscCode" className="block text-sm font-medium">
                  IFSC Code *
                </label>
                <input
                  id="ifscCode"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="branchName" className="block text-sm font-medium">
                  Branch Name *
                </label>
                <input
                  id="branchName"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange("branchName", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Education Details (if educated) */}
          {formData.isEducated === "yes" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education Details</h3>
              <div className="space-y-2">
                <label htmlFor="educationDetails" className="block text-sm font-medium">
                  Education Details *
                </label>
                <textarea
                  id="educationDetails"
                  className="w-full px-3 py-2 border rounded-md"
                  rows="4"
                  value={formData.educationDetails}
                  onChange={(e) => handleInputChange("educationDetails", e.target.value)}
                  required={formData.isEducated === "yes"}
                  placeholder="Enter education qualifications, institutions, years, etc."
                ></textarea>
              </div>
            </div>
          )}

          <hr className="my-6" />

          {/* Family Members Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Family Members Details</h3>
            <div className="space-y-2">
              <label htmlFor="familyMembersDetails" className="block text-sm font-medium">
                Family Members Details
              </label>
              <textarea
                id="familyMembersDetails"
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                value={formData.familyMembersDetails}
                onChange={(e) => handleInputChange("familyMembersDetails", e.target.value)}
                placeholder="Enter details of family members (name, relation, age, etc.)"
              ></textarea>
            </div>
          </div>

          <hr className="my-6" />

          {/* Document Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Document Uploads</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="photo" className="block text-sm font-medium">
                  Photo *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    Upload Photo
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="aadhar" className="block text-sm font-medium">
                  Aadhar Card *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    Upload Aadhar
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bankPassbook" className="block text-sm font-medium">
                  Bank Passbook *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    Upload Passbook
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Employee Card Component
const DeleteEmployeeCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    console.log(`Deleting employee with ID: ${selectedEmployee}`);
    // Here you would typically send a request to your backend to delete the employee
    setConfirmDialogOpen(false);
    alert(`Employee ${selectedEmployee} deleted successfully!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Delete Employee</h2>
        <p className="text-gray-500">Search for an employee to remove them from the system.</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              placeholder="Search by ID, name, department, or role..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(employee.joiningDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee.id);
                            setConfirmDialogOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {confirmDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-medium mb-2">Confirm Deletion</h3>
                <p className="text-gray-500 mb-4">
                  Are you sure you want to delete employee with ID: {selectedEmployee}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setConfirmDialogOpen(false)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEmployee;