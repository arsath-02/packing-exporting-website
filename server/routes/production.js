const cut=require("../models/Cut");
const stitch=require("../models/Stitch")
const express=require("express");
const router=express.Router();
router.get("/cut",async(req,res)=>{
  try{
    const data=await cut.find({});
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
   const data= await cut.findByIdAndUpdate(id,{status:"In Progress"},{new:true});
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
   const data1= await cut.findByIdAndUpdate(id,{status:"Completed"},{new:true});
   const f=await cut.findById(id);
   const fObj = f.toObject();
   delete fObj._id;
   const df = new stitch({ ...fObj, status: "Pending" ,stages:"Stitching section"});


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