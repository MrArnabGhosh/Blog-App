import { Button, Modal, Table, TableBody, TableCell, TableHeadCell, TableRow } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom"


const DashPosts = () => {
      const {currentUser} = useSelector((state)=>state.user)
      const [userPosts, setUserPosts] = useState([])
      const [showMore,setShowMore] = useState(true)
      const [showModal,setShowModal] = useState(false)
      const [postIdToDelete, setPostIdToDelete] = useState('')

  useEffect(()=>{ 
    const fetchPosts = async()=>{
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
          const data = await res.json()
          if(res.ok){
            setUserPosts(data.posts)
            if(data.length<9){
              setShowMore(false)
            }
          }
        } catch (error) {
          console.log(error.message)
        }
    }
    if(currentUser.isAdmin){
      fetchPosts()
    }
  },[currentUser._id])

  
  const handelShowMore = async()=>{
      const startIndex = userPosts.length
      try {
        const res = await  fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
        const data = await res.json()
        if(res.ok){
          setUserPosts((prev)=>[...prev,...data.post])
          if(data.post.length<9){
            setShowMore(false)
          }
        }

      } catch (error) {
        console.log(error);
        
      }
  }
  const handleDeletepost = async()=>{
    setShowModal(false)
    try {
       const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
        method:'DELETE',
        }
      );
      const data= await res.json()
       if(!res.ok){
        console.log(data.message);
       }else{
        setUserPosts((prev)=>
         prev.filter((post)=>post._id!==postIdToDelete)
        )
       }
    } catch (error) {
      console.log(error.message); 
    }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300  dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length>0 ?(
        <>
            <Table hoverable className="shadow-md">
                <Table.Head>
                  <TableHeadCell>Date Updated</TableHeadCell>
                  <TableHeadCell>post image</TableHeadCell>
                  <TableHeadCell>post title</TableHeadCell>
                  <TableHeadCell>category</TableHeadCell>
                  <TableHeadCell>delete</TableHeadCell>
                  <TableHeadCell>
                    <span>edit</span>
                  </TableHeadCell>
                </Table.Head>
                {userPosts.map((post)=>(
                  <TableBody className="divide-y" key={post._id}>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {post.category}
                    </TableCell>
                    <TableCell>
                      <span onClick={()=>{
                        setShowModal(true)
                        setPostIdToDelete(post._id)
                      }} className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                    </TableCell>
                    <TableCell>
                      <Link className="text-teal-500 hover:cursor-pointer" to={`update-post/${post._id}`}>
                      <span>Edit</span>
                      </Link>
                    </TableCell>
                    </TableRow>
                    
                  </TableBody>
                ) )}
            </Table>
            {
              showMore &&(
                <button onClick={handelShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                    Show more
                </button>
              )
            }
        </>
      ):(
        <p>you heve no post yet !</p>
      )}
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
                      <Modal.Header/>
                      <Modal.Body>
                          <div className="text-center">
                              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
                              <h3 className='mb-5 lext-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post</h3>
                              <div className='flex justify-center gap-4 '>
                                  <Button color='failure' onClick={handleDeletepost}>Yes,I Am sure</Button>
                                  <Button color='gray' onClick={()=>setShowModal(false)}>No,cancel</Button>
                              </div>
                          </div>
                      </Modal.Body>
                  </Modal>
    </div>
  )
}

export default DashPosts