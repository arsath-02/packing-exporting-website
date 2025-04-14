const express = require('express');
const Packaging= require('../models/Packing');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/pack',async( req , res) =>{
    try{
        const{
            product_id,
            method,
            weight,
            status
        } = req.body;
        const newPacking = new Packaging({
            product_id,
            method,
            weight,
            status
        });
        await newPacking.save();
        res.status(201).json({
            message:'Packing Entry created',
            packing:newPacking
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:'Server Error',
            error:err.message
        });

    }
});



router.get('/',async(req,res)=>{
    try{
        const packings= await Packaging.find().populate('product_id');
        res.status(200).json({
            message:'Packing Entries fetched successfully',
            packings
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:'Server Error',
            error:err.message
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Packing ID' });
        }

        const packing = await Packaging.findById(req.params.id).populate('product_id');
        if (!packing) {
            return res.status(404).json({ message: 'Packing Entry not found' });
        }

        res.status(200).json({ message: 'Packing Entry fetched successfully', packing });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Packed', 'Ready to Ship', 'Shipped'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedPacking = await Packaging.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedPacking) {
            return res.status(404).json({ message: 'Packing entry not found' });
        }

        res.status(200).json({ message: 'Packing status updated', packing: updatedPacking });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


    module.exports= router;

