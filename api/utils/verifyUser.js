import jwt from 'jsonwebtoken'
import {errorHandeller} from './error.js'

// export const verifyToken = (req,res,next)=>{
//     const token = req.cookies.access_token;
//     if(!token){
//         return next(errorHandeller(401,'Unauthorized'))
//     }
//     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
//         if(err){
//             return next(errorHandeller(401,'Unauthorized'))
//         }
//         req.user = user;
//         next()
//     })
// }


export const verifyToken = (req, res, next) => {
    // console.log("Cookies received:", req.cookies); // Debugging line

    const token = req.cookies.access_token;
    if (!token) {
        // console.log("No token found!"); // Debugging line
        return next(errorHandeller(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // console.log("Token verification failed!"); // Debugging line
            return next(errorHandeller(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    });
};
