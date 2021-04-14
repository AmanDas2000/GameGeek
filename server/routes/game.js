const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireAdmin = require("../middleware/requireAdmin");
const {
    route
} = require('./rate');
const Game = mongoose.model("Game");

router.get('/findallgames', (req, res) => {
    Game.find()
        .populate("addedBy", "_id name")
        .then(games => {
            res.json({
                games
            })
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/addgame', requireAdmin, (req, res) => {
    const {
        name,
        company,
        genre,
        releaseDate,
        description,
        platform,
        coverPhoto
    } = req.body;
    const inputFields = [name, company, genre, releaseDate, description, platform, coverPhoto];
    for (i in inputFields) {
        if (!i)
            return res.json({
                error: "Provide all the fields"
            });
    }

    Game.findOne({
        name: name
    }, (error, gameData) => {
        if (error) {
            console.log(error);
        } else {
            if (gameData == null) {
                //game doesn't exist so we can add it
                console.log("Game doesn't exist.");
                console.log(req);
                const newGame = new Game({
                    name: name,
                    company: company,
                    genre: genre,
                    releaseDate: releaseDate,
                    description: description,
                    platform: platform,
                    coverPhoto: coverPhoto,
                    addedBy: req.user._id
                });
                newGame.save().then((result) => {
                    res.json({
                        message: "New game added successfully.",
                        newGame: result
                    });
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                //game exists so we'll update the details
                console.log("Game exists. Updating.");
                Game.findByIdAndUpdate({
                    _id: gameData._id
                }, {
                    company: company,
                    genre: genre,
                    releaseDate: releaseDate,
                    description: description,
                    platform: platform,
                    coverPhoto: coverPhoto,
                    addedBy: req.user._id
                }, {
                    new: true
                }, (error, updatedGameData) => {
                    if (error) console.log(error);
                    else console.log("Updated game " + updatedGameData);
                }).then((gameResult) => {
                    res.json({
                        message: "Game updated.",
                        updatedGame: gameResult
                    });
                });
            }
        }
    });
});

router.get("/getpopular", (req, res) => {
    Game.find({}, null, {
        limit: 20,
        sort: {
            noOfRating: -1
        }
    }).then(popularGames => {
        res.json(popularGames)
    }).catch(err => {
        console.log(err);
    })
});

router.get("/gethighestrated",(req,res)=> {
    Game.find({}, null, {
        limit: 20,
        sort: {
            avgRating: -1
        }
    }).then(highestRatedGames => {
        res.json(highestRatedGames)
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;