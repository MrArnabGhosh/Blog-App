import { TextInput, Button, Alert, Modal } from 'flowbite-react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { updateUserStart,updateUserSuccess, updateUserFailure } from '../redux/user/UserSlice'
import { deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/UserSlice'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
// Create separate axios instances
// For backend API with credentials
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

// For Cloudinary without credentials
const cloudinaryApi = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/dfh4cnxtf',
    withCredentials: false
});

export default function DashProfile() {
    const { currentUser,error } = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imagefileUrl, setimagefileUrl] = useState(null)
    const filePickerRef = useRef()
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [updateUserData, setUpdateUserData] = useState({})
    const [updateUserError, setUpdateUserError] = useState(null)
    const [updateUserSuccessMsg, setUpdateUserSuccessMsg] = useState(null)
    const handelImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file)
            setimagefileUrl(URL.createObjectURL(file))
        }
    }
    
    useEffect(() => {
        if(imageFile) {
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = async() => {   
        try {
            setUploading(true)
            const formData = new FormData()
            formData.append('file', imageFile)
            formData.append('upload_preset', 'blog_mern')
            
            // Use the cloudinary-specific axios instance
            const cloudinaryResponse = await cloudinaryApi.post(
                '/image/upload',
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setUploadProgress(progress)
                    }
                }
            )
            
            // console.log('Cloudinary response:', cloudinaryResponse.data)
            const { secure_url } = cloudinaryResponse.data
            setUpdateUserData({ ...updateUserData, profilePicture: secure_url })
            setUploading(false)
            setUploadProgress(0)
            setUpdateUserSuccessMsg('Profile image uploaded successfully!')
        }
        catch(error) {
            console.error('Error uploading image:', error)
            setUploading(false)
            setUploadProgress(0)
            setUpdateUserError('Error uploading image. Please try again.')
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(updateUserData).length === 0) {
            setUpdateUserError('No changes made')
            return
        }
        
        try {
            dispatch(updateUserStart())
           
            const response = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(updateUserData)
            });
            
            const data = await response.json()
            if(!response.ok){
                dispatch(updateUserFailure(data.message))
            }
            else{
              dispatch(updateUserSuccess(data))
              setUpdateUserSuccessMsg('Profile updated successfully!')
              setUpdateUserError(null)
            }
        } catch (error) {
            dispatch(updateUserFailure(error.response?.data?.message || 'Update failed'))
            setUpdateUserError(error.response?.data?.message || 'Failed to update profile. Please try again.')
        }
    }
    
    const handleChange = (e) => {
        setUpdateUserData({ ...updateUserData, [e.target.id]: e.target.value })
    }

    const handleDeleteUser = async ()=>{
        setShowModal(false)
        try {
          dispatch(deleteUserStart())
          const res= await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`,{
            method:'DELETE',
            credentials: 'include',
          }) 
          const data= await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(data.message))
          } else{
            dispatch(deleteUserSuccess(data))
          }
        } catch (error) {
           dispatch(deleteUserFailure(error.message)) 
        }
    } 

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input 
                    type="file" 
                    accept='image/*' 
                    onChange={handelImageChange} 
                    ref={filePickerRef} 
                    hidden
                />
                <div 
                    className='relative h-32 w-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' 
                    onClick={() => filePickerRef.current.click()}
                >
                    <img 
                        src={imagefileUrl || currentUser.profilePicture} 
                        alt="user" 
                        className='rounded-full object-cover w-full h-full border-8 border-[lightgray]' 
                    />
                    {uploading && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white'>
                            {uploadProgress}%
                        </div>
                    )}
                </div>
                
                {updateUserSuccessMsg && (
                    <div className='text-green-500 text-center'>{updateUserSuccessMsg}</div>
                )}
                
                {updateUserError && (
                    <div className='text-red-500 text-center'>{updateUserError}</div>
                )}
                
                <TextInput 
                    type='text' 
                    id='username' 
                    placeholder='username' 
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput 
                    type='text' 
                    id='email' 
                    placeholder='email' 
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput 
                    type='password' 
                    id='password' 
                    placeholder='password'
                    onChange={handleChange}
                />
                <Button 
                    type='submit' 
                    gradientDuoTone='purpleToBlue' 
                    outline
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Update'}
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span onClick={()=>setShowModal(true)} className='cursor-pointer'>
                    Delete Account
                </span>
                <span className='cursor-pointer'>
                    Sign Out
                </span>
            </div>
                {updateUserSuccessMsg && (
                    <Alert color='success' className='mt-5'>
                        {updateUserSuccessMsg}
                    </Alert>
                )}
                {updateUserError && (
                    <Alert color='failure' className='mt-5'>
                        {updateUserError}
                    </Alert>
                )}
                 {error && (
                    <Alert color='failure' className='mt-5'>
                        {error}
                    </Alert>
                )}
            <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
                        <h3 className='mb-5 lext-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account </h3>
                        <div className='flex justify-center gap-4 '>
                            <Button color='failure' onClick={handleDeleteUser}>Yes,I Am sure</Button>
                            <Button color='gray' onClick={()=>setShowModal(false)}>No,cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>    
        </div>
    )
}