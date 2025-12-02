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
    },

    getAllbusTypes: async(req,res) => {
        try {
            const [result] = await busType.findAll();
            if(result.length === 0){
                return res.status(200).json({msg: 'No data found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    getbusTypeById: async(req,res) => {
        try {
            const [result] = await busType.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: 'Bus Type not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

     getbusTypeByText: async(req,res) => {
        try {
            const [result] = await busType.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: 'Bus Type not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
     },

     updatebusType: async(req,res) => {
        try {
            const {type_name, description} = req.body;
            const id = req.params.id;
            const [result] = await busType.update({type_name, description, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg: 'Bus Type not found'});
            }
            res.status(200).json({msg: 'Bus Type updated successfully!!'});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
     },

     deletebusTyoe: async(req,res) => {
        try {
            const [result] = await busType.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg: "Bus Type not found"});
            }
            res.status(200).json({msg: "Bus Type deleted successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
     }
}

module.exports = busTypes;