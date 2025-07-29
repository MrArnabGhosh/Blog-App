import {TextInput , Select, FileInput, Button} from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
   const [loading, setLoading] = useState(false)


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
            <FileInput type='file' accept='image/*'/>
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
        </div>
       
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