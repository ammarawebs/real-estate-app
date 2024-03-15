import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";





const UpdateListing =()=> {

    const [files, setFiles] = useState([])
    const [formData , setFormData] = useState({
      name : '',
      description: '',
      address: '',
      regularPrice: 50,
      discountedPrice: 0,
      bathrooms: 1,
      bedrooms: 1,
      furnished: false, 
      parking: false,
      type: 'rent',
      offer: false,
      imageUrls : [],
    })
    const [fileUploadError , SetFileUploadError] = useState(false)
    const [uploading , setUploading] = useState(false)
    const [success , setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading , setLoading] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()
    const params = useParams()
    console.log(formData)



    useEffect(()=>{
        const fetchListing = async () => {
            const listingId = params.listingId
            const res = await fetch(`/api/listing/get/${listingId}`)
            const listing = await res.json()
            setFormData(listing)

        }

        fetchListing()
    }, [])
    

    
    const handleImageSubmit = (e)=>{
        if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            const promises = []
            setUploading(true)
            for(let i=0 ; i< files.length ; i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
              setFormData({...formData, imageUrls : formData.imageUrls.concat(urls)})
              SetFileUploadError(false)
              setUploading(false)
            }).catch((error) => {
              SetFileUploadError('Image Upload error (2mb max per image)')
              setUploading(false)
            })
        }else{
          SetFileUploadError('You can only upload 6 images per listing')
          setUploading(false)
        }
    }

    const storeImage = async(file) => {
        return new Promise((resolve, reject) =>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                  console.log(`${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        resolve(downloadUrl)
                }
                
            )
        })
    })
    }

    const handleImageDelete = (index) => {
      setFormData({...formData, imageUrls : formData.imageUrls.filter((_, i) => i!== index)})
    }


    const handleChange = (e) =>{
      if(e.target.id === 'sale' || e.target.id === 'rent'){
        setFormData({...formData, 
            type: e.target.id
        })

        
    }
    if(e.target.id === 'offer' || e.target.id === 'furnished' || e.target.id === 'parking'){
      setFormData({
        ...formData, 
        [e.target.id]: e.target.checked
      })
    }
    if(e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea'){

      setFormData({
       ...formData,
        [e.target.id]: e.target.value
      })
    }
  
  }

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      if (formData.imageUrls.length < 1) {
        setError("You must upload at least one image");
        setLoading(false);
        return
      }
      if (+formData.regularPrice < +formData.discountedPrice) {
        setError("Discounted price must be less than to regular price");
        setLoading(false);
        return 
      }
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        setSuccess(false);
        return
      }
      setSuccess(true);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
      setLoading(false);
    }
  }




  return (
    <main className=" flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 pt-9 w-9/12  ">
        <h1 className="text-center text-3xl font-bold">Update a Listing</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-7"> 
          <div className=" flex flex-col w-full sm:w-2/4 gap-5 my-9 justify-start items-center sm:place-items-end">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="border p-2 rounded-lg  outline-slate-300 font-medium w-full sm:max-w-lg"
              onChange={handleChange}
              value={formData.name}
              required
            />

            <textarea
              placeholder="Description"
              type="textarea"
              id="description"
              className="border p-2 rounded-lg  outline-slate-300 font-medium w-full sm:max-w-lg"
              rows="5"
              onChange={handleChange}
              value={formData.description}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="border p-2 rounded-lg  outline-slate-300 font-medium w-full sm:max-w-lg"
              onChange={handleChange}
              value={formData.address}
              required
            />
            <div className="flex w-full sm:max-w-lg flex-wrap gap-7">
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={formData.type === 'sale'}  />
                <span>Sell</span>
              </div>
              <div className="flex  gap-2 font-semibold  ">
                <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={formData.type === 'rent'} />
                <span>Rent</span>
              </div>
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={formData.parking} />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={formData.furnished} />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={formData.offer} />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex w-full sm:max-w-lg flex-wrap gap-7">
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="1"
                  max="10"
                  id='bedrooms'
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                  onChange={handleChange}
                  value={formData.bedrooms}
                  
                  />
                <span>Beds</span>
              </div>
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="1"
                  max="10"
                  id="bathrooms"
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <span>Bathrooms</span>
              </div>
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="50"
                  max="10000000"
                  id='regularPrice'
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col">
                  <span>Regular Price</span>
                  <span className=" font-normal text-xs">($ / month)</span>
                </div>
              </div>
              { formData.offer && <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  id='discountedPrice'
                  onChange={handleChange}
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col">
                  <span>Discounted Price</span>
                  <span className=" font-normal text-xs">($ / month)</span>
                </div>
              </div>}
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-2/4 gap-4 my-9 justify-start items-start">
            <div className="flex w-full sm:max-w-lg ">
                <span className=" font-bold" >Images: </span>
                <span className=" mx-2"> The First image will be the Cover (max 6)</span>
            </div>
            <div className="flex w-full sm:max-w-lg gap-3 ">
                <input onChange={(e)=>setFiles(e.target.files)} type="file" id='images' accept="image/*" multiple className=" border border-gray-300 p-4 w-2/3 rounded-md" />
                <button type="button" onClick={handleImageSubmit} className=" bg-green-600 cursor-pointer hover:bg-green-700 text-white p-4 w-1/3 rounded-md" >{uploading ? 'Uploading...' : 'Upload'}</button>

            </div>
            <p className=" text-red-600 font-semibold text-sm" >{fileUploadError  && fileUploadError}</p>
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((imageUrl, index) => {
                  return (
                  <div className="flex flex-row justify-between items-center gap-3 w-full sm:max-w-lg border border-gray-300 p-7 rounded-lg" key={index}>
                    <img src={imageUrl} alt="image" className=" w-3/6  h-auto" />
                    <button type="button" onClick={()=>handleImageDelete(index)}  className=" text-red-500 font-semibold cursor-pointer border border-red-500 uppercase h-14 w-28 rounded-md hover:bg-red-600 hover:text-white " >Delete</button>
                  </div>
                )
              })
            }
            <button disabled={uploading || loading} className=" text-center w-full sm:max-w-lg bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-lg disabled:opacity-50">{loading === true && error === false ? 'Creating Lising...' : 'Create a Listing' }</button>
            {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
            {success === true && error === false ?  <div className="text-green-500 text-center font-semibold">Listing Updated successfully</div> : <></>}
          </div>
        </form>
      </div>
    </main>
  );
}

export default UpdateListing;
