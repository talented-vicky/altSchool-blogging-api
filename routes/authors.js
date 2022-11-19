const express = require('express')

const authorRouter = express.Router()

const authorVerification = require('../authentication/verification')

const authorController = require('../controllers/author')

authorRouter.delete('/author/:authorId', authorVerification, authorController.updateAuthor)

authorRouter.put('/author/:authorId', authorVerification, authorController.deleteAuthor)

authorRouter.get('/author/:authorId', authorVerification, authorController.getAuthor)

module.exports = authorRouter