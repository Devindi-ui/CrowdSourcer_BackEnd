const db = require('../db');
const auth = require('../models/auth_model');

const auths = {
    createAuth: async(req,res) => {
        try {
            const {email, password} = req.body;

            //Check existing user first 
            const [users] = await db.query(
                `SELECT * FROM user WHERE email = ? AND password = ?`,
                [email, password] 
            );

            //User not found 
            if (users.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const user = users[0];

            //Block deleted users 
            if (user.status_d === 0) {
                return res.status(403).json({
                    message: "Account deleted / deactivated"
                });
            }

            //Allow Login & Insert 
            const [result] = await auth.save({
                email, 
                password, 
                status_d:1
            });

            res.status(201).json({
                msg: 'Logged in successfully!', 
                user: {
                    user_id: user.user_id,
                    email: user.email,
                    status_d: user.status_d
                },
                token: "dummy-token"
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error', 
                error: error.message
            });
        }
    },

    getAuthCount: async(req,res) => {
        try {
            const [[result]] = await auth.countAll();
            res.status(200).json({total: result.total});
        } catch (error) {
            res.status(500).json({
                message: "Server Error", 
                error: error.message
            });
        }
    }
};

module.exports = auths;