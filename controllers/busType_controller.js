const db = require('../db');
const busType = require('../models/busType_model');

const busTypes = {
    createBusType: async(req,res) => {
        try {
            const {type_name, description} = req.body;
            const [result] = await busType.save({type_name, description,
                status:1
            });
            res.status(201).json({msg: 'Bus-Type Created successfully!', data: result});
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    }
}

module.exports = busTypes;