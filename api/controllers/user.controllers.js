import User from "../models/user.model.js";

import { errorHandeller } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

// export const test =(req,res)=>{
//     res.json({message:'api is working'})
// };

// update user Api route 
export const updateUser = async (req,res,next)=>{
    if(req.body.id){
        if(req.user.id !==req.params.userId){
            return next(errorHandeller(403,'You are not allowed to Update this User'))
        }
    }
    if(req.body.password){
    if(req.body.password.length<6){
        return next(errorHandeller(400,'password must be at least 6 character'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password,10)
    }
    if(req.body.username){
        if(req.body.username.length<7 || req.body.username.length>20){
            return next(errorHandeller(400,'Username must be bwtween 7 and 20 character'))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandeller(400,'Username cannot contains spaces')) 
        }
        if(req.body.username!==req.body.username.toLowerCase()){
            return next(errorHandeller(400,'Username must be lower case')) 
        }
        if(!req.body.username.match(/^[a-zA-z0-9]+$/)){
            return next(errorHandeller(400,'Username can only contains letter and number')) 
        }
    }
        try {
          const updateUser =  await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password,
            },
          },{new:true})  
          const {password, ...rest} = updateUser._doc
          res.status(200).json(rest)
        } catch (error) {
            next(error)
        }
    
}

// delete user Api route
export const deleteUser = async(req,res,next)=>{
    if(req.user.id != req.params.userId){
        return next(errorHandeller(403,'you are not allowed to delete this user'))
    }
    try {
      await User.findByIdAndDelete(req.params.userId)
      res.status(200).json('user has been deleted')  
    } catch (error) {
        next(error)
    }
}

export const signout = async(req,res,next)=>{
    try {
       res.clearCookie('access_token').status(200).json('User has been sign Out') 
    } catch (error) {
       next(error) 
    }
}

export const getUsers = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandeller(403,'You are not allowed to see all users'))
    }
    try {
       const startIndex = parseInt(req.query.startIndex) ||0
       const limit = parseInt(req.query.limit)||9
       const sortDirection = req.query.sort ==='asc' ?  1:-1
       const users = await User.find()
       .sort({createdAt:sortDirection})
       .skip(startIndex) 
       .limit(limit)

       const userWithoutPassword= users.map((user)=>{
        const {password, ...rest} = user._doc
        return rest
       })

       const totalUser = await User.countDocuments()
       const now = new Date()
       const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
       )

       const lastMontUsers = await User.countDocuments({
        createdAt:{$gte:oneMonthAgo}
       })

       res.status(200).json({
        users:userWithoutPassword,
        totalUser,
        lastMontUsers,
       })
    } catch (error) {
        
    }
}