import Employee from "../models/Employee.js"
import User from '../models/User.js'
// import Department from '../models/Department.js' // Removed as it is unused
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from "path"

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "public/uploads")
    },
    filename: (_, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
    try {
        // Destructure new fields from request body
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            employmentType,
            pf,
            esi,
            designation,
            department,
            salary,
            password,
            role,
            address,          // New field
            dateOfJoining,    // New field
            phone       // New field
        } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered in employee" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new User document
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file && req.file.filename ? req.file.filename : ""
        });

        const savedUser = await newUser.save();

        // Create a new Employee document and include the new fields
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            designation,
            department,
            salary,
            email,
            address,          // Include new field
            dateOfJoining, 
            pf,
            esi,
            employmentType,   // Include new field
            phone: phone.toString() // Ensure phone is stored as a string
        });
        //("New employee data:", employee.employeeId);
        console.log("Received employment type:", employmentType);
        // Save the new employee
        await newEmployee.save();

        // Return success response
        return res.status(200).json({ success: true, message: "Employee created" });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ success: false, error: "Error creating employee" });
    }
};

const getEmployees = async (_, res) => {
    try {
        const employees = await Employee.find().populate('userId', { password: 0 }).populate("department")
        return res.status(200).json({ success: true, employees })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees server error" })
    }

}

const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee;
        employee = await Employee.findOne({
            $or: [{ _id: id }, { userId: id }]
        }).populate('userId', { password: 0 }).populate("department")
        return res.status(200).json({ success: true, employee })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees server error" })
    }

}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            designation,
            department,
            salary,

        } = req.body

        const employee = await Employee.findById({ _id: id })
        if (!employee) {
            return res.status(404).json({ success: false, error: "employee not found" })
        }

        const user = await User.findById({ _id: employee.userId })
        if (!user) {
            return res.status(404).json({ success: false, error: "user not found" })

        }

        const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name })
        const updateEmployee = await Employee.findByIdAndUpdate(
            { _id: id },
            { designation, salary, department },
            { new: true }
        )
        if (!updateUser || !updateEmployee) {
            return res.status(404).json({ success: false, error: "document not found" })

        }
        return res.status(200).json({ success: true, message: "employee updated" })

    } catch (error) {
        return res.status(500).json({ success: false, error: "update employees server error" })

    }

}

const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.find({ department: id })
        return res.status(200).json({ success: true, employees })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees by dep id server error" })
    }
}

export { 
    addEmployee, 
    upload, 
    getEmployees, 
    getEmployee, 
    updateEmployee, 
    fetchEmployeesByDepId 
}