import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const currentUser = useSelector((state=>state.user))
  const [searchTerm , setSearchTerm] = useState('')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)

  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
    
  },[location.search])

  return (
    <header className=' bg-black flex align-middle justify-center shadow-md border-b-2 border-white/15'>
        <div className=' p-5 text-center  flex justify-between w-full sm:w-5/6 items-center '>
            <Link to={'/'} className=' font-bold text-lg sm:text-3xl'>
                <span className=' text-white'>Real</span>
                <span className=' text-gray-300'>Estate</span>
            </Link>
            <form onSubmit={handleSubmit} action="" className=' flex items-center bg-black border-2 border-white/15 p-3 rounded-full'>
              <input value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} type="text" placeholder='Search...' className=' placeholder:text-white/50 text-white w-36 sm:w-52 rounded-lg bg-transparent outline-none' />

              <button >
                <IoSearch className=' text-white text-2xl' />
              </button>
              
            </form>
            <ul className=' flex gap-5 text-white  text-sm font-semibold items-center'>
              <Link to={'/'}>
                <li className=' hidden sm:block hover:underline hover:text-white/50  hover:cursor-pointer'>Home</li>
              </Link>
              <Link to={'/about'}>
                <li className=' hidden sm:block  hover:underline hover:text-white/50 hover:cursor-pointer '>About</li>
              </Link>
              <Link to={'/profile'}>
                {currentUser.currentUser? <img className=' rounded-full w-9 h-9 object-cover'  src={currentUser.currentUser.avatar} alt='profile'/>:
                <li className=' hover:underline hover:text-white/50 hover:cursor-pointer'>Sign in</li>}
              </Link>
              
              
            </ul>
        </div>
    </header>
  )
}

export default Header