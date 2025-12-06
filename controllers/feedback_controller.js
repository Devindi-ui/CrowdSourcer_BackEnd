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
    },

    getAllFeedbacks: async(req,res) => {
        try {
            const [result] = await feedback.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:'No data found'});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({msg:'Internl Server Error',
                error: error.msg 
            });
        }
    },

    getFeedbackById: async(req,res) => {
        try {
            const [result] = await feedback.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg:'Feedback not found'});
            }
            return res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({msg:'Internal Server Error',
                error: error.message
            });
        }
    },

    getFeedbackByText: async(req,res) => {
        try {
            const [result] = await feedback.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Feedback not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    }
}

module.exports = feedbacks;