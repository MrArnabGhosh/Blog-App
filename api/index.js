import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const app = express()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDb connected');
}).catch(err =>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('server is running on port 3000!!')
})