import React from "react";

function CreateListing() {
  return (
    <main className=" flex w-full justify-center items-center">
      <div className="flex flex-col gap-5 pt-9 w-9/12  ">
        <h1 className="text-center text-3xl font-bold">Create a Listing</h1>
        <div className="flex flex-col sm:flex-row gap-7"> 
          <div className=" flex flex-col w-full sm:w-2/4 gap-5 my-9 justify-center items-center sm:place-items-end">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="border p-2 rounded-lg  outline-slate-300 font-medium w-full sm:max-w-lg"
            />
            <textarea
              placeholder="Description"
              id="description"
              className="border p-2 rounded-lg  outline-slate-300 font-medium w-full sm:max-w-lg"
              rows="5"
            ></textarea>
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="border p-2 rounded-lg  outline-slate-300 font-medium w-full sm:max-w-lg"
            />
            <div className="flex w-full sm:max-w-lg flex-wrap gap-7">
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="sale" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex  gap-2 font-semibold  ">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="furnished" className="w-5" />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2 font-semibold  ">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex w-full sm:max-w-lg flex-wrap gap-7">
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                />
                <span>Beds</span>
              </div>
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                />
                <span>Bathrooms</span>
              </div>
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="50"
                  max="10000000"
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                />
                <div className="flex flex-col">
                  <span>Regular Price</span>
                  <span className=" font-normal text-xs">($ / month)</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 font-semibold">
                <input
                  type="number"
                  min="50"
                  max="10000000"
                  className="border p-3 rounded-lg  outline-slate-300 font-medium"
                />
                <div className="flex flex-col">
                  <span>Discounted Price</span>
                  <span className=" font-normal text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-2/4 gap-4 my-9 justify-start items-start">
            <div className="flex w-full sm:max-w-lg ">
                <span className=" font-bold" >Images: </span>
                <span className=" mx-2"> The First image will be the Cover (max 6)</span>
            </div>
            <div className="flex w-full sm:max-w-lg gap-3 ">
                <input type="file" id='images' accept="image/*" multiple className=" border border-gray-300 p-4 w-2/3 rounded-md" />
                <button className=" bg-green-600 cursor-pointer hover:bg-green-700 text-white p-4 w-1/3 rounded-md" >Upload</button>

            </div>
            <button className=" text-center w-full sm:max-w-lg bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-lg">Create Listing</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateListing;
