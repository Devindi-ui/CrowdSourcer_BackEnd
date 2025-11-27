const db = require('../db');
const bus = require('../models/bus_model');

const buses = {
    createBus: async(req,res) => {
        try {
            const {bus_number, seat_capacity, route_id, bus_type_id, status} = req.body;
            const [result] = await bus.save({bus_number, seat_capacity, 
                route_id, bus_type_id, status, status_d:1
            });
            res.status(201).json({message: 'Bus added successfully!!', data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    }
}

module.exports = buses;