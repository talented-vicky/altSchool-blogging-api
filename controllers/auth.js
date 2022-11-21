const passport = require('passport')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.getSignIn = (req, res, next) => {
    res.render('auth/sign-in', {
        pageTitle: 'User Sign In',
        path: '/user/sign-in'
    })
}

exports.postSignIn = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, author, info) => {
            try {
                if(err) return next(err)
                if(!author){
                    const error = new Error('Username of password incorrect')
                    return next(error)
                }
                req.signin(
                    AuthenticatorResponse,
                    {session: false},
                    async err => {
                        if(err) return next(err)
                        const body = {_id: author._id, email: author.email}
                        const token = jwt.sign(
                            {author: body}, process.env.JWT_SECRET, {expiresIn: '1h'}
                        )
                        const cookieOption = {
                            expires: new Date(Date.now() + (24 * 60 * 60 * 10000)),
                            httpOnly: true,
                            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
                        }                        
                        res.cookie('jwt', token, cookieOption)
                        return res.json({ token })
                    }
                )
            }catch(err){
                info(err)
            }
        }
    )(req, res, next)
}

exports.getSignUp = (re, res, next) => {
    res.render('auth/sign-up', {
        pageTitle: 'User Sign Up',
        path: '/user/sign-up'
    })
}

exports.postSignUp = async (req, res, next) => {
    passport.authenticate(
        // 'signup', 
        // {session: false},
        // res.json({
        //     message: 'Successfully signed up',
        //     user: {
        //         email: email,
        //         password: pwd
        //     }
        // }),
        res.redirect('/')
    )
}