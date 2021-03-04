const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    game:{
        type:ObjectId,
        ref:"Game"
    },
    rating:{
        type:Number,
        required:true
    },
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
})

mongoose.model("Rate",postSchema)