import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { type } from 'os';

const employeeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    designation: { type: String, required: true},
    pf:{type: Boolean , default: false},
    esi:{type: Boolean , default: false},
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    employmentType:{type: String ,  required: true}, // Full-time, Part-time, Contract, etc.
    dateOfJoining :{ type:Date , required: true},
    address :{ type: String , required: true}, 
    phone: { type: String, required: true },
    salary: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
})

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee;
