const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { name, material, size, color, quantity } = req.body;

        if (!name || !material || !size || !color || !quantity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = new Product({ name, material, size, color, quantity });
        await newProduct.save();

        res.status(201).json({ message: 'Product entry created', product: newProduct });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json({ message: 'Products fetched successfully', products });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product fetched successfully', product });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { name, material, size, color, quantity } = req.body;

        if (!name || !material || !size || !color || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, material, size, color, quantity },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product entry updated successfully', product });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;