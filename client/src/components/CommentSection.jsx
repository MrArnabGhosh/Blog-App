import { Button, Textarea } from 'flowbite-react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state=>state.user)
    const [comment, setComment] = useState('')
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
        <form className='border border-teal-500 p-3 rounded-md'>
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
        </form>
      )}
    </div>
  )
}
