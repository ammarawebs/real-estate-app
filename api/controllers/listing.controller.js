import e from "express";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";



export const createListing = async (req, res, next) => {

    try {

        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
        
    } catch (error) {
        next(error)
    }

}

export const deleteListing = async (req, res, next) => {
    try {

        const listing = await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(404, 'listing not found'));
        if(listing.userRef!== req.user.id) return next(errorHandler(401, 'you can only delete your listing'))
        await Listing.findByIdAndDelete(req.params.id);

        return res.status(200).json('listing has been deleted')
        
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(404, 'listing not found'));
        if(listing.userRef!== req.user.id) return next(errorHandler(401, 'you can only update your listing'))
        await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json('listing has been updated')
    } catch (error) {
        next(error)
    }

}

export const getListing = async (req, res, next) => {
    try {
        const listingData = await Listing.findById(req.params.id);
        if(!listingData) return next(errorHandler(404, 'listing not found'));
        return res.status(200).json(listingData)
        
    } catch (error) {
        next(error)
    }

}

export const getListings = async (req, res, next) => {
    try {
        
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if(offer === 'false' || offer === undefined)  {
            offer = { $in : [false , true]}
        }

        let furnished = req.query.finished;
        if( furnished === 'false' || furnished === undefined )  {
            furnished = { $in : [false , true]}
        }

        let parking = req.query.parking;
        if( parking === 'false' || parking === undefined)  {
            parking = { $in : [false , true]}
        }

        let type = req.query.type;
        if(type === undefined || type === 'all')  {
            type = { $in : ['rent' , 'sale']}
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'cratedAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,

        }).sort({ [sort] : order }).skip(startIndex).limit(limit);

        return res.status(200).json(listings)   

        
    } catch (error) {
        next(error)
    }
    
}
