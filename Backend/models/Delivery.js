const mongoose = require('mongoose');
const DeliverySchema= new mongoose.Schema({
    shipping_id:{type:String,unqiue:true,required:true},
    garment_id:[{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true}],
    destination:{type:String,required:true},
    delivery_date:{type:Date,default:Date.now},
    status:{type:String,enum:['pending','Delivered'],default:'pending'},
},{timestamps:true}
);

module.exports = mongoose.model('Delivery',DeliverySchema);
