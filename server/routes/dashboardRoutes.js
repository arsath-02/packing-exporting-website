// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Orders');

// // GET /api/dashboard/summary
// router.get('/summary', async (req, res) => {
//   try {
//     const orders = await Order.find();

//     let summary = {
//       totalOrders: orders.length,
//       overallStatus: {
//         pending: 0,
//         inProgress: 0,
//         completed: 0,
//         cancelled: 0,
//       },
//       stages: {
//         orderConfirmed: { pending: 0, inProgress: 0, completed: 0 },
//         dyeing: { pending: 0, inProgress: 0, completed: 0 },
//         cutting: { pending: 0, inProgress: 0, completed: 0 },
//         stitching: { pending: 0, inProgress: 0, completed: 0 },
//         packing: { pending: 0, inProgress: 0, completed: 0 },
//         shipped: { pending: 0, inProgress: 0, completed: 0 },
//       }
//     };

//     for (let order of orders) {
//       // Count order's overall status
//       summary.overallStatus[order.status.toLowerCase()]++;

//       // Count stage-wise status
//       order.stages.forEach(stage => {
//         const key = stage.name.toLowerCase().replace(/\s/g, ''); // "Order Confirmed" → "orderconfirmed"
//         if (summary.stages[key]) {
//           summary.stages[key][stage.status.toLowerCase()]++;
//         }
//       });
//     }

//     res.json(summary);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // GET /api/dashboard/activities
// router.get('/activities', async (req, res) => {
//     try {
//       const recentOrders = await Order.find()
//         .sort({ createdAt: -1 })
//         .limit(10)
//         .populate('user', 'firstname lastname'); // assuming User has these fields
  
//       const activities = recentOrders.map(order => ({
//         orderId: order.order_id,
//         user: order.user ? `${order.user.firstname} ${order.user.lastname}` : "Unknown",
//         clothType: order.clothType,
//         dyeColor: order.dyeColor,
//         status: order.status,
//         createdAt: order.createdAt,
//       }));
  
//       res.json(activities);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error fetching recent activities' });
//     }
//   });

  
//   // GET /api/dashboard/department-status
// router.get('/department-status', async (req, res) => {
//     try {
//       const orders = await Order.find();
  
//       const departments = {
//         "Order Confirmed": 0,
//         "Dyeing": 0,
//         "Cutting": 0,
//         "Stitching": 0,
//         "Packing": 0,
//         "Shipped": 0,
//       };
  
//       const completed = {
//         "Order Confirmed": 0,
//         "Dyeing": 0,
//         "Cutting": 0,
//         "Stitching": 0,
//         "Packing": 0,
//         "Shipped": 0,
//       };
  
//       for (let order of orders) {
//         order.stages.forEach(stage => {
//           departments[stage.name]++;
//           if (stage.status === "Completed") {
//             completed[stage.name]++;
//           }
//         });
//       }
  
//       // Format for progress bars
//       const result = Object.keys(departments).map(dept => ({
//         name: dept,
//         total: departments[dept],
//         completed: completed[dept],
//         pending: departments[dept] - completed[dept],
//         progressPercent: departments[dept] === 0 ? 0 : Math.round((completed[dept] / departments[dept]) * 100),
//       }));
  
//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error fetching department status' });
//     }
//   });
  

// module.exports = router;


const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const overallStatus = {
      pending: await Order.countDocuments({ status: 'Pending' }),
      inProgress: await Order.countDocuments({ status: 'In Progress' }),
      completed: await Order.countDocuments({ status: 'Completed' }),
      cancelled: await Order.countDocuments({ status: 'Cancelled' }),
    };

    const stages = {
      orderConfirmed: await getStageStatus('Order Confirmed'),
      dyeing: await getStageStatus('Dyeing'),
      cutting: await getStageStatus('Cutting'),
      stitching: await getStageStatus('Stitching'),
      packing: await getStageStatus('Packing'),
      shipped: await getStageStatus('Shipped'),
    };

    res.json({ totalOrders, overallStatus, stages });
  } catch (error) {
    console.error('Error in /stats:', error);
    res.status(500).json({ error: 'Server error in dashboard stats' });
  }
});

// Helper function to count each stage status
async function getStageStatus(stageName) {
  const pending = await Order.countDocuments({ 'stages': { $elemMatch: { name: stageName, status: 'Pending' } } });
  const inProgress = await Order.countDocuments({ 'stages': { $elemMatch: { name: stageName, status: 'In Progress' } } });
  const completed = await Order.countDocuments({ 'stages': { $elemMatch: { name: stageName, status: 'Completed' } } });

  return { pending, inProgress, completed };
}

// GET /api/dashboard/activities
router.get('/activities', async (req, res) => {
  try {
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);
    res.json(recentOrders);
  } catch (err) {
    console.error('Error in /activities:', err);
    res.status(500).json({ error: 'Failed to fetch recent activities' });
  }
});

// GET /api/dashboard/department-status
router.get('/department-status', async (req, res) => {
    try {
      const stages = ['Dyeing', 'Cutting', 'Stitching', 'Packing', 'Shipped'];
      const statusByDept = {};
  
      for (const stage of stages) {
        const count = await Order.countDocuments({ stages: { $elemMatch: { name: stage, status: 'In Progress' } } });
        statusByDept[stage.toLowerCase()] = count;
      }
  
      res.json(statusByDept);
    } catch (err) {
      console.error('Error in /department-status:', err);
      res.status(500).json({ error: 'Failed to fetch department statuses' });
    }
  });

module.exports = router;
