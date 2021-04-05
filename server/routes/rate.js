const { json } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Rate = mongoose.model("Rate");
const User = mongoose.model("User");
const Game = mongoose.model("Game");


//adding without game id
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

router.post("/rate", requireLogin, async (req, res) => {
  var { id, rating, review } = req.body;  

  if (!id || !rating) {
    return res.status(422).json({
      error: "Please add all the fields",
    });
  }
  req.user.password = undefined;

  await Game.findOne(
    {
      _id: id,
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        if (data == null) {
          console.log("Game not found in Database");
          res.json({
            error: "Game not found in Database",
          });
        } else {
          var game_data = data;
          console.log(data);
          Rate.findOne(
            {
              game: {
                _id: id, // this id is a game id
              },
              postedBy: {
                _id: req.user._id,
              },
            },
            (error, data) => {
              if (error) {
                console.log(error);
              } else {
                if (data == null) {
                  console.log("No existing rating found by this user.");
                  //add new rating (FINAL)

                  var newRating = game_data.totalRating + rating;
                  var increasedRating = game_data.noOfRating + 1;
                  Game.findByIdAndUpdate(
                    {
                      _id: id,
                    },
                    {
                      totalRating: newRating,
                      noOfRating: increasedRating,
                      avgRating: (newRating/increasedRating).toFixed(1)
                    },
                    {
                      new: true,
                    },
                    (error, updatedGame) => {
                      if (error) console.log(Error);
                      else {
                        console.log("UPDATED GAME " + updatedGame);
                      }
                    }
                  ).then(() => {
                    if(review.title==null){
                      checkReview = false
                    }else{
                      checkReview=true
                    }
                    const rate = new Rate({
                      game: game_data._id,
                      rating,
                      review,
                      ifReview : checkReview,
                      postedBy: req.user._id,
                    });
                    rate
                      .save()
                      .then((result) => {
                        res.json({
                          message: "New rating added",
                          rate: result,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
                } else {
                  console.log("Existing rating found");

                  //update rating
                  if(review.title==null){
                    checkReview = false
                  }else{
                    checkReview=true
                  }
                  var oldRating = data.rating; // this is a rate data
                  Rate.findByIdAndUpdate(
                    {
                      _id: data._id,
                    },
                    {
                      rating,
                      review,
                      ifReview : checkReview
                    },
                    {
                      new: true,
                    },
                    (error, rating_data) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Updated Rating " + rating);
                      }
                    }
                  ).then((rate_result) => {
                    var newTotalRating =
                      game_data.totalRating - oldRating + rating;
                    console.log({
                      newTotalRating,
                    });
                    Game.findByIdAndUpdate(
                      {
                        _id: game_data._id,
                      },
                      {
                        totalRating: newTotalRating,
                        avgRating: (newTotalRating/game_data.noOfRating).toFixed(1)
                      },
                      {
                        new: true,
                      },
                      (error, updatedGame) => {
                        if (error) console.log(error);
                        else {
                          console.log("UPDATED GAME " + updatedGame);
                        }
                      }
                    );
                    res.json({
                      message: "Updated rating",
                      rate: rate_result,
                    });
                  });
                }
              }
            }
          );
        }
      }
    }
  );
});
//all ratings
router.get("/allrating", (req, res) => {
  Rate.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({
        posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/allreviews", (req, res) => {
//   const { gameId } = req.body;
//   Rate.find({
//     review: { title:  }, 
//     game: { _id: gameId }
//   })
//     .populate("rate", "_id rating review")
//     .populate("postedBy", "_id name")
//     .then((posts) => {
//       res.json({
//         posts,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//user reviews
router.get("/useReview", requireLogin, (req, res) => {
  Rate.find({
    postedBy: req.user._id,
  })
    .populate("game", "_id name company photo noOfRating") //no idea what this does
    .populate("postedBy", "_id name photo")
    .then((userrated) => {
      res.json({
        userrated,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//all rated games by a user
router.get("/userrated", requireLogin, (req, res) => {
  Rate.find({
    postedBy: req.user._id,
  })
    .populate("game",
      "_id name company coverPhoto noOfRating totalRating genre releaseDate platform description") //no idea what this does
    .populate("postedBy", "_id name coverPhoto")
    .then((userrated) => {
      res.json({
        userrated,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/findReview", (req, res) => {
  
  const { gameId } = req.body;
  if (!gameId) {
    return res.json({ message: "Provide game Id" });
  }
  Rate.find({game:{_id:gameId},ifReview : true},null,{limit : 2}
  )
    .populate("rate",
      "_id rating review") //no idea what this does
    .then((rated) => {
      res.json({
        rated,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete game rating
router.post("/deleteRate", requireLogin, (req, res) => {
  const { gameId } = req.body;
  if (!gameId) {
    return res.json({ message: "Provide game Id" });
  }
  Rate.findOneAndDelete(
    { game: { _id: gameId }, postedBy: { _id: req.user._id } },
    (error, deletedRate) => {
      if (error) console.log(error);
      else {
        console.log(deletedRate);
        res.json({ message: "Deleted" });
      }
    }
  );
});

module.exports = router;
