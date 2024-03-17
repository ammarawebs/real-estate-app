import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper , SwiperSlide} from'swiper/react'
import SwiperCore from 'swiper'
import { Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {

    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [listingError, setListingError ] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(listing)



    useEffect(()=>{
        const getListing = async () => {
            
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if(data.success === false){
                    setLoading(false)
                    setListingError(data.message)
                    return
                }
                setLoading(false)
                setListingError(false)
                setListing(data)
                
            } catch (error) {
                setLoading(false)
                setListingError(error)
            }
        }

        getListing()
    }, [])

  return (
    <div className=' flex justify-center items-start font-semibold'>
        {listingError && <p className=''>Something Went Wrong!</p>}
        {loading && <p>Loading...</p>}
        {listing && !listingError && !loading && (
            <> 
                <Swiper navigation>
                    {listing.imageUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <img className=' h-[400px] sm:h-[700px] object-cover w-full' src={url} alt='listing' />
                        </SwiperSlide>
                        
                    ))}
                </Swiper>
            </> 
        )}
        
    </div>
  )
}

export default Listing