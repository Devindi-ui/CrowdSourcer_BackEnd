const db = require('../db');
const role = require('../models/role_model');

//create role
const roles = {
    createRole: async(req,res) => {
        try {
            const {role_name} = req.body;
            const result = await role.save({role_name, status:1});
            res.status(201).json({message: 'Role created successfully!', data: result});
        } catch (error) {
            res.status(500).json({message: 'Server error', error});
        }
    },

    getAllRoles: async(req, res) => {
        try {
            const [result] = await role.findAll();
            if(result.length === 0){
                return res.status(200).json({msg: 'No data found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getRoleById: async(req,res) => {
        try {
            const [result] = await role.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: 'Role not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getRoleByText: async(req,res) => {
        try {
            const [result] = await role.findByText(req.params.text);
            if(result.length === 0){
                return res.status(200).json({msg: 'Role not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    }
}

module.exports = roles;