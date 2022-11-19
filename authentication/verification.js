const jwt = require('jsonwebtoken')

require('dotenv').config()

const verification = async (req, res, next) => {
    const authHeader = await req.headers.authorization;
    const jwtVerify = token => {
        jwt.verify(
            token, 
            process.env.JWT_SECRET,
            (err, author) => {
                if(err) return res.status(403).json('Oops! invalid token')
                req.author = author
                if(req.author.author._id !== req.params.authorId){
                    return res.status(403).json('you are using a wrong token')
                }
                next()
            }
        )
    }
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwtVerify(token)
    }else if(req.cookies){
        const token = req.cookies.jwt
        jwtVerify(token)
    }else{
        res.status(401).json('Sorry, you are not authenticated')
    }
}

module.exports = verification