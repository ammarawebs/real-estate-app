import React from 'react'
import {Link} from 'react-router-dom'



const SignUp = () => {
  return (
    <div className=' mx-auto max-w-lg p-9'>
      <h1 className=' font-semibold text-center my-9 text-3xl' >Sign Up </h1>
      <form action="" className='flex flex-col gap-5'>
        <input type="text" name="username" id="username" placeholder='username' className=' border p-2 rounded-lg  outline-slate-300' />
        <input type="email" name="email" id="email" placeholder='email' className=' border p-2 rounded-lg  outline-slate-300' />
        <input type="password" name="password" id="password" placeholder='password' className=' border p-2 rounded-lg  outline-slate-300' />
        <button className=' bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-70 '>Sign Up</button>
      </form>
      <div className='flex gap-3 py-4'>
        <p className=' font-medium '>Already have an account?</p>
        <Link to={'/sign-in'}>
        <span className=' font-medium  text-blue-700'>Sign in</span>
        </Link>
        
      </div>
    </div>
  )
}

export default SignUp