import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
 const numericEmployeeId = parseInt(employee._id.toString().substring(0, 8), 16); 

        setEmployee(employee);
        localStorage.setItem("employeeId", numericEmployeeId);        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Employee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                className="rounded-full border w-72 h-72 object-cover"
                alt="Profile"
              />
            </div>
            <div className="space-y-4">
              <Info label="Name" value={employee.userId.name} />
              <Info label="Email" value={employee.email} />
              <Info label="Employee ID" value={employee.employeeId} />
              <Info label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
              <Info label="Gender" value={employee.gender} />
              <Info label="Employment Type" value={employee.employmentType} />
              <Info label="Department" value={employee.department?.name || "N/A"} />
              <Info label="Designation" value={employee.designation} />
              <Info label="Salary" value={`₹${employee.salary}`} />
              <Info label="Phone" value={employee.phone} />
              <Info label="Address" value={employee.address} />
              <Info label="Date of Joining" value={new Date(employee.dateOfJoining).toLocaleDateString()} />
              <Info label="PF" value={employee.pf ? "Yes" : "No"} />
              <Info label="ESI" value={employee.esi ? "Yes" : "No"} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">Loading employee details...</div>
      )}
    </>
  );
};

const Info = ({ label, value }) => (
  <div className="flex space-x-3">
    <p className="text-xl font-bold">{label}:</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

export default View;
