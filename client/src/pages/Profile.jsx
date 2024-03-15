import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateUserStart , updateUserSuccess , updateUserFailure , deleteUserFailure, deleteUserStart,deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess} from '../redux/user/user.slice'
import { useDispatch } from 'react-redux'
import { app } from '../firebase'
import { useNavigate , Link } from'react-router-dom'
import { set } from 'mongoose'



const Profile = () => {
  const fileRef = useRef();
  const {currentUser , loading , error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileError, SetFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [success , setSuccess] = useState(false)
  const [showListingError , setShowListingError] = useState(false)
  const [deleteListingError , setDeleteListingError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFilePercentage(progress);
      },
      (error) => {
        SetFileError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData({ ...formData, avatar: url });
        });
      }
    );
  };

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false ){
        dispatch(updateUserFailure(data.message))
        setSuccess(false)
        return  
      }
      dispatch(updateUserSuccess(data))
      setSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
      setSuccess(false)
    }
    
  }


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(
        `/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }

  }

  const handleSignOutUser = async () =>{
    try {

      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = res.json()
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess())
    }catch(error) {
    }
  }

  const handleShowListings = async () => {
    
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if(data.success === false){
        setShowListingError(data.message)
        return
      }
      setShowListingError(false)
      setUserListings(data)
     
    } catch (error) {
      setShowListingError(error)
    }
  }

  const handleDeleteListing = async (id) => {
    try {

      const res = await fetch(`/api/listing/delete/${id}`, 
      {
        method: 'DELETE',
      })
      const data = await res.json()
      if(data.success === false){
        setDeleteListingError(data.message)
        return
      }
      setDeleteListingError(false)
      setUserListings((userListings) =>
        userListings.filter((listing) => listing._id!== id))


      
    } catch (error) {
      setDeleteListingError(error)
    }
  }


  return (
    <div className=" flex justify-center items-center w-full ">
      <div className=" flex flex-col justify-center items-center w-4/5 pt-20 pb-20">
        <h1 className=" font-bold text-3xl">Profile</h1>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          className=" my-7  object-cover  rounded-full w-24 h-24 cursor-pointer "
          src={ formData.avatar || currentUser.avatar}
          alt="user Profile"
        />

        {fileError ? (
          <span className=" font-semibold text-red-700 ">File Upload Error</span>
        ) : filePercentage > 0 && filePercentage < 100 ? (
          <span className=" font-semibold text-blue-700 ">{`Uploading ${filePercentage}%`}</span>
        ) : filePercentage == 100 ? (
          <span className="font-semibold text-green-700 ">
            File Uploaded Successfully
          </span>
        ) : null}

        {error && <p className=' text-red-500 font-medium' >{error}</p> }
        {success ?  <p className=' text-green-500 font-medium'>User Updetad Successfully</p> : <p></p>}

        <form
          autoComplete="off"
          action=""
          className="flex flex-col gap-5 pt-9 w-full sm:max-w-lg  "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            className=" border p-2 rounded-lg  outline-slate-300 font-medium "
            
            autoComplete="off"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={currentUser.email}
            placeholder="email"
            className=" border p-2 rounded-lg  outline-slate-300 font-medium"
            
            autoComplete="off"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className=" border p-2 rounded-lg  outline-slate-300"
            
            autoComplete="off"
            onChange={handleChange}
          />
          <button disabled={loading}  className=" bg-slate-700 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-70 uppercase font-medium ">
            {loading ? 'Loading...' : 'Update'}
          </button>
          <Link to={'/create-listing'} className=" bg-green-700 text-white text-center p-2 rounded-lg hover:opacity-90 disabled:opacity-70 uppercase font-medium ">
            Create Listing
          </Link>
          <div className="flex justify-between text-red-600 font-semibold">
            <span onClick={handleDeleteUser} className=' cursor-pointer'>Delete Account</span>
            <span onClick={handleSignOutUser} className=' cursor-pointer'>Sign Out</span>
          </div>
          <span onClick={handleShowListings} className=" text-center text-green-700 font-semibold cursor-pointer">
            Show Listings
          </span>
          <p className=' text-red-500 , font-semibold'>{showListingError ? showListingError :  '' }</p>
          
        </form>
        {deleteListingError && <p className=' text-red-500 font-medium' >{deleteListingError}</p> }
        {
            userListings && userListings.map((listing) => {
              return(
              <div key={listing._id} className=' flex items-center gap-4 border border-gray-300 rounded-lg p-4 my-3 w-full sm:max-w-3xl shadow-md bg-slate-100' >
                <div className='flex items-center gap-4 w-full'>
                <Link className=' w-1/5 sm:w-1/5 h-10  sm:h-20' to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]} alt="listing Cover" className=' w-full h-full object-cover' />
                </Link>
                <Link className=' w-3/5 sm:w-3/5 ' to={`/listing/${listing._id}`}>
                  <p className=' w-full font-semibold text-md hover:underline truncate'>{listing.name}</p>
                </Link>
                <div className='flex flex-col items-center justify-center  text-sm gap-2 w-1/5 sm:w-1/5'>
                  <button onClick={()=>handleDeleteListing(listing._id)} className=' text-red-600 font-semibold hover:text-red-900'>
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                  <button  className=' text-green-500 font-semibold hover:text-green-700'>
                    Edit
                  </button>
                  </Link>
                  
                </div>
                </div>
                


              </div>
              )
            })
          }
      </div>
    </div>
  );
};

export default Profile