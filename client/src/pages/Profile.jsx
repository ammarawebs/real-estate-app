import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const currentUser = useSelector((state=>state.user))
  return (
    <div className=' flex justify-center items-center w-full '>
      <div className=' flex flex-col justify-center items-center w-4/5 pt-20 pb-20'>
        <h1 className=' font-bold text-3xl'>Profile</h1>
        <img className=' pt-9 rounded-full w-20 cursor-pointer object-cover' src={currentUser.currentUser.avatar} alt='user Profile'/>

        <form autoComplete='off'  action="" className='flex flex-col gap-5 pt-9 w-full sm:max-w-lg  '>
        <input type="text" name="username" id="username" placeholder='username' className=' border p-2 rounded-lg  outline-slate-300 '  required autoComplete='off'/>
        <input type="email" name="email" id="email" placeholder='email' className=' border p-2 rounded-lg  outline-slate-300'  required autoComplete='off' />
        <input type="password" name="password" id="password" placeholder='password' className=' border p-2 rounded-lg  outline-slate-300'  required autoComplete='off'/>
        <button  className=' bg-slate-700 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-70 uppercase font-medium '>
          Update
          </button>
          <button  className=' bg-green-700 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-70 uppercase font-medium '>
          Create Listing 
          </button>
        <div className='flex justify-between text-red-600 font-semibold'>
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
        <span className=' text-center text-green-600 font-semibold'>Show Listings</span>
      </form>
      </div>
      
    </div>
  )
}

export default Profile