const db = require('../db');
const trip = require('../models/trip_model');

const trips = {
    createTrip: async(req,res) => {
        try {
            const {bus_id, route_id, start_time, end_time, date, 
                  status} = req.body;
            const [result] = await trip.save({bus_id, route_id, start_time, 
                end_time, date, status, status_d:1});
            res.status(201).json({msg: 'Trip saved successfully!', 
                data: result})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getAllTrips: async(req,res) => {
        try {
            const [result] = await trip.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result});           
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getTripById: async(req,res) => {
        try {
            const [result] = await trip.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: "Trip is not found"});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    getTripByText: async(req,res) => {
        try {
            const [result] = await trip.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Trip is not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    updateTrip: async(req,res) => {
        try {
            const {bus_id, route_id, start_time, end_time, date, status} = req.body;
            const id = req.params.id;
            const [result] = await trip.update({bus_id, route_id, start_time, 
                end_time, date, status, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Trip not found"});
            }
            res.status(200).json({msg: "Trip updated successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    deleteTrip: async(req, res) => {
        try {
            const [result] = await trip.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg: "Trip is not found"});
            }
            res.status(200).json({msg: "Trip deleted successfully"});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
};

module.exports = trips;