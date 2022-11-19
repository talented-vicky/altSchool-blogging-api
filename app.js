const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { mongoDBConnect } = require('./db')

const authorRoutes = require('./routes/authors')
const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blogs')
// registering my routes to app

// using port from dotenv file
require('dotenv').config()
const PORT = process.env.PORT

const app = express()
mongoDBConnect();

// body parser and css static access
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// using my ejs templating engine
app.set('view engine', 'ejs')
app.set('views', 'views')   

// using my routes with express
app.use(blogRoutes)
app.use(authRoutes)
// app.use(authorRoutes)

app.use(cookieParser())

app.listen(PORT, () => {
    console.log('server started')
})


