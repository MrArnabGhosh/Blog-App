import express from 'express'
import { createComment, getPostComments, likeComment } from '../controllers/comment.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId',getPostComments)
router.put('/likecomment/:commentId',verifyToken,likeComment)



export default router