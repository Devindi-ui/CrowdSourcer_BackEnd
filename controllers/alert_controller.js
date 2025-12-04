const db = require('../db');
const alert = require('../models/alert_model');

const alerts = {
    createAlert: async(req,res) => {
        try {
            const {created_by, alert_type, description, status, bus_id, 
                  user_id} = req.body;
            const [result] = await alert.save({created_by, alert_type, 
                            description, status, bus_id, user_id, status_d:1
            });
            res.status(201).json({msg: 'Alert save successfully!!', 
                data:result});
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
}

module.exports = alerts;