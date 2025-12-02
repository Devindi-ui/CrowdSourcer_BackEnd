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
    },

    getRouteStopById: async(req,res) => {
        try {
            const [result] = await routeStop.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: 'Route Stop not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getRouteStopByText: async(req, res) => {
        try {
            const [result] = await routeStop.findByText(req.params.text);
            console.log();
            
            if(result.length === 0){
                return res.status(404).json({msg: 'Route Stop not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    updateRouteStop: async (req, res) => {
        try {
            const {stop_name} = req.body;
            const id = req.params.id;
            const [result] = await routeStop.update({stop_name, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg: 'Route Stop not found'});
            }
            res.status(200).json({msg: 'Route Stop updated successfully!!'});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    deleteRouteStop: async(req, res) => {
        try {
            const [result] = await routeStop.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg: 'Route Stop not found'});
            }
            res.status(200).json({msg: 'Route Stop deleted successfully!'});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
}

module.exports = routeStops;