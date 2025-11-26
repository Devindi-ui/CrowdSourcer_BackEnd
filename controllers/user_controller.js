const user = require('../models/user_model');

// create user
const users = {
    createUser: async(req,res) => {
        try {
            const {name, email, password, phone, role_id, status} = req.body;
            const [result] = await user.save({name,email,password,phone,role_id,status});
            if(result.affectedRows === 1){
                res.status(201).json({msg:`User created successful!!`, data: result});       
            }else{
                res.status(400).json({msg:`User created fail`});
            }
        } catch (error) {
            res.status(500).json({message: 'Server Error', error});
        }
    },


}

module.exports = users;