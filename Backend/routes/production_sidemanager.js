
const Pack=require("../models/Packing");
const Stiches=require("../models/Stitch")

const express=require("express");
const router=express.Router();
router.put("/",async (req,res)=>{
 try{
  const {id}=req.body;
  console.log("Packing id",id);
  const re1 = await Stiches.findByIdAndUpdate(id, { stages: "Packing Section" }, { new: true });
  const f1 = await Stiches.findByIdAndUpdate(id, { status: "Pending" }, { new: true });
  console.log("re1 value",re1," ");
  console.log("f1:",f1);
  const fObj1 = f1.toObject();
  delete fObj1._id;
  const df1 = new Pack(fObj1);
  await df1.save();

  console.log(df1);
  res.status(200).json(f1);

 }
 catch(err)
 {
  console.log("Error at the backend in manager production api",err);
  res.status(401).json({message:"hi"+err});
 }
});
module.exports=router;