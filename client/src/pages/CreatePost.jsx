import {TextInput , Select, FileInput, Button, Alert} from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
   const [loading, setLoading] = useState(false)
   const [file,setFile] = useState(null)
   const [imagUploadProgress,setImageUploadProgress] = useState(null)
   const [imagUploadError,setImageUploadError] = useState(null)
   const [formData,setFormData] = useState({})


   const handelUploadImage = async () => {
        // Reset previous states
        setImageUploadProgress(null);
        setImageUploadError(null);
        let interval = null;

        try {
            if (!file) {
                setImageUploadError('Please select an image to upload.');
                return;
            }

            // Start the progress simulation
            setImageUploadProgress(0);

            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'blog_mern');

            const cloudName = 'dfh4cnxtf';
            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress >= 90) {
                    clearInterval(interval);
                }
                setImageUploadProgress(progress);
            }, 200);


            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: data,
            });

            clearInterval(interval); // Stop simulation on completion

            if (!res.ok) {
                setImageUploadError('Image upload failed. Please check your Cloudinary settings.');
                setImageUploadProgress(null);
                return;
            }

            const responseData = await res.json();
            const { secure_url } = responseData;

            // Set final progress and update form
            setImageUploadProgress(100);
            setFormData({ ...formData, image: secure_url });

            // Optional: Reset progress bar after a short delay
            setTimeout(() => {
                setImageUploadProgress(null);
            }, 1000);


        } catch (error) {
            clearInterval(interval); // Ensure interval is cleared on error
            setImageUploadError('Image upload failed. Please try again.');
            setImageUploadProgress(null);
            console.error(error);
        }
    };


   const generateContent =  async()=>{

   }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>

     <div className="mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
  <div className="flex items-center justify-center gap-4 rounded-full bg-white px-6 py-1.5 text-sm">
    <p className="text-gray-700">New: AI feature integrated</p>
  </div>
</div>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type='text' placeholder='Title' required id='title' 
              className='flex-1'/>
              <Select>
                <option value="uncategorized">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Startup">Startup</option>
                <option value="Nature">Nature</option>
                <option value="others">Others</option>
              </Select>
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handelUploadImage} disabled={imagUploadProgress !== null}>
              {imagUploadProgress !== null ? (
                <div className='w-16 h-16'>
                  <CircularProgressbar
                   value={imagUploadProgress}
                   text={`${imagUploadProgress || 0} %`}
                  />
                </div>
              ):(
                'Upload Image'
              )}
            </Button>
        </div>
        {imagUploadError &&
           <Alert color='failure'>{imagUploadError}</Alert>
        }

        {formData.image && (
          <img src={formData.image} 
          className='h-72 mb-12'
          required
          />
        )}
       
         <ReactQuill theme='snow'  placeholder='write something...' className='h-72 mb-12' required
        />

        {loading && (
                <div className='absolute right-0 top-0 bottom-0 left-0 flex item-center justify-center bg-black/10 mt-2 '>
                      <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'>

                      </div>
                </div>
              )}
      <Button disabled={loading} type='button' onClick={generateContent} className=' hover:underline cursor-pointer' outline>Generate With AI</Button>
       
      <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
      
    </div>
  )
}

export default CreatePost