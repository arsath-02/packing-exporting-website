// PART 1: UPDATED MONGOOSE SCHEMA

// Updated Attendance Schema
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee ID is required']
  },
  name: {
    type: String,
    required: [true, 'Employee name is required']
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required']
  },
  employmentType: {
    type: String,
    required: [true, 'Employment type is required']
  },
  status: {
    type: String,
    enum: {
      values: ['present_full', 'present_first_half', 'present_second_half', 'absent'],
      message: '{VALUE} is not a valid attendance status'
    },
    required: [true, 'Status is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate entries for employee on same date
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;