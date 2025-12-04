const db = require('../db');
const alert = require('../models/alert_model');

const alerts = {
    createAlert: async(req,res) => {
        try {
            const {created_by, alert_type, description, status, bus_id, 
                  user_id} = req.body;
            const enrollment_date = new Date();
            const [result] = await alert.save({created_by, alert_type, 
                            description, status, bus_id, user_id, status_d:1
            });
            res.status(201).json({msg: 'Alert save successfully!!', 
                data:result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getAllALerts: async(req,res) => {
        try {
            const [result] = await alert.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result}); 
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getAlertById: async(req,res) => {
        try {
            const [result] = await alert.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: "Alert not found"});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getAlertByText: async(req,res) => {
        try {
            const [result] = await alert.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Alert not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    updateAlert: async(req,res) => {
        try {
            const {created_by, alert_type, description, bus_id, 
              user_id} = req.body;
            const id = req.params.id;
            const [result] = await alert.update({created_by, alert_type, 
                description, bus_id, user_id, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Alert not found"});
            }
            res.status(200).json({msg: "Alert updated successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    deleteAlert: async(req,res) => {
        try {
            const [result] = await alert.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg: "Alert not found"});
            }
            res.status(200).json({msg: "Alert deleted successfully"});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
};

module.exports = alerts;