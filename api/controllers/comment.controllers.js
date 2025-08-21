import Comment from "../models/comment.model.js"
import { errorHandeller } from "../utils/error.js"

export const createComment = async(req,res,next)=>{
    try {
        const {postId,content,userId}= req.body
        if(userId !==req.user.id){
            return next(errorHandeller(403,'You are not allowed to create a comment'))
        }
        const newComment = Comment({
            content,
            userId,
            postId,
        })
        await newComment.save()

        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}