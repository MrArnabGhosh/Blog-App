import { Footer, FooterCopyright, FooterDivider, FooterIcon } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin} from 'react-icons/bs'

export default function FooterCom() {
  return <Footer className=' border border-t-8 border-teal-500 m-1' >
    <div className=" w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 pt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Daily</span>
            Blog
            </Link>
            </div>
                <div className='grid grid-cols-2 gap-8 sm: mt-4 sm: grid-cols-3 sm:gap-6' >
                    <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                                <Footer.Link 
                                    href='https://tailwindcss.com/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                   Tailwind Css
                                </Footer.Link>
                                <Footer.Link 
                                    href='https://react.dev/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                   ReactJs
                                </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='follow us' />
                        <Footer.LinkGroup col>
                                <Footer.Link 
                                    href='https://github.com/MrArnabGhosh/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                   Github
                                </Footer.Link>
                                <Footer.Link 
                                    href='#'
                                >
                                   Discord
                                </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                                <Footer.Link 
                                    href='#'
                                >
                                   Privecy Policy
                                </Footer.Link>
                                <Footer.Link 
                                    href='#'
                                >
                                   Terms &amp; Condition
                                </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
        </div>
        <FooterDivider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href='#' by='Daily Blog' year={new Date().getFullYear()}/>
            <div className="flex gap-6 mb-1 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={BsInstagram}/>
                <Footer.Icon href='#' icon={BsGithub}/>
                <Footer.Icon href='#' icon={BsLinkedin}/>
            </div>
        </div>
    </div>
  </Footer>
  
}
