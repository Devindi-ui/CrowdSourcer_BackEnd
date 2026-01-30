const role = require('../models/role_model');
const user = require('../models/user_model');

// create user
const users = {
    createUser: async(req,res) => {
        console.log("req body> ", req.body);
        
        try {
            const {name, email, password, phone, role_name} = req.body;

            if (!role_name) {
                return res.status(400).json({message: "Role is required"});
            }

            //get role_id by role_name
            const role_id = await role.getRoleIdByName(role_name);

            //save user with role_id
            const result = await user.save({
                name,
                email,
                password,
                phone,
                role_id,
                status_d:1
            });

            if (result[0].affectedRows === 1){
                res.status(201).json({
                    success: true,
                    msg:`User created successfully!!`, 
                });       
            } else {
                res.status(400).json({
                    msg:`User created fail`, 
                    error: error.message
                });
            }

        } catch (error) {
            console.error("User creating error: ", error);
            res.status(500).json({message: "Internal Server Error",error: error.message});
        }
    },

    getAllUsers: async(req,res) => {
        try {
            const result = await user.findAll();

            if(result.length === 0){
                res.status(404).json({msg: 'Users not found'});
                return;
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getUserById: async(req,res) => {
        try {
            const result = await user.findById(req.params.id);
            if(!result){
                return res.status(404).json({msg: 'User not found'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Server Error', error: error.message});
        }
    },

    getUserByText: async(req,res) => {
        try {
            const result = await user.findByText(req.params.text);
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
            //log incoming data
            console.log("UPDATE BODY: ", req.body);
            console.log("UPDATE ID: ", req.params.id);
            
            const {name, email, password, phone, role_name} = req.body;
            const id = req.params.id;

            //convert role_name > role_id 
            let role_id = null;

            if (role_name) {
                const roleResult = await role.getRoleIdByName(role_name);

                if (!roleResult || !roleResult.role_id) {
                    return res.status(400).json({
                        message: "Invalid role name",
                        role_name
                    });
                }

                role_id = roleResult.role_id;
            }

            const result = await user.update({
                id,
                name, 
                email, 
                password, 
                phone, 
                role_id
            });

            console.log("UPDATE RESULT: ", result);
            
            if (Array.isArray(result)) {
                affectedRows = result[0];
            } else if (result && result.affectedRows !== undefined) {
                //MySQL style
                affectedRows = result.affectedRows;
            }

            if(affectedRows === 0){
                return res.status(404).json({
                    message: "User not found or no changes made"
                });
            }
            res.status(200).json({message: "User updated successfully!!"});
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error', 
                error: error.message
            });
        }
    },

    deleteUser: async(req,res) => {
        try {
            const result = await user.delete(req.params.id);

            if(result[0].affectedRows === 0){
                return res.status(404).json({msg: "User not found"});
            }

            res.status(200).json({message: "User deleted successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    }
    
}

module.exports = users;