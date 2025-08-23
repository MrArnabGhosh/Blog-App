import { Alert, Button, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Comment from './Comment'


export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state=>state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)
    const [showComment, setShowComment] = useState([])

    const handelSubmit = async(e)=>{
      e.preventDefault()
      if(comment.length>200){
        return
      }
      try {
        const res= await fetch('/api/comment/create',{
          method:'POST',
          headers:{
            'content-Type':'application/json',
          },
          body:JSON.stringify({content:comment,postId,userId:currentUser._id}),
        })
        const data = await res.json()
        if(res.ok){
          setComment('')
          setCommentError(null)
          setShowComment([data ,...showComment])
        }
  
      } catch (error) {
        setCommentError(error.message)
      }
    }
    console.log(showComment);

    useEffect(()=>{
      const getComments = async()=>{
        try {
          const res = await fetch(`/api/comment/getPostComments/${postId}`)
          if(res.ok){
            const data = await res.json({})
            setShowComment(data)
          }
        } catch (error) {
          console.log(error)
        }
      }
      getComments()
    },[postId])
  return (
    <div className='max-w-xl mx-auto w-full p-3'>
      {currentUser ?
      (
        <div className='flex items-center gap-1 my-5 text-gray-500'>
          <p>Signed in as :</p>
          <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
          <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>@{currentUser.username}</Link>
        </div>
      ):
      (
        <div className='text-sm my-5 text-teal-500 flex gap-1'>
          you must be signed in to comment
          <Link className='text-blue-500 hover:underline' to={'/signin'}>Sign in</Link>
        </div>
      )
      }
      {currentUser &&(
        <form onSubmit={handelSubmit} className='border border-teal-500 p-3 rounded-md'>
        <Textarea 
        placeholder='Add a comment...'
        rows='3'
        maxLength='200'
        onChange={(e)=>setComment(e.target.value)}
        value={comment}
        />
        <div className='flex justify-between items-center mt-5'>
          <p className='text-gray-500 text-xs'>{200 - comment.length} cheracters remaining</p>
          <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                Submit
          </Button>
        </div>
        {commentError &&(
          <Alert color='failure' className='mt-5'>
              {commentError}
          </Alert>
        )}
        </form>
      )}
      {showComment.length ===0 ? (
          <p className='text-sm my-5'>No comments Yet!</p>
      ) :(
        <>
         <div className='text-sm my-5 flex items-center gap-1'>
          <p>Comments</p>
          <div className='border border-gray-400 py-1 px-2 rounded-sm'>
            <p>{showComment.length}</p>
          </div>
         </div>
         {showComment.map(comment=>(
          <Comment key={comment._id} comment={comment}/>
         ))}
         </>
      ) }
    </div>
  )
}

