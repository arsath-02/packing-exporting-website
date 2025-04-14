const mongoose=require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{type:String,required:true},
    material:{type:String,required:true},
    size:{type:String,required:true},
    color:{type:String,required:true},
    quantity:{type:Number,required:true},
    },{timestamps:true}
);

model.exports=mongoose.model('Product',ProductSchema);