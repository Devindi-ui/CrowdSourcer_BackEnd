const db = require('../db');
const routeStop = require('../models/routeStop_model');

const routeStops = {
    createRouteStop: async(req, res) => {
        try {
            const {stop_name} = req.body;
            const [result] = await routeStop.save({stop_name, status: 1});
            res.status(201).json({msg: 'Route Stop created successfully!!', 
                data:result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getAllRouteStops: async(req,res) => {
        try {
            const [result] = await routeStop.findAll();
            if(result.length === 0){
                return res.status(200).json({msg: 'No data found'});
            }
            res.status(200).json({data:result})
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
}

module.exports = routeStops;