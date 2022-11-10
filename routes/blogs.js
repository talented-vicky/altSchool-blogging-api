const express = require('express')
const blogRouter = express.Router()

const blogController = require('../controllers/blog')

// fetching a blog
blogRouter.get('/', blogController.getBlogs)

// creating a blog
blogRouter.post('/', (req, res) => {
    req.send('successfully created a new book')
})

// updating a blog
blogRouter.post('/:id', (req, res) => {
    const id = req.params.id
    req.send()
})

// deleting a blog
blogRouter.post('/:id', blogController.deleteBlogs)

module.exports = blogRouter;