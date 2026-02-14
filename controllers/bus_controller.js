const db = require('../db');
const bus = require('../models/bus_model');

const buses = {
    createBus: async(req,res) => {
        try {
            const {bus_number, seat_capacity, route_id, status} = req.body;
            const [result] = await bus.save({bus_number, seat_capacity, 
                route_id, status, status_d:1
            });
            res.status(201).json({message: 'Bus added successfully!!', data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    getAllBuses: async(req,res) => {
        try {
            const [result] = await bus.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:'No data fouund'});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getBusById: async (req, res) => {
        try {

            const id = req.params.id;

            const [result] = await bus.findById(id);

            if (!result || result.length === 0) {
                return res.status(404).json({
                    msg: "Bus not found"
                });
            }

            res.status(200).json({
                data: result[0]
            });

        } catch (error) {
            console.error("GET BUS ERROR:", error); // 🔥 ADD THIS
            res.status(500).json({
                message: "Server Error",
                error: error.message
            });
        }
    },

    getBusByText: async(req,res) => {
        try {
            const [result] = await bus.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg:'Bus not found'});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    updateBus: async(req,res) => {
        try {
            const {bus_number, seat_capacity, route_id, status} = req.body;
            const id = req.params.id;
            const [result] = await bus.update({bus_number, seat_capacity, 
                            route_id, status, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg:'Bus not found'});
            }
            res.status(200).json({msg:'Bus updated successfully!'});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    deleteBus: async(req,res) => {
        try {
            const [result] = await bus.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg:'Bus not found'});
            }
            res.status(200).json({msg:'Bus deleted successfully!'});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getBusCount: async(req,res) => {
        try {
            const [[result]] = await bus.countAll();
            res.status(200).json({total: result.total});
        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    }
}

module.exports = buses;