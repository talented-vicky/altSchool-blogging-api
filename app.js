const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const { mongoDBConnect } = require('./db')
const authorRoutes = require('./routes/authors')
const blogRoutes = require('./routes/blogs')
// registering my routes to app

// using port from dotenv file
require('dotenv').config()
const PORT = process.env.PORT

const app = express()
mongoDBConnect();

// body parser and css static access
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// using my ejs templating engine
app.set('view enjine', 'ejs')
app.set('views', 'views')   

// using my routes with express
app.use(blogRoutes)
app.use(authorRoutes)

app.listen(PORT, () => {
    console.log('server started')
})