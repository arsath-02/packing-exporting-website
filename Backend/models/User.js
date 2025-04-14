const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name :{type :String,required :true},
    email:{type:String ,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    role:{type:String ,enum:['employee','admin'],default:'employee'},
},{timestamps:true});

model.exports=mongoose.model('User',UserSchema);
