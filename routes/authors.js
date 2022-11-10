const express = require('express')

const authorRouter = express.Router()


authorRouter.get('/authors', (req, res) => {
    res.send('this is our author route')
})