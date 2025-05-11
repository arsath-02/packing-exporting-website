const Pack=require("../models/Packing")
const stitch=require("../models/Stitch")
const express=require("express");
const router=express.Router();
router.get("/",async(req,res)=>{
  try{
    const data=await stitch.find({});
    res.status(200).json(data);

  }
  catch(err)
  {
    console.log("Error in cutting get backend",err);
    res.status(401).json(err);
  }

});
router.put("/put1",async (req,res)=>{
  try
  {
   const {id}=req.body;
   const data= await  stitch.findByIdAndUpdate(id,{status:"In Progress"},{new:true});
   res.status(200).json(data);
  }
  catch(err)
  {
    console.log("error in backend in prohess api in cut");
    res.status(401).json(err);
  }
});
router.put("/put2",async (req,res)=>{
  try
  {
   const {id}=req.body;
   const data1= await  stitch.findByIdAndUpdate(id,{status:"Completed"},{new:true});
   const f=await  stitch.findById(id);
   const fObj = f.toObject();
   delete fObj._id;
   const df = new Pack({ ...fObj, status: "Pending" ,stages:"Packing section"});


   df.save()
   res.status(200).json(df);
  }
  catch(err)
  {
    console.log("error in backend in prohess api in cut");
    res.status(401).json(err);
  }
});
module.exports=router;