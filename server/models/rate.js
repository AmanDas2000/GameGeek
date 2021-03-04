const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    game:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
})

mongoose.model("Rate",postSchema)