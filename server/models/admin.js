const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    photo: {
        type: String,
        default:"no photo"
    },
    password: {
        type: String,
        required:true
    }
})

mongoose.model("Admin",adminSchema)