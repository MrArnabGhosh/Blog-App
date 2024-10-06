import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config();
const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDb connected');
}).catch(err =>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('server is running on port 3000!!')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRoutes)