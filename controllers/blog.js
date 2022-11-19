const BlogModel = require('../models/blogs')

exports.getBlogs = ((req, res, next) => {
    // this is working fine NOW
    BlogModel.find()
        .then(blog => {
            res.render('user/blogs', {
                blogs: blog,
                pageTitle: 'All Blogs written',
                path: '/'
            })
        }).catch(err => console.log(err))
})

exports.getBlog = ((req, res, next) => {
    const id = req.params.blogID
    // fetched the above from the route file
    BlogModel.findById(id)
        .then(blog => {
            res.render('user/detail-blog', {
                pageTitle: 'Single Blog',
                // the path would make it seem as if we're in the general blog page
                path: '/',
                blog: blog
            })
        }).catch(err => console.log(err))
})

exports.getCreateBlog = ((req, res, next) => {
    // this is working fine NOW
    res.render('user/edit-blog', {
        pageTitle: 'Create New Blog',
        path: '/create-blog',
        editMode: false
    })
})

exports.createBlog = ((req, res, next) => {
    // this is working fine NOW
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year
    const blogContent = req.body.blogContent;
    const blogState = req.body.blogState;
    
    const Blog = new BlogModel({
        title: title, 
        author: author,
        year: year, 
        blog: blogContent,
        state: blogState
    })

    Blog.save()
        .then(newBlog => {
            console.log(`successfully created ${newBlog.title}`)
            res.redirect('/')
        }).catch(err => {
            res.status(400).send('unable to create new blog')
            console.log(err)
        })
}) 

exports.updateBlog = ((req, res, next) => {
    // not ready yet
    const id = req.params.id
    const editing = req.params.edit
    BlogModel.findByIdAndUpdate(id)
        .then(blog => {
            res.render('views/edit-blog', {
                blog: newBlog,
                pageTitle: newBlog.title,
                editMode: editing
            })
            console.log('successfully updated blog')
            res.redirect('/')
        }).catch(err => {
            res.status(404).send('update failed')
            console.log(err)
        })
})

exports.deleteBlog = ((req, res, next) => {
    // not ready yet
    const id = req.params.id
    BlogModel.findById(id)
        .then(blog => {
            res.status(201).send('successfully deleted blog')
            res.redirect('/')
        }).catch(err => res.status(400).send(err))
})