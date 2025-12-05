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
     }
};

module.exports = favouriteRoutes;