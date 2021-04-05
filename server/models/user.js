const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ign: {
        type: String,
        default: "n00b"
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        }
    },
    dateOfBirth: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: "no photo"
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model("User", userSchema)