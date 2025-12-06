const db = require('../db');
const favouriteRoute = require('../models/favouriteRoute_model');

const favouriteRoutes = {
     createFavouriteRoute: async(req,res) => {
        try {
            const {user_id, route_id} = req.body;
            const [result] = await favouriteRoute.save({user_id, route_id, 
                status:1});
            res.status(201).json({msg: 'Favourite Route added successfully!', 
                data: result})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
     },

     getAllFavouriteRoutes: async(req,res) => {
        try {
            const [result] = await favouriteRoute.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result});           
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
     },

     getFavouriteRouteById: async(req,res) => {
        try {
            const [result] = await favouriteRoute.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: "Favourite Route not found"});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
     },

     getFavouriteRouteByText: async(req,res) => {
        try {
            const result = await favouriteRoute.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Favourite Route not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
     }
};

module.exports = favouriteRoutes;