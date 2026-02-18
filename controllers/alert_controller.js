const alert = require('../models/alert_model');

const alerts = {

    createAlert: async(req,res) => {
        try {
            const {alert_type, description, bus_number, user_id, avg_passengers} = req.body;

            if (!alert_type || !description || !bus_number || !user_id || !avg_passengers) {
                return res.status(400).json({message: "All fields are required"});
            }

            const [result] = await alert.save({
                alert_type,
                description,
                bus_number,
                user_id,
                avg_passengers,
                status_d: 1
            });

            res.status(201).json({
                msg: "Alert created successfully",
                data: result
            });

        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    },

    getAllAlerts: async(req,res) => {
        try {
            const [result] = await alert.findAll();
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    },

    getAlertById: async(req,res) => {
        try {
            const [result] = await alert.findById(req.params.id);
            if(result.length === 0) {
                return res.status(404).json({msg: "Alert not found"});
            }
            res.status(200).json({data: result[0]});
        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    },

    getAlertByText: async(req,res) => {
        try {
            const [result] = await alert.findByText(req.params.text);
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    },

    updateAlert: async(req,res) => {
        try {
            const {alert_type, description, bus_number, user_id, avg_passengers} = req.body;
            const id = req.params.id;

            const [result] = await alert.update({
                id,
                alert_type,
                description,
                bus_number,
                user_id,
                avg_passengers
            });

            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Alert not found"});
            }

            res.status(200).json({msg: "Alert updated successfully"});

        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    },

    deleteAlert: async(req,res) => {
        try {
            const [result] = await alert.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Alert not found"});
            }
            res.status(200).json({msg:"Alert deleted successfully"});
        } catch (error) {
            res.status(500).json({message:"Server Error", error:error.message});
        }
    }

};

module.exports = alerts;
