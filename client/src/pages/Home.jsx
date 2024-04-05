import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loadingArray , setLoadingArray] = useState([true, true, true]);
  const [loading, setLoading] = useState(true);
  const [showFade, setShowFade] = useState(false);
  const { ref: rightSpringRef, inView: rightSpringInView } = useInView({
    threshold: 0,
  });
  const { ref: springRef, inView: springInView } = useInView({ threshold: 0 });
  const { ref: springLeftRef, inView: springLeftInView } = useInView({
    threshold: 0,
  });
  const borderRef = useRef();
  console.log("this is springRef", springInView);

  const springs = useSpring({
    from: { x: -100, opacity: 0 },
    to: { x: springInView ? 20 : -100, opacity: springInView ? 1 : 0 },
    config: { duration: 500 },
  });

  const springLeft = useSpring({
    from: { opacity: 0, scale: 0 },
    to: { opacity: springLeftInView ? 1 : 0, scale: springLeftInView ? 1 : 0 },
    config: { duration: 500 },
  });
  const springRight = useSpring({
    from: { x: 100, opacity: 0 },
    to: { x: rightSpringInView ? 0 : 100, opacity: rightSpringInView ? 1 : 0 },
    config: { duration: 500 },
  });

  const [fadeinSpring, fadeinApi] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  }));

  const [borderWidth, borderWidthApi] = useSpring(()=>({
    from: { width: 100 },

    config: { duration: 300 },
  }));

  const hanleDivAnimation = () => {
    setShowFade(true);
    setLoading(false);
    fadeinApi.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    });
  };

  const handleBorderWidthDecrease = () =>{
    borderWidthApi.start({
      from: {
        width: 100,
      },
      to: {
        width: 20,
      },
    })
  }
  const handleBorderWidthIncrease = () =>{
    borderWidthApi.start({
      from: {
        width: 20,
      },
      to: {
        width: 100,
      },
    })
  }

  const { scale } = useSpring({
    from: { scale: 1.5 },
    to: { scale: 1 },
    config: { duration: 3000, easing: (t) => t },
  });

  SwiperCore.use([EffectFade, Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);

        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}

      <div
        ref={springRef}
        className=" flex w-full justify-center items-center py-28 "
      >
        <div className="flex flex-col sm:flex-row justify-center items-center w-10/12 gap-10 sm:gap-10">
          <div className="flex justify-start items-center w-full sm:w-3/5">
            <animated.div
              style={{ ...springs }}
              className="flex flex-col gap-6 "
            >
              <h1 className=" text-white font-bold text-3xl lg:text-6xl">
                Find your next <span className=" text-white/60">perfect</span>
                <br />
                place with ease
              </h1>
              <div className=" text-white/70 text-xs sm:text-sm">
                Real Estate is the best place to find your next perfect place to
                live.
                <br />
                We have a wide range of properties for you to choose from.
              </div>
              <div className="flex gap-1 justify-start items-center">
                <animated.button
                  style={{ ...springLeft }}
                  className=" hover:bg-white hover:text-black transition  text-xs sm:text-sm text-white rounded-full border-2 px-5 py-2 text-center font-bold hover:underline"
                >
                  <Link to={"/search"}>Let's get started...</Link>
                </animated.button>
                <animated.button
                  style={{ ...springLeft }}
                  className=" hover:bg-white hover:text-black transition  text-xs sm:text-sm text-white rounded-full border-2 px-5 py-2 text-center font-bold hover:underline"
                >
                  <Link to={"/search?type=sale"}>sales</Link>
                </animated.button>
                <animated.button
                  style={{ ...springLeft }}
                  className=" hover:bg-white hover:text-black transition  text-xs sm:text-sm text-white rounded-full border-2 px-5 py-2 text-center font-bold hover:underline"
                >
                  <Link to="/search?type=rent">Rental</Link>
                </animated.button>
                <animated.button
                  style={{ ...springLeft }}
                  className=" hover:bg-white hover:text-black transition  text-xs sm:text-sm text-white rounded-full border-2 px-5 py-2 text-center font-bold hover:underline"
                >
                  <Link to="/search?offer=true">Offer</Link>
                </animated.button>
              </div>
            </animated.div>
          </div>
          <animated.div
            style={{ ...springLeft }}
            ref={springLeftRef}
            className="flex flex-col justify-center items-start w-full gap-6 sm:w-2/5"
          >
            <div className=" text-white text-xl sm:text-xl lg:text-3xl">
              Discover a harmonious blend of luxury, sustainability, and modern
              living at Our RealEstate.
            </div>
            <animated.button
              style={{ ...springLeft }}
              className=" hover:bg-black hover:text-white transition  text-xs sm:text-sm bg-white text-black rounded-full border-2 px-10 py-2 text-center font-bold hover:underline"
            >
              About Us
            </animated.button>
          </animated.div>
        </div>
      </div>

      {/* swiper */}
      
      {offerListings &&
        offerListings.length > 0 &&
        offerListings[0].imageUrls[0] && (
          <>
            <img
              className=" hidden"
              src={offerListings[0].imageUrls[0]}
              onLoad={hanleDivAnimation}
            />
             </>
        )}  
            
            {loading ? <div className="flex:1 w-full justify-center items-center text-center"><Skeleton className=" flex:1 align-middle self-center w-4/5 h-96" /> </div> : <></>}
            {showFade && (
              <>
                <animated.div
                  style={{
                    ...fadeinSpring,
                    visibility: showFade ? "visible" : "hidden",
                  }}
                >
                  <Swiper
                    navigation
                    effect="fade"
                    className="flex self-center w-4/5 "
                  >
                    {offerListings.map((listing) => (
                      <SwiperSlide key={listing._id}>
                        <animated.div
                          style={{
                            background: `url(${listing.imageUrls[0]}) center no-repeat`,
                            backgroundSize: "cover",
                            transform: "scale(1)", // Initially set to 1.3
                            // Animation using keyframes
                            transform: scale.interpolate(
                              (scale) => `scale(${scale})`
                            ), // Interpolate scale value
                          }}
                          className="h-[500px] flex justify-start items-start  "
                          key={listing._id}
                        >
                          <div className=" w-full h-full bg-black/40">
                            <h1 className=" w-full sm:w-2/5 text-4xl sm:text-5xl px-5 py-5 font-thin uppercase text-white">
                              Explore the <b>luxury</b> Apartments and{" "}
                              <b>villas</b>
                            </h1>
                          </div>
                        </animated.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </animated.div>
              </>
            )}
         

      <div
        ref={rightSpringRef}
        className=" w-full flex justify-center items-center  py-10"
      >
        <div className="flex flex-col sm:flex-row justify-start  items-start w-5/6 gap-10 sm:gap-10">
          <animated.div
            style={{ ...fadeinSpring }}
            className=" flex justify-start items-start w-full sm:w-1/4"
          >
            <h1 className="text-white font-light text-1xl sm:text-2xl ">
              (About Developer)
            </h1>
          </animated.div>

          <animated.div
            style={{ ...springRight }}
            className="flex flex-col gap-9 justify-start items-start w-full sm:w-3/4 "
          >
            <h1 className=" text-4xl sm:text-6xl font-extralight">
              We craft{" "}
              <span className=" text-white/80 font-bold ">lifestyles</span> that
              resonate with nature.{" "}
            </h1>
            <h2 className=" text-xl sm:text-2xl font-normal">
              Our carefully planned community is a testament to sustainable
              development, offering a unique combination of green living and
              convenience.
            </h2>
            <ol className="flex flex-col gap-8 text-lg sm:text-xl ">
              <li className="flex gap-14">
                <span>01.</span>
                <div className="flex flex-col">
                  <h3>Green living spaces</h3>
                  <p className="text-white/60 font-normal ">
                    Immerse yourself in lush green surroundings with
                    thoughtfully landscaped gardens and parks.
                  </p>
                </div>
              </li>
              <li className="flex gap-14">
                <span>02.</span>
                <div className="flex flex-col">
                  <h3>Smart Homes, Smart Living</h3>
                  <p className="text-white/60 font-normal ">
                    Embrace the future with our state-of-the-art smart home
                    features, allowing you to control your home with the touch
                    of a button..
                  </p>
                </div>
              </li>
            </ol>
            <div onMouseEnter={handleBorderWidthDecrease} onMouseLeave={handleBorderWidthIncrease} className="w-auto">
              <Link>Discover More</Link>
              <animated.div
                ref={borderRef}
                style={{...borderWidth}}
                className="border-b-2 w-full hover:w-3"
              ></animated.div>
            </div>
          </animated.div>
        </div>
      </div>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        
        
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            {offerListings && offerListings.length > 0 ? (
            <div className="flex flex-wrap gap-4">
            
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
             ) : <div className="flex flex-wrap gap-4">
              {loadingArray.map((loading) => (
                <h1>Loading...</h1>
              ))}
              
              </div>}
          </div>
       

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
