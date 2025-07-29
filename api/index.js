import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config();
const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL (or whatever port Vite is running on)
    credentials: true
  }));

app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDb connected');
}).catch(err =>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('server is running on port 3000!!')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/post',postRouter)



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message = err.message||'internal server error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
});