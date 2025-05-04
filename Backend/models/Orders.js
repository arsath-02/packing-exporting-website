const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    order_id: { 
        type: String, 
        required: true, 
        unique: true,  
    },
    name: { 
        type: String, 
        required: true 
    },
    material: { 
        type: String, 
        required: true 
    },
    size: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Orders', OrdersSchema);
