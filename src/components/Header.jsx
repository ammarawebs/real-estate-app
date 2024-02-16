import React from 'react'
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <header className=' bg-slate-200 flex align-middle justify-center shadow-md'>
        <div className=' p-5 text-center  flex justify-between w-full sm:w-5/6 items-center '>
            <h1 className=' font-bold text-lg sm:text-3xl'>
                <span className=' text-slate-500'>Real</span>
                <span className=' text-slate-900'>Estate</span>
            </h1>
            <form action="" className=' flex items-center bg-white p-2 rounded-lg'>
              <input type="text" placeholder='Search...' className=' w-36 sm:w-52 rounded-lg bg-transparent' />
              <IoSearch />
            </form>
            <ul className=' flex gap-5 text-sm font-semibold'>
              <Link to={'/'}>
                <li className=' hidden sm:block hover:underline hover:text-slate-500 hover:cursor-pointer'>Home</li>
              </Link>
              <Link to={'/about'}>
                <li className=' hidden sm:block  hover:underline hover:text-slate-500 hover:cursor-pointer '>About</li>
              </Link>
              <Link to={'/sign-in'}>
                <li className=' hover:underline hover:text-slate-500 hover:cursor-pointer'>Sign in</li>
              </Link>
              
              
            </ul>
        </div>
    </header>
  )
}

export default Header