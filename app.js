const express = require('express')

require('dotenv').config()
const PORT = process.env.PORT

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the home page');
})

app.listen(PORT, () => {
    console.log('server started')
})