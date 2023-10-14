const mongoose = require("mongoose");

const postScheme = new mongoose.Schema({
    title: String,
    description: String,
    author:String,
    isUpdated: {
        type: Boolean,
        default: false
    },
    date_updated: {
        type: Date,
        default: null
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    views: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Posts", postScheme);