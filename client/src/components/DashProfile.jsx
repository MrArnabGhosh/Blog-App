import { TextInput,Button } from 'flowbite-react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import {useSelector,useDispatch } from 'react-redux'

import axios from 'axios'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/UserSlice'

export default function DashProfile() {
    const {currentUser}= useSelector(state => state.user)
    const [imageFile,setImageFile]=useState(null)
    const  [imagefileUrl, setimagefileUrl] = useState(null)
    const filePickerRef = useRef()

    const dispatch = useDispatch()
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [updateUserData, setUpdateUserData] = useState({})
    const [updateUserError, setUpdateUserError] = useState(null)
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)


    const handelImageChange =(e) =>{
        const file=e.target.files[0];
        if(file){
          setImageFile(file)
          setimagefileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])

     const uploadImage = async() =>{   //entire job start from here i want to use clouddnary to store image
        try{
            setUploading(true)
            const formData= new FormData
            formData.append('file',imageFile)
            formData.append('upload_preset', 'blog_mern')
            console.log('Starting Cloudinary upload...')
            const cloudinaryResponse  = await axios.post(
                `https://api.cloudinary.com/v1_1/dfh4cnxtf/image/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setUploadProgress(progress)
                        console.log(`Upload progress: ${progress}%`)
                    }
                }
            )
            console.log('Cloudinary response:', cloudinaryResponse.data)
            const { secure_url } = cloudinaryResponse.data
            setUpdateUserData({ ...updateUserData, profilePicture: secure_url })
            setUploading(false)
            setUploadProgress(0)
            setUpdateUserSuccess('Profile image uploaded successfully!')
            

        }
        catch(error){
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
            const response = await axios.put(`/api/user/update/${currentUser._id}`, updateUserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            dispatch(updateUserSuccess(response.data))
            setUpdateUserSuccess('Profile updated successfully!')
            setUpdateUserError(null)
        } catch (error) {
            dispatch(updateUserFailure(error.message))
            setUpdateUserError('Failed to update profile. Please try again.')
        }
    }
    const handleChange = (e) => {
        setUpdateUserData({ ...updateUserData, [e.target.id]: e.target.value })
    }

//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//         <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
//         <form className='flex flex-col gap-4'>
//             <input type="file" accept='image/*' onChange={handelImageChange} ref={filePickerRef} hidden/>
//             <div className=' h-32 w-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={()=>filePickerRef.current.click()}>

//             <img src={imagefileUrl || currentUser.profilePicture} alt="user" className='rounded-full object-cover w-full h-full border-8 border-[lightgray]' />
//             </div>
//             <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
//             <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} />
//             <TextInput type='password' id='password' placeholder='password'/>
//             <Button type='submit' gradientDuoTone='purpleToBlue' outline>
//                     Upadate
//             </Button>
//         </form>
//         <div className='text-red-500 flex justify-between mt-5'>
//             <span className='cursor-pointer'>
//                 Delete Account
//             </span>
//             <span className='cursor-pointer'>
//                 Sign Out
//             </span>
//         </div>
//     </div>
//   )
// }

return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
            
            {updateUserSuccess && (
                <div className='text-green-500 text-center'>{updateUserSuccess}</div>
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
            <span className='cursor-pointer'>
                Delete Account
            </span>
            <span className='cursor-pointer'>
                Sign Out
            </span>
        </div>
    </div>
)
}
