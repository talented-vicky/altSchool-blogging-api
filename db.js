const mongoose = require('mongoose')

require('dotenv').config()
const DATABASE_CONNECTION_URL = process.env.DATABASE_CONNECTION_URL

const mongoDBConnect = () => {
    mongoose.connect(DATABASE_CONNECTION_URL)

    mongoose.connection.on('connected', () => {
        console.log('You have successfully connected to mongodb')
    })

    mongoose.connection.on('error', err => {
        // console.log(err)
        console.log('Oops! Something went wrong with the connection')
    })
}

module.exports = { mongoDBConnect }