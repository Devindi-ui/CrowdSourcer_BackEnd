const db = require('../db');
const busAssignment = require('../models/busAssignment_model');

const busAssignments = {
    createBusAssignment: async(req,res) => {
        try {
            const {bus_id, user_id, route_id, assigned_place, 
              assigned_time} = req.body;
            const assigned_date = new Date();
            const [result] = await busAssignment.save({bus_id, user_id, 
                route_id, assigned_place, assigned_date, assigned_time, 
                status:1});
            res.status(201).json({msg: 'Bus Assignment saved successfully!', 
                data: result})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getAllBusAssignments: async(req,res) => {
        try {
            const [result] = await busAssignment.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result});           
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    }
};

module.exports = busAssignments;