
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
  game: {
    type: ObjectId,
    ref: "Game",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0.1,
    max: 10,
  },
  review: {
      title : {
          type : String,
          default : "NA"
      },
      description : {
          type : String,
          default : "NA"
      }
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Rate", postSchema);

