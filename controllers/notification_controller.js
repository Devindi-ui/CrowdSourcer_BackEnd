const db = require('../db');
const notification = require('../models/notification_model');

const notifications = {
    createNotification: async(req,res) => {
        try {
            const {user_id, bus_id, message} = req.body;
            const [result] = await notification.save({user_id, bus_id,
                message, status:1
            });
            res.status(201).json({msg: 'Notification saved successfully!', 
                data: req.body})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getAllNotifications: async(req,res) => {
        try {
            const [result] = await notification.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result});           
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getNotificationById: async(req,res) => {
        try {
            const [result] = await notification.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: "Notification not found"});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    getNotificationByText: async(req,res) => {
        try {
            const [result] = await notification.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Notification not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    updateNotification: async(req,res) => {
        try {
            const {user_id, bus_id, message} = req.body;
            const id = req.params.id;
            const [result] = await notification.update({user_id, bus_id,
                message, id
            });
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Notification not found"});
            }
            res.status(200).json({msg: "Notification updated successfully!",
                result:req.body
            });
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    }
};

module.exports = notifications;