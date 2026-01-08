const db = require('../db');
const auth = require('../models/auth_model');

const auths = {
    createAuth: async(req,res) => {
        try {
            const {email, password} = req.body;
            const [result] = await auth.save({email, password});
            res.status(201).json({msg: 'Logged in successfully!', 
                data: result})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    }
}

module.exports = auths;