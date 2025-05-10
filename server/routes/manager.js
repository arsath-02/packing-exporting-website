const Cut=require("../models/Cut");
const Dye=require("../models/Dye");
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

module.exports=router;