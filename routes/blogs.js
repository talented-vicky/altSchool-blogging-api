const express = require('express')
const blogRouter = express.Router()

const blogController = require('../controllers/blog')

// fetching all blogs
blogRouter.get('/', blogController.getBlogs)

// fetching a particular blog
blogRouter.get('/single-blog/:blogID', blogController.getBlog)

// displaying blog creation page
blogRouter.get('/create-blog', blogController.getCreateBlog)

// creating a blog
blogRouter.post('/blog', blogController.createBlog)

// updating a blog
blogRouter.post('/update/:id', blogController.updateBlog)

// deleting a blog
blogRouter.post('/delete/:id', blogController.deleteBlog)

module.exports = blogRouter;