const db = require('../db');
const feedback = require('../models/feedback_model');

const feedbacks = {
    createFeedback: async(req,res) => {
        try {
            const {user_id, bus_id, comment, rating} = req.body;
            const [data] = await feedback.save({user_id, bus_id, comment, 
                rating, status:1
            });
            res.status(201).json({msg: 'Feedback saved successfully!!', 
                data: req.body});
        } catch (error) {
            res.status(500).json({msg: 'Internal Server Error', 
                error:error.message});
        }
    }
}

module.exports = feedbacks;