const role = require('../models/role_model');

//create role
const roles = {
    createRole: async(req,res) => {
        try {
            const {role_name} = req.body;
            const [result] = await role.save({role_name});
            res.status(201).json({message: 'Role created successfully!', data: result});
        } catch (error) {
            res.status(500).json({message: 'Server error', error});
        }
    }
}

module.exports = roles;