import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { FaBed } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md"; 

import "swiper/css/bundle";
import Gallery from "../components/Gallery";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();

  const [listing, setListing] = useState(null);
  const [listingError, setListingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const scrollRef = useRef(null);
 

  console.log(listing);
   

  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setListingError(data.message);
          return;
        }

        setListingError(false);
        setListing(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setListingError(error);
      }
    };

    getListing();
  }, []);


  const handleThumbnailClick = (url) => {
    setSelectedImageUrl(url);
  };

  const handleScroll = (offset) => {
    scrollRef.current.scrollLeft += offset;
  };


  return (
    <>
    <div className=" w-full flex justify-center items-start font-semibold">
      {listingError && <p className="">Something Went Wrong!</p>}
      {loading && <p className=" mt-10 text-3xl">Loading...</p>}
      {listing && !listingError && !loading && (
        <Swiper navigation>
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className=" flex flex-col  items-start w-full h-[400px] sm:h-[500px]  "
                style={{
                  background: `url(${url}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              >
                <div className="flex flex-col gap-4 justify-center items-start px-10 pl-10 sm:pl-32 h-[650px] w-full bg-gradient-to-r from-black/80 to-transparent">
                  {listing.type == 'sale' ? <span className=" bg-blue-800 py-2 px-6 text-white">For Sale</span> : listing.type == 'sale' ? <span className=" bg-green-800 py-2 px-6 text-white">Rental</span> : <></>}
                  <h2 className="flex gap-2 items-center font-semibold text-blue-300">
                  <FaLocationDot className=" text-green-200" />
                    {listing.address}
                  </h2>
                  <h1 className=" w-full sm:w-3/5 text-2xl lg:w-2/5 sm:text-3xl lg:text-5xl font-bold text-white opacity-80 ">
                    {listing.name}
                  </h1>
                  <div
                    className="flex justify-center flex-row-reverse
                         items-center"
                  >
                    <h2 className=" text-white text-xl sm:text-3xl ">
                      {" "}
                      <span className=" text-green-200">$</span>
                      {listing.regularPrice}
                    </h2>
                    {listing.regularPrice && (
                      <span className=" text-white text-xl sm:text-3xl">
                        <span className=" text-green-200">$</span>
                        {listing.discountedPrice} /&nbsp;
                      </span>
                    )}
                  </div>
                  <div className=" flex items-center text-white gap-2 text-sm  sm:text-xl "><FaBed className=" text-blue-300 text-lg sm:text-3xl" />{listing.bedrooms} | <GiBathtub className=" text-blue-300 text-lg sm:text-3xl"  />{listing.bathrooms} | <FaParking className=" text-blue-300 text-md sm:text-2xl"/>{listing.parking===true ? 'Parking' : listing.parking===false ? 'No Parking' :''} | <FaChair  className=" text-blue-300 text-md sm:text-2xl" /> {listing.furnished===true ? 'Furnished' : listing.furnished===false ? 'Not Furnished' :''}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      
    </div>
    {listing && !listingError && !loading && (
      <>

      {/* detail section  */}

      <div className="flex justify-center items-center w-full my-20">
    <div className="flex flex-col sm:flex-row justify-center items-start w-3/4 gap-8 ">
          <div className="flex flex-col items-start justify-start w-full sm:w-2/4  ">
            <img
              src={selectedImageUrl || listing.imageUrls[0]}
              alt="Selected"
              className="mb-4 w-full h-auto cursor-pointer object-cover"
            />
            <div className="flex flex-wrap">
              
                
                    {listing.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index}`}
                  className={` w-1/4 cursor-pointer p-2 ${
                    selectedImageUrl === url ? "border-2 border-blue-500 opacity-60" : ""
                  }`}
                  onClick={() => handleThumbnailClick(url)}
                />
              ))}
                
              
              
            </div>

            </div>
            <div className=" flex flex-col items-start justify-start mt-4 w-full sm:w-2/4 gap-4">
            <h3 className="flex gap-2 items-center font-semibold text-slate-700">
                  <FaLocationDot className=" text-green-600" />
                    {listing.address}
                  </h3>
                  

                  <h1 className=" w-full text-2xl  sm:text-xl lg:text-3xl font-bold text-black/90 opacity-80 ">
                    {listing.name}
                  </h1>
                  
                  
              <h2 className="text-xl font-semibold text-gray-800">
                Description
              </h2>
              <p className="text-gray-600">{listing.description}</p>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                Details
              </h2>
              
              <p className="text-gray-600">
                <strong>Bedrooms: </strong>
                {listing.bedrooms}
              </p>
              <p className="text-gray-600">
                <strong>Bathrooms: </strong>
                {listing.bathrooms}
              </p>
              <p className="text-gray-600">
                <strong>Regular Price: </strong>
                ${listing.regularPrice}
              </p>
              <p className="text-gray-600">
                <strong>Discounted Price: </strong>
                ${listing.discountedPrice}
              </p>
              <p className="text-gray-600">
                <strong>Type: </strong>
                {listing.type}
              </p>
              <p className="text-gray-600">
                <strong>Furnished: </strong>
                {listing.furnished===true ? 'Yes ' : listing.furnished===false ? 'Not Furnished' :''}
              </p>
              <p className="text-gray-600">
                <strong>Parking: </strong>
                {listing.parking===true ? 'yes ' : listing.parking===false ? 'No Parking' :''}
              </p>
            </div>
          </div>
          </div>


          {/* detail section end */}

          {/* gallery section  */}

          
          <div className="flex flex-col sm:flex-row justify-center items-center w-full bg-gray-200 py-28 gap-6 ">
            <div className="flex flex-col justify-start items-start w-full sm:w-1/3 px-20 sm:pl-20 sm:pr-0 lg:pl-36  lg:pr-20 gap-4">
                  <h2 className=" text-blue-800 font-bold text-3xl sm:text-2xl lg:text-3xl">Explore</h2>
                  <h1 className=" text-slate-500 font-semibold text-xl sm:text-2l lg:text-3xl ">{listing.name}</h1>
                  {/* <button className="font-bold bg-blue-700 text-white text-sm py-3 px-10 rounded-lg mt-5 shadow-md"  >Contact Agent</button> */}

            </div>
            <div className="flex justify-center items-center w-full  sm:w-2/3 pl-16">
                              {listing && !listingError && !loading && (
                      
                      <div className="flex flex-col"> 
                      <div className="flex gap-3">
                        <button onClick={()=>handleScroll(-300)} className=" p-3 bg-blue-600 rounded-full" ><MdKeyboardArrowLeft className="text-white text-xl lg:text-2xl" /></button>
                        <button onClick={()=>handleScroll(300)} className=" p-3 bg-blue-600 rounded-full" ><MdOutlineKeyboardArrowRight className="text-white text-xl lg:text-2xl" /></button>
                      </div>
                      <div ref={scrollRef} className="flex mt-8 overflow-x-scroll gallery_scroll scroll-smooth">
                        
                        <Gallery imageUrls={listing.imageUrls} />
                        
                        
                      </div>
                      </div>
                    )}
            </div>

          
    </div>
          </>
          )}
   
    
    </>
    
  );
};

export default Listing;
