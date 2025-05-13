const express = require('express');
const DyeModel = require('../models/Employee');
const router = express.Router();

// GET all dyeing employees
router.get('/', async (req, res) => {
    try {
        const data = await DyeModel.find({});
        res.status(200).json(data);
    } catch (e) {
        res.status(400).send(`An Error Occurred: ${e.message}`);
    }
});

// POST new dyeing employee
router.post('/add', async (req, res) => {
    try {
        const { Emp_ID, Emp_Name, Dept, position, Status } = req.body;

        const newRecord = new DyeModel({
            Emp_ID,
            Emp_Name,
            Dept,
            position,
            Status
        });

        await newRecord.save();
        res.status(201).json({ message: "Employee added successfully", data: newRecord });
    } catch (e) {
        res.status(400).json({ message: `An Error Occurred: ${e.message}` });
    }
});

// PUT route to update status
router.put('/status/:id', async (req, res) => {
    try {
        const emp = await DyeModel.findOne({ Emp_ID: req.params.id });
        if (!emp) return res.status(404).send("Employee not found");

        // Toggle status
        emp.Status = emp.Status === 'Active' ? 'In-Active' : 'Active';
        await emp.save();

        res.status(200).json({ message: "Status updated", status: emp.Status });
    } catch (e) {
        res.status(500).send(`Error updating status: ${e.message}`);
    }
});


module.exports = router;
