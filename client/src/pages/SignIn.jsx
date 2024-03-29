import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { signInStart , signInSuccess , signInFailure } from '../redux/user/user.slice.js'
import OAuth from '../components/OAuth.jsx'



const SignIn = () => {

  const [formData , setFormData] = useState({})
  // const [loading , setLoading] = useState(false)
  // const [error , setError] = useState(null)
  const [success , setSuccess] = useState(false)
  const {loading , error  } = useSelector((state) => state.user)
  const dispatch = useDispatch()
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
      dispatch(signInStart())
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
      // setLoading(false)
      // setError(data.message)
      setSuccess(false)
      dispatch(signInFailure(data.message))
      return
    }
    
    // setError(null)
    setSuccess(true)
    dispatch(signInSuccess(data))
    const navigationTime = setTimeout(()=>{
      navigate('/')
      setSuccess(false)
    } , 1000)

    } catch (error) {
      // setLoading(false)
      // setError(error.message)
      // setSuccess(false)
      dispatch(signInFailure(error.message))
    }
    

  }


  return (
    <div className=' mx-auto max-w-lg p-9'>
      
      <h1 className=' font-semibold text-center my-9 text-3xl' >Sign In </h1>
      {error && <p className=' text-red-500 font-medium text-center my-5' >{error}</p> }
      {success ?  <p className=' text-green-500 font-medium text-center my-5'>User Signed in Successfully <br/> Navigating to Home page...</p> : <p></p>}
      <form autoComplete='off' onSubmit={handleSubmit} action="" className='flex flex-col gap-5'>
        
        <input type="email" name="email" id="email" placeholder='email' className=' border p-2 rounded-lg  outline-slate-300' onChange={handleChange} required autoComplete='off' />
        <input type="password" name="password" id="password" placeholder='password' className=' border p-2 rounded-lg  outline-slate-300' onChange={handleChange} required autoComplete='off'/>
        <button disabled={loading} className=' bg-slate-800 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-70 uppercase font-medium '>
          {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth/>
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