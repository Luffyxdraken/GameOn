const express = require("express");
const Tournament = require("../models/Tournament");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth");

const router = express.Router();


/*
TEST + GET ALL TOURNAMENTS
*/
router.get("/", async (req, res) => {

  try {

    const tournaments = await Tournament.find();

    res.json({
      success: true,
      count: tournaments.length,
      tournaments
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

});


/*
CREATE TOURNAMENT
ADMIN ONLY
*/
router.post(
"/create",
verifyToken,
isAdmin,
async(req,res)=>{

try{

const tournament = new Tournament(req.body);

await tournament.save();

res.status(201).json({
success:true,
message:"Tournament Created",
tournament
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

});


/*
UPDATE TOURNAMENT
*/
router.put(
"/update/:id",
verifyToken,
isAdmin,
async(req,res)=>{

try{

const tournament =
await Tournament.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);


res.json({
success:true,
tournament
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

});


module.exports = router;
