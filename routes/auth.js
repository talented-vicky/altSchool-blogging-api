const express = require('express')

const authRouter = express.Router()

const authController = require('../controllers/auth')

authRouter.get('/sign-in', authController.getSignIn)

authRouter.post('/sign-in', authController.postSignIn)
// recall this route is same as passed in the form

authRouter.get('/sign-up', authController.getSignUp)

authRouter.post('/sign-up', authController.postSignUp)
// this route is also the same as that passed in the form

module.exports = authRouter