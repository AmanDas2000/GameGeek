const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const gameSchema =  new mongoose.Schema({
    name :{
        type : String,
        required:true
    },
    company :[{
        type : String,
        required:true
    }],
    genre : [{
        type : String,
        required:true
    }],
    releaseDate:{
        type : Date,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    platform:[{
        type : String,
        required : true
    }],
    coverPhoto : {
        type : String,
        required : true
    },
    addedBy : {
        type:ObjectId,
        ref:"Admin"
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