import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import{AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
// import { sign } from 'jsonwebtoken'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/UserSlice'



export default function Header() {
  const navigate = useNavigate()
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state =>state.user)
  const { theme } = useSelector((state)=>state.theme)

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
    <Navbar className='border-b-2 ' >
      <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 pt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Daily</span>
      Blog
      </Link>
      <form >
        <TextInput
        type='text'   
        placeholder='search'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
       />
      </form>
      <Button className='w-12 h-10 lg:hidden'color='gray' pill>
        <AiOutlineSearch />
      </Button>
    <div className="flex gap-2 md:order-2">
      <Button className='w-12 h-10 sm:inline flex justify-center'color='gray' pill onClick={()=>dispatch(toggleTheme())}>
        {theme === 'light' ? <FaMoon/> : <FaSun/>}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon ={false}
              inline
              label = {
                <Avatar 
                alt = 'userAvater'
                img={currentUser.profilePicture}
                rounded
                />
              }          
          >
              <Dropdown.Header>
                <span className='block text-sm' >@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate' >{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handelSignout}>Sign out</Dropdown.Item>
              </Link>
          </Dropdown>
        ):
          (
            <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline  onClick={() => navigate('/signin')} >
              Sign In
            </Button>
            </Link>
          )  
      }
      <NavbarToggle />
    </div>
      <Navbar.Collapse>
        <Navbar.Link active={path==="/"} as={'div'}>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/about"} as={'div'}>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/dasboard"}as={'div'}>
          <Link to='dasboard'>
            Dashboard
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/projects"}as={'div'}>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar  >
  )
}
