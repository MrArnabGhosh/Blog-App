import  { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiDocumentText, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/UserSlice'
import { useSelector } from 'react-redux'

export default function DashSidebar() {
      const dispatch = useDispatch()
      const location = useLocation()
      const [tab, setTab] = useState('')
      const {currentUser } = useSelector((state=>state.user))
      useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
          setTab(tabFromUrl)
        }
      },[location.search])

  const handelSignout = async()=>{
            try {
                const res = await fetch('/api/user/signout',{
                    method: 'POST'
                })
    
                const data = await res.json()
    
                if(!res.ok){
                    console.log(data.message)
                }else{
                    dispatch(signoutSuccess())
                }
            } catch (error) {
               console.log(error.message) 
            }
}

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin':'User'} lebelcolor='dark' as='div' >
                    Profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && (
                    <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'  lebelcolor='dark'>
                    Post
                </Sidebar.Item>
                </Link>
                )}
                <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handelSignout} >
                    Sign Out 
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
