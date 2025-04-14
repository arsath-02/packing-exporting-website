const mongoose = require('mongoose');

const ExportSchema = new mongoose.Schema({
    shipping_id:{type:String,unique:true,required:true},
    product_id:[{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true}],
    destination:{type:String,required:true},
    export_date:{type:Date,default:Date.now},
    status:{type:String,enum:['pending','Loaded','Shipped'],default:'pending'},
    tracking_number:{type:String,unique:true}
},{timestamps:true}
);
module.exports= mongoose.model('Export',ExportSchema);