const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireAdmin = require("../middleware/requireAdmin");
const Game = mongoose.model("Game");
const Award = mongoose.model("Award");

router.post("/addAward", requireAdmin, (req, res) => {
  const {
    game_id,
    category,
    platform,
    year
  } = req.body;
  if (!game_id ||!platform|| !category || !year) {
    //checking input fields
    return res.json({
      error: "Provide all the fields"
    });
  }
  Game.findOne({
    _id: game_id
  }, (error, game_data) => {
    if (game_data == null) {
      //checking if game exists
      return res.json({
        error: "Game does not exist in database"
      });
    }
    Award.findOne({
      category: category,
      platform: platform
    }, (error, award_data) => {
      if (award_data == null) {
        //checking if already awarded
        console.log("Not awarded");
        const award = new Award({
          game: game_data._id,
          category,
          platform,
          year,
        });
        award
          .save()
          .then((result) => {
            res.json({
              award: result
            });
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      } else {
        Award.findByIdAndUpdate({
            _id: award_data._id
          }, {
            category,
            platform,
            year
          }, {
            new: true
          },
          (error, updatedAward) => {
            if (error) console.log("error");
            else {
              res.json({
                updatedAward
              });
            }
          }
        );
      }
    });
  });
});

//delete award
router.post("/deleteAward", requireAdmin, (req, res) => {
  const {
    award_id
  } = req.body;
  if (!award_id) {
    return res.json({
      message: "Provide award Id"
    });
  }
  Award.findOneAndDelete({
    _id: award_id
  }, (error, deletedAward) => {
    if (error) console.log(error);
    else {
      console.log(deletedAward);
      res.json({
        message: "Deleted"
      });
    }
  });
});

//all awards
router.get("/allAwards", (req, res) => {
  Award.find()
    .then((awards) => {
      res.json({
        awards,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/findAwardsByPlatform", (req, res) => {
  const {
    platform
  } = req.body;
  Award.find({
      platform: platform
    }).populate("game")
    .then((awards) => {
      res.json({
        awards
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;