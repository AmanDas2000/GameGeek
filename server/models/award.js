const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const awardSchema = new mongoose.Schema({
    game:{
        type : ObjectId,
        ref : "Game"
    },
    year:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required: true
    }

})

mongoose.model("Award",awardSchema)