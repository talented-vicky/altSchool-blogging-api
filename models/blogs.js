const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogModel = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: [2022]
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('blog', blogModel)