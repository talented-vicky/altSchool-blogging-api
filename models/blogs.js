const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogModel = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['Draft', 'Published'],
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('blog', blogModel)