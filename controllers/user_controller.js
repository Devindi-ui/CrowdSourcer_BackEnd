const role = require('../models/role_model');
const user = require('../models/user_model');

// create user
const users = {
    createUser: async(req,res) => {
        try {
            const {name, email, password, phone, role_name} = req.body;

            //get role_id by role_name
            const role_id = await role.getRoleIdByName(role_name);

            //save user with role_id
            const [result] = await user.save({name,email,password,phone,role_id,status_d:1});

            if (result.affectedRows === 1){
                res.status(201).json({
                    success: true,
                    msg:`User created successfully!!`, 
                    data:req.body
                });       
            } else {
                res.status(400).json({
                    msg:`User created fail`, 
                    error: error.message
                });
            }

        } catch (error) {
            console.error("User creating error: ", error);
            
            res.status(500).json({error: error.message});
        }
    },

    getAllUsers: async(req,res) => {
        try {
            const [result] = await user.findAll();
            if(result.length === 0){
                res.status(404).json({msg: 'Users not found'});
                return;
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error});
        }
    },

    getUserById: async(req,res) => {
        try {
            const [result] = await user.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: 'User not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getUserByText: async(req,res) => {
        try {
            const [result] = await user.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    updateUser: async(req,res) => {
        try {
            const {name, email, password, phone, role_id} = req.body;
            const id = req.params.id;
            const [result] = await user.update({name, email, password, phone, role_id, id});
            if(result.affectedRows === 0){
                return res.status(404).json({message: "User not found"})
            }
            res.status(200).json({message: "User updated successfully!!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    deleteUser: async(req,res) => {
        try {
            const [result] = await user.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg: "User not found"});
            }
            res.status(200).json({message: "User deleted successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    getUserCount: async(req,res) => {
        try {
            const [[result]] = await user.countAll();
            res.status(200).json({total: result.total});
        } catch (error) {
            res.status(500).json({message: "Server Error", error: error.message});
        }
    }
}

module.exports = users;