// import Attendance from '../models/Attendance.js';
// import Employee from '../models/Employee.js';
// import mongoose from 'mongoose';

// // Save attendance records for a specific date
// export const saveAttendance = async (req, res) => {
//   try {
//     const { attendanceData, date } = req.body;
    
//     // Add more detailed logging for debugging
//     console.log("Received request with data:", { 
//       attendanceDataLength: attendanceData?.length,
//       date: date,
//       firstRecord: attendanceData?.[0] // Log first record as sample
//     });
    
//     if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid attendance data. Expected a non-empty array.'
//       });
//     }

//     if (!date) {
//       return res.status(400).json({
//         success: false,
//         message: 'Date is required.'
//       });
//     }

//     // Format date to beginning of day
//     const formattedDate = new Date(date);
//     formattedDate.setHours(0, 0, 0, 0);

//     // Without using transactions first - simplify to identify the issue
//     try {
//       // Delete any existing attendance records for this date
//       const startOfDay = new Date(formattedDate);
//       const endOfDay = new Date(formattedDate);
//       endOfDay.setDate(endOfDay.getDate() + 1);
      
//       console.log(`Deleting records between ${startOfDay} and ${endOfDay}`);
//       await Attendance.deleteMany({
//         date: {
//           $gte: startOfDay,
//           $lt: endOfDay
//         }
//       });

//       // Create and validate each attendance record individually
//       const attendanceRecords = [];
      
//       for (const record of attendanceData) {
//         // Ensure all required fields are present and convert any string IDs to ObjectIds
//         const newRecord = {
//           employeeId: mongoose.Types.ObjectId.isValid(record.employeeId) 
//             ? new mongoose.Types.ObjectId(record.employeeId)
//             : record.employeeId,
//           name: record.name,
//           department: mongoose.Types.ObjectId.isValid(record.department) 
//             ? new mongoose.Types.ObjectId(record.department)
//             : record.department,
//           employmentType: record.employmentType,
//           status: record.status,
//           date: formattedDate
//         };
        
//         attendanceRecords.push(newRecord);
//       }
      
//       console.log(`Inserting ${attendanceRecords.length} records`);
//       // Insert records with validation
//       await Attendance.insertMany(attendanceRecords, { ordered: false });

//       res.status(200).json({
//         success: true,
//         message: 'Attendance records saved successfully.'
//       });
//     } catch (error) {
//       console.error('Error in attendance processing:', error);
//       throw error;
//     }
//   } catch (error) {
//     console.error('Full error details:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to save attendance records.',
//       error: error.message,
//       details: error.toString()
//     });
//   }
// };

// // Get attendance records for a specific date
// export const getAttendanceByDate = async (req, res) => {
//   try {
//     const date = new Date(req.params.date);
//     if (isNaN(date.getTime())) {
//       return res.status(400).json({ success: false, message: 'Invalid date format' });
//     }

//     const startOfDay = new Date(date);
//     startOfDay.setHours(0, 0, 0, 0);
    
//     const endOfDay = new Date(date);
//     endOfDay.setHours(23, 59, 59, 999);

//     console.log(`Fetching attendance between ${startOfDay} and ${endOfDay}`);
    
//     const attendanceRecords = await Attendance.find({
//       date: {
//         $gte: startOfDay,
//         $lt: endOfDay
//       }
//     });

//     res.status(200).json({ success: true, attendanceRecords });
//   } catch (error) {
//     console.error('Error fetching attendance:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch attendance records',
//       error: error.message
//     });
//   }
// };

// // Get attendance statistics by department
// export const getAttendanceStatsByDepartment = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const dateFilter = {};
//     if (startDate) dateFilter.$gte = new Date(new Date(startDate).setHours(0, 0, 0));
//     if (endDate) dateFilter.$lte = new Date(new Date(endDate).setHours(23, 59, 59));

//     const pipeline = [
//       { $match: startDate || endDate ? { date: dateFilter } : {} },
//       {
//         $lookup: {
//           from: 'departments',
//           localField: 'department',
//           foreignField: '_id',
//           as: 'departmentInfo'
//         }
//       },
//       { $unwind: { path: '$departmentInfo', preserveNullAndEmptyArrays: true } },
//       {
//         $group: {
//           _id: {
//             department: '$department',
//             departmentName: { $ifNull: ['$departmentInfo.dept_name', 'Unknown'] },
//             date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
//             status: '$status'
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             department: '$_id.department',
//             departmentName: '$_id.departmentName',
//             date: '$_id.date'
//           },
//           presentFull: {
//             $sum: {
//               $cond: [{ $eq: ['$_id.status', 'present_full'] }, '$count', 0]
//             }
//           },
//           presentFirstHalf: {
//             $sum: {
//               $cond: [{ $eq: ['$_id.status', 'present_first_half'] }, '$count', 0]
//             }
//           },
//           presentSecondHalf: {
//             $sum: {
//               $cond: [{ $eq: ['$_id.status', 'present_second_half'] }, '$count', 0]
//             }
//           },
//           absent: {
//             $sum: {
//               $cond: [{ $eq: ['$_id.status', 'absent'] }, '$count', 0]
//             }
//           },
//           total: { $sum: '$count' }
//         }
//       },
//       { $sort: { '_id.date': 1, '_id.departmentName': 1 } }
//     ];

//     const stats = await Attendance.aggregate(pipeline);

//     res.status(200).json({ success: true, stats });
//   } catch (error) {
//     console.error('Error getting attendance stats:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch attendance statistics',
//       error: error.message
//     });
//   }
// };
import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';
import mongoose from 'mongoose';

// Save attendance records for a specific date
export const saveAttendance = async (req, res) => {
  try {
    // Add debug logging for the request
    console.log("Request received at /api/attendance/save");
    console.log("Request headers:", req.headers);
    console.log("Request body type:", typeof req.body);
    console.log("Request body:", req.body);
    
    // Check if req.body is undefined or null
    if (!req.body) {
      return res.status(400).json({ 
        success: false, 
        message: 'Request body is missing'
      });
    }
    
    // Safely extract data from req.body
    const attendanceData = req.body.attendanceData || [];
    const date = req.body.date;
    
    console.log("Extracted data:", { 
      attendanceDataLength: attendanceData.length,
      date: date
    });
    
    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid attendance data. Expected a non-empty array.'
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required.'
      });
    }

    // Format date to beginning of day
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    try {
      // Delete any existing attendance records for this date
      const startOfDay = new Date(formattedDate);
      const endOfDay = new Date(formattedDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      console.log(`Deleting records between ${startOfDay} and ${endOfDay}`);
      await Attendance.deleteMany({
        date: {
          $gte: startOfDay,
          $lt: endOfDay
        }
      });

      // Create and validate each attendance record individually
      const attendanceRecords = [];
      
      for (const record of attendanceData) {
        console.log("Processing record:", record);
        
        // Ensure all required fields are present and convert any string IDs to ObjectIds
        const newRecord = {
          employeeId: mongoose.Types.ObjectId.isValid(record.employeeId) 
            ? new mongoose.Types.ObjectId(record.employeeId)
            : record.employeeId,
          name: record.name || "Unknown",
          department: mongoose.Types.ObjectId.isValid(record.department) 
            ? new mongoose.Types.ObjectId(record.department)
            : record.department,
          employmentType: record.employmentType || "Regular",
          status: record.status || "absent",
          date: formattedDate
        };
        
        attendanceRecords.push(newRecord);
      }
      
      console.log(`Inserting ${attendanceRecords.length} records`);
      // Insert records with validation
      await Attendance.insertMany(attendanceRecords, { ordered: false });

      res.status(200).json({
        success: true,
        message: 'Attendance records saved successfully.'
      });
    } catch (error) {
      console.error('Error in attendance processing:', error);
      throw error;
    }
  } catch (error) {
    console.error('Full error details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save attendance records.',
      error: error.message,
      details: error.toString()
    });
  }
};

// Get attendance records for a specific date (unchanged)
export const getAttendanceByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }
    
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    console.log(`Fetching attendance between ${startOfDay} and ${endOfDay}`);
    
    const attendanceRecords = await Attendance.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    res.status(200).json({ success: true, attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance records',
      error: error.message
    });
  }
};

// Get attendance statistics by department (unchanged)
export const getAttendanceStatsByDepartment = async (req, res) => {
  // [Code remains the same]
  
      try {
        const { startDate, endDate } = req.query;
        const dateFilter = {};
        if (startDate) dateFilter.$gte = new Date(new Date(startDate).setHours(0, 0, 0));
        if (endDate) dateFilter.$lte = new Date(new Date(endDate).setHours(23, 59, 59));
    
        const pipeline = [
          { $match: startDate || endDate ? { date: dateFilter } : {} },
          {
            $lookup: {
              from: 'departments',
              localField: 'department',
              foreignField: '_id',
              as: 'departmentInfo'
            }
          },
          { $unwind: { path: '$departmentInfo', preserveNullAndEmptyArrays: true } },
          {
            $group: {
              _id: {
                department: '$department',
                departmentName: { $ifNull: ['$departmentInfo.dept_name', 'Unknown'] },
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                status: '$status'
              },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: {
                department: '$_id.department',
                departmentName: '$_id.departmentName',
                date: '$_id.date'
              },
              presentFull: {
                $sum: {
                  $cond: [{ $eq: ['$_id.status', 'present_full'] }, '$count', 0]
                }
              },
              presentFirstHalf: {
                $sum: {
                  $cond: [{ $eq: ['$_id.status', 'present_first_half'] }, '$count', 0]
                }
              },
              presentSecondHalf: {
                $sum: {
                  $cond: [{ $eq: ['$_id.status', 'present_second_half'] }, '$count', 0]
                }
              },
              absent: {
                $sum: {
                  $cond: [{ $eq: ['$_id.status', 'absent'] }, '$count', 0]
                }
              },
              total: { $sum: '$count' }
            }
          },
          { $sort: { '_id.date': 1, '_id.departmentName': 1 } }
        ];
    
        const stats = await Attendance.aggregate(pipeline);
    
        res.status(200).json({ success: true, stats });
      } catch (error) {
        console.error('Error getting attendance stats:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to fetch attendance statistics',
          error: error.message
        });
      };
};