import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, getPost } from '../controllers/post.controllers.js'


const router= express.Router()

router.post('/create',verifyToken, create)
router.get('/getposts',getPost)


export default router