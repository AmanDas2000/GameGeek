const { json } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Rate = mongoose.model("Rate");
const User = mongoose.model("User");
const Game = mongoose.model("Game");

router.get("/allrating", (req, res) => {
  Rate.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* router.post('/rate',requireLogin,(req,res)=>{
    const {game,rating} = req.body 
    if(!game || !rating ){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const rate = new Rate({
        game,
        rating,
        postedBy:req.user
    })
    rate.save().then(result=>{
        res.json({rate:result})
    })
    .catch(err=>{
        console.log(err)
    })
}) */

//add rating using name
router.post("/rate", requireLogin, async (req, res) => {
  const { game, rating } = req.body;
  if (!game || !rating) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  req.user.password = undefined;

  await Game.findOne({ name: game }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      if (data == null) {
        console.log("Game not found in Database");
        res.json({ error: "Game not found in Database" });
      } else {
        console.log(data);
        const rate = new Rate({
          game: data,
          rating,
          postedBy: req.user,
        });
        rate
          .save()
          .then((result) => {
            res.json({ rate: result });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
});

router.get("/userrated", requireLogin, (req, res) => {
  Rate.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((userrated) => {
      res.json({ userrated });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
