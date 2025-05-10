const cut=require("../models/Cut");
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
module.exports=router;