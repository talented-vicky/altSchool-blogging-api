const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthorModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// a pre-hook to store a hash version of the retireved plain password
// into the database
AuthorModel.pre(
    'save',
    async next => {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }
)

// ensuring author credentials are correct/authentic
AuthorModel.methods.isValid = async pwd => {
    const author = this;
    const comparePwd = await bcrypt.compare(pwd, author.password)
    return comparePwd
}

module.exports = mongoose.model('author', AuthorModel)