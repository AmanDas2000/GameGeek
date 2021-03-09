const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Game =  mongoose.model("Game")

router.get('/allgames', (req, res) => {
    Game.find()
        .populate("addedBy","_id name")
        .then(games => {
        res.json({games})
        })
        .catch(err => {
        console.log(err)
    })
})


module.exports = router