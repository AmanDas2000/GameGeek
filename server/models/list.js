const mongoose = require('mongoose');
const {
    ObjectId
} = mongoose.Schema.Types;

const listSchema = new mongoose.Schema({
    listType: {
        type: String,
        required:true
    },
    games: [{
        type: ObjectId,
        required: true,
        ref: "Game"
    }],
    addedBy: {
        type: ObjectId,
        required: true,
        ref: "User" 
    }
});

mongoose.model("List",listSchema)