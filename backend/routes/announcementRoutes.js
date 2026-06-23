const express = require("express");
const router = express.Router();

const Announcement =
require("../models/Announcement");

router.get("/", async (req,res)=>{
try{

const announcements =
await Announcement.find()
.sort({createdAt:-1});

res.json({
success:true,
announcements
});

}catch(err){
res.status(500).json({
success:false
});
}
});

router.post("/create", async (req,res)=>{
try{

const announcement =
await Announcement.create({
title:req.body.title,
message:req.body.message
});

res.json({
success:true,
announcement
});

}catch(err){
res.status(500).json({
success:false
});
}
});

module.exports = router;
