const passport = require('passport')
const localStrategy = require('passport-local')

const AuthModel = require('../models/auth')

const jwtStrategy = require('passport-jwt').Strategy
const extractJWT = require('passport-jwt').ExtractJwt

require('dotenv').config()

passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                return done(null, token.author)
            }catch(err){
                done(err)
            }
        }
    )
)


// fetching the user info provided and saving in the db and futher sending 
// this info (on success) to the next middleware
passport.use(
    'signup', // this string must be the same in passport.authenticate
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            // the values of the key above are automatically 
            // fetched by passport from the model and must conform to the
            // asyn parameters
            passReqToCallback: true // allows to fetch the other model parameters
        },
        async (req, email, password, done) => {
            try{
                const userFirstName = req.body.firstName
                const userLastName = req.body.lastName
                const user = await AuthModel.create({ 
                    userFirstName, userLastName, email, password 
                })
                return done(null, author)
            }catch(err){
                done(err)
            }
        }       
    )
)


// working on email and password authentication and further
// sending the author info to the next middleware
passport.use(
    'signin', // this string must be the same in passport.authenticate
    new localStrategy(
        {
            userName: 'email',
            pasword: 'password'
        },
        async (email, password, done) => {
            try{
                const author = await AuthModel.findOne({ email })
                if(!author) return done(null, false, {message: 'Author not found'})
                const validPassword = await author.findOne({ password})
                if(!validPassword) return done(null, false, {message: 'Wrong Password'})

                return done(null, false, {message: 'Successfully logged in'})
            }catch(err) {return done(err)}
        }
    )
)