const mongoose  = require('mongoose');

const DyeEmp_Schema = new mongoose.Schema({
    Emp_ID : {type:String,required:true,unique:true},
    Emp_Name : {type:String, required:true},
    Dept : {type:String, required:true},
    position : {type:String, required:true},
    Status : {type:String, required:true}
})

module.exports = mongoose.model("Dye_emp",DyeEmp_Schema);