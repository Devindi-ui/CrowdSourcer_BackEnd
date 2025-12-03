const db = require('../db');
const route = require('../models/route_model');

const routes = {
    createRoute: async(req,res) => {
        try {
            const {route_id, route_name, start_point, end_point, total_stops,
            distance, status} = req.body;
            const [result] = await route.save({route_id, route_name, 
                start_point, end_point, total_stops, distance, status, 
                status_d:1});
            res.status(201).json({msg: 'Route created successfully!', data:result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
}

module.exports = routes;