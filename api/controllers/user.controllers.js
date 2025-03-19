import user from "../models/user.model.js";
import { errorHandeller } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test =(req,res)=>{
    res.json({message:'api is working'})
};

export const updateUser = async (req,res,next)=>{
    if(req.body.id){
        if(req.user.id!==req.parms.userID){
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
        try {
          const updateUser =  await user.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password,
            },
          },{new:true})  
          const {password, ...rest} = updateUser._doc
          res.status(200),json(rest)
        } catch (error) {
            next(error)
        }
    }
}