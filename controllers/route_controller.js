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
    },

    getAllRoute: async(req,res) => {
        try {
            const [result] = await route.findAll();
            if(result.length === 0){
                return res.status(200).json({msg: 'No data found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getRouteById: async(req,res) => {
        try {
            const [result] = await route.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: 'Route not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getRouteByText: async(req,res) => {
        try {
            const [result] = await route.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: 'Route not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    updateRoute: async(req,res) => {
        try {
            const {route_name, start_point, end_point, total_stops,
                distance, status} = req.body;
            const id = req.params.id;
            const [result] = await route.update({route_name, start_point, 
                end_point, total_stops, distance, status, id});
            if(result.length === 0){
                return res.status(404).json({msg:'Route not found'});
            }
            res.status(200).json({msg:'Route updated successfully!'});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
}

module.exports = routes;