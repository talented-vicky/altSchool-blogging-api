const AuthorModel = require('../models/authors')
const BlogModel = require('../models/blogs')

exports.getBlogs = ('/', (req, res) => {
    BlogModel.find()
        .then(blog => {
            res.send(blog)
        }).catch(err => console.log(err))

    // res.render('blogs', {
    //     kd: 'dkd',
    //     tik: 'dk'
    // })
})

exports.postBlogs = ('/', (req, res) => {
    const blog = req.body
    // res.render('views/blogs', {
    //     kd: 'dkd',
    //     tik: 'dk'
    // })
}) 

exports.deleteBlogs = ('/', (req, res) => {
    const id = req.params.id
    BlogModel.findById()
        .then(blog => {
            res.send(blog)
        }).catch(err => console.log(err))

    // res.render('blogs', {
    //     kd: 'dkd',
    //     tik: 'dk'
    // })
})