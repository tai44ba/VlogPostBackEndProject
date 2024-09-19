import Post from "../models/posts.model.js"
import User from "../models/users.model.js"


export const getAllPosts = async(req,res,next) => {
    try {
        const posts = await Post.find().populate('creator','name').exec()

        res.json({msg:"Got all posts !!",posts})
    } catch (error) {
        next(error)
    }
}


export const toPost = async(req,res,next) => {
    try {
        const {title,description} = req.body
        const {userID} = req.tokenPayload
        const newPost = await Post.create({title,description,creator:userID})
        const user = await User.findById(userID)
        user.posts = [...user.posts,newPost._id]
        user.save()
        res.json({msg:"added new post!!",post:newPost})
    } catch (error) {
        next(error)
    }
}