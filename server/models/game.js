const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const gameSchema =  new mongoose.Schema({
    name :{
        type : String,
        required:true
    },
    company :{
        type : String,
        required:true
    },
    category : {
        type : String,
        required:true
    },
    photo : {
        type : String,
        required : true
    },
    addedBy : {
        type:ObjectId,
        ref:"User"
    },
    totalRating : {
        type : Number,
        default : 0
    },
    noOfRating : {
        type : Number,
        default : 0
    }
})
mongoose.model("Game",gameSchema)