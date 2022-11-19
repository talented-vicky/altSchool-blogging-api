const authorModel = require('../models/authors')
const blogModel = require('../models/blogs')

exports.updateAuthor = async (req, res, next) => {
    const author = req.author.author._id
    const authorID = req.params.authorId
    if(author === authorID){
        try{
            const updatedAuthor = await authorModel.findByIdAndUpdate(
                authorID, {$set: req.body}, {new: true}
            )
            res.status(200).json(updatedAuthor)
        }catch(err){
            res.status(500).json(err)
        }
    }
}

exports.deleteAuthor = async (req, res, next) => {
    const author = req.author.author._id
    const authorID = req.params.authorId
    if(author === authorID){
        try{
            await authorModel.findByIdAndDelete(authorID)
            await blogModel.deleteMany({author: author.email})
            res.status(200).json('Successfully deleted Author and blogs')
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json('You do not have permission to delete this user')
    }
}


exports.getAuthor = async (req, res, next) => {
    const authorID = req.params.authorId
    try{
        const author = await authorModel.findById(authorID)
        const {password, ...otherParams} = author._doc
        res.status(200).reder('admin/admin-blog', {
            authorBlog: otherParams,
            pageTitle: "Author's Page"
        })
    }catch(err){
        res.status(500).json(err)
    }
}