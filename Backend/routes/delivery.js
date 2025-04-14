const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Delivery = require('../models/Delivery');
//const Product = require('../models/Product');

router.post('/add',async(req,res)=>{
    try{
        const {
            shipping_id,
            product_id,
            destination,
            delivery_date,
            status
        } = req.body;

        const newDelivery = new Delivery({
            shipping_id,
            product_id,
            destination,
            delivery_date,
            status
        });

        await newDelivery.save();
        res.status(201).json({
            message: 'Delivery entry created',
            delivery: newDelivery
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

router.get('/',async(req,res)=>{
    try{
        const deliveries = await Delivery.find().populate('product_id');
        res.status(200).json({
            message: 'Deliveries fetched successfully',
            deliveries
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});


router.get('/:id', async (req, res) => {
    try{
        const delivery = await Delivery.findById(req.params.id).populate('product_id');
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        res.status(200).json({
            message: 'Delivery fetched successfully',
            delivery
        });

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

router.put('/:id/status',async(req,res)=>{
    try{
        const { status } = req.body;
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json({
            message: 'Delivery Status updated successfully',
            delivery
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});



module.exports = router;