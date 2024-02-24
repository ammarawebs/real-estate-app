import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'



const SignIn = () => {

  const [formData , setFormData] = useState({})
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)
  const [success , setSuccess] = useState(false)
  const navigate = useNavigate()


  const handleChange = (e) =>{
    setFormData({
      ...formData, 
      [e.target.id] : e.target.value,
    })
    
  }


  console.log(formData)


  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      setLoading(true)
    const res = await fetch('/api/auth/signin' , 
      {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      }
    )
    const data = await res.json()
    console.log(data)
    if(data.success === false){
      setLoading(false)
      setError(data.message)
      setSuccess(false)
      return
    }
    
    setError(null)
    setSuccess(true)
    const navigationTime = setTimeout(()=>{
      navigate('/')
      setSuccess(false)
      setLoading(false)
    } , 1000)

    } catch (error) {
      setLoading(false)
      setError(error.message)
      setSuccess(false)
    }
    

  }


  return (
    <div className=' mx-auto max-w-lg p-9'>
      {error && <p className=' text-red-500 font-medium' >{error}</p> }
      {success ?  <p className=' text-green-500 font-medium'>User Signed in Successfully <br/> Navigating to Home page...</p> : <p></p>}
      <h1 className=' font-semibold text-center my-9 text-3xl' >Sign In </h1>
      <form autoComplete='off' onSubmit={handleSubmit} action="" className='flex flex-col gap-5'>
        
        <input type="email" name="email" id="email" placeholder='email' className=' border p-2 rounded-lg  outline-slate-300' onChange={handleChange} required autoComplete='off' />
        <input type="password" name="password" id="password" placeholder='password' className=' border p-2 rounded-lg  outline-slate-300' onChange={handleChange} required autoComplete='off'/>
        <button disabled={loading} className=' bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-70 uppercase font-medium '>
          {loading ? 'Loading...' : 'Sign In'}
          </button>
      </form>
      <div className='flex flex-col gap-3 py-4'>
        <div className=' flex gap-3'>
          <p className=' font-medium '>Dont have an account?</p>
          <Link to={'/sign-up'}>
          <span className=' font-medium  text-blue-700'>
            Sign Up
            </span>
          </Link>
        </div>
        
        

        
      </div>
    </div>
  )
}

export default SignIn