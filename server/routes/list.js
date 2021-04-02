const {
    json
} = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Rate = mongoose.model("Rate");
const User = mongoose.model("User");
const Game = mongoose.model("Game");
const List = mongoose.model("List");

// We ask for the User ID and the listType in the body, listType is a Number.
router.get("/getFav",requireLogin, (req, res) => {

    List.findOne({
            listType: "Fav",
            addedBy: req.user._id,
        }).populate("games",
        "_id name company coverPhoto noOfRating totalRating genre releaseDate platform description")
        .then((getlist) => {
            res.json({
                getlist
            });
        })
        .catch((err) => {
            console.log(err);
        })
});
router.get("/getCompleted",requireLogin, (req, res) => {
    List.findOne({
            listType: "Completed",
            addedBy: req.user._id,
        }).populate("games",
        "_id name company coverPhoto noOfRating totalRating genre releaseDate platform description")
        .then((getlist) => {
            res.json({
                getlist
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get("/getCurr",requireLogin, (req, res) => {
    List.findOne({
            listType: "Curr",

            addedBy: req.user._id,
        }).populate("games",
        "_id name company coverPhoto noOfRating totalRating genre releaseDate platform description")
        .then((getlist) => {
            res.json({
                getlist
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

/*  deleteGame is a boolean value that tells us if we want to delete a game or not.
    If it is false then we simply append the gameId to the games array or we remove the particular id if true.
*/

router.post("/updatelist", requireLogin, async (req, res) => {
    const {
        gameId,
        listType,
        deleteGame
    } = req.body;

    if (!gameId) {
        return res.status(422).json({
            error: "Please add all the fields"
        });
    }

    req.user.password = undefined;

    await List.findOne({
        addedBy: req.user._id,
        listType: listType
    }, (error, listData) => {
        if (error) {
            console.log(error);
        } else {
            if (listData == null) {
                //List does not exist for that user so we create a new one.
                console.log("List not found in Database");
                if (deleteGame) {
                    res.json({
                        error: "Delete failed. List not found in database."
                    });
                } else {
                    var newList = [];
                    newList.push(gameId);
                    const newListDocument = new List({
                        listType: listType,
                        games: newList,
                        addedBy: req.user._id
                    });
                    newListDocument.
                    save()
                        .then((result) => {
                            res.json({
                                message: "New list created.",
                                newList: result
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                }

            } else {
                
                //The user already has a list so we'll append to/remove from it
                console.log("List found in database");
                var newList = listData.games;
                if (deleteGame) {
                    newList = newList.filter(e => e != gameId);
                } else {
                    if(!newList.includes(gameId))
                        newList.push(gameId);
                }
                List.findByIdAndUpdate({
                    _id: listData._id
                }, {
                    games: newList
                }, {
                    new: true
                }, (error, updatedList) => {
                    if (error) console.log(error);
                    else console.log("Updated List " + updatedList);
                })
                .then((listResult) => {
                    res.json({
                        message: "List updated.",
                        newList: listResult
                    });
                });
            }
        }
    });
});


module.exports = router;