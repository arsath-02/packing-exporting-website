const Cut=require("../models/Cut");
const Dye=require("../models/Dye");
const Pack=require("../models/Packing");
const Stiches=require("../models/Stitch")

const express=require("express");
const router=express.Router();
router.put("/", async (req, res) => {
  try {
    const { oid } = req.body;
    console.log(oid);

    const re = await Dye.findByIdAndUpdate(oid, { stages: "Cutting Section" }, { new: true });
    const f = await Dye.findByIdAndUpdate(oid, { status: "Pending" }, { new: true });

    const fObj = f.toObject();
    delete fObj._id;
    const df = new Cut(fObj);
    await df.save();

    console.log(df);
    res.status(200).json(f);
  } catch (err) {
    console.log("error at the backend api update cut", err);
    res.status(401).json({ message: "error at the backend api " + err });
  }
});

// router.put("/production",async (req,res)=>{
//  try{
//   const {id}=req.body;
//   console.log("Packing id",id);
//   const re1 = await Stiches.findByIdAndUpdate(oid, { stages: "Packing Section" }, { new: true });
//   const f1 = await Stiches.findByIdAndUpdate(oid, { status: "Pending" }, { new: true });

//   const fObj1 = f1.toObject();
//   delete fObj1._id;
//   const df1 = new Pack(fObj1);
//   await df1.save();

//   console.log(df1);
//   res.status(200).json(f1);

//  }
//  catch(err)
//  {
//   console.log("Error at the backend in manager production api",err);
//   res.status(401).json({message:err});
//  }
// });
module.exports=router;