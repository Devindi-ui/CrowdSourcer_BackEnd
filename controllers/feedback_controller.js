const feedback = require('../models/feedback_model');

const feedbacks = {

    createFeedback: async (req, res) => {
        try {
            const {user_id, bus_id, comment, rating} = req.body;

            const [data] = await feedback.save({
                user_id,
                bus_id,
                comment,
                rating,
                status: 1
            });

            res.status(201).json({
                msg: 'Feedback saved successfully!',
                data: data
            });

        } catch (error) {
            res.status(500).json({
                msg: 'Internal Server Error',
                error: error.message
            });
        }
    },

    getAllFeedbacks: async (req, res) => {
        try {
            const [result] = await feedback.findAll();
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({
                msg: 'Internal Server Error',
                error: error.message
            });
        }
    },

    getFeedbackById: async (req, res) => {
        try {
            const [result] = await feedback.findById(req.params.id);

            if (result.length === 0) {
                return res.status(404).json({msg: 'Feedback not found'});
            }

            res.status(200).json({data: result[0]});

        } catch (error) {
            res.status(500).json({
                msg: 'Internal Server Error',
                error: error.message
            });
        }
    },

    getFeedbackByText: async (req, res) => {
        try {
            const [result] = await feedback.findByText(req.params.text);
            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({
                msg: 'Internal Server Error',
                error: error.message
            });
        }
    },

    updateFeedback: async (req, res) => {
        try {
            const {user_id, bus_id, comment, rating} = req.body;
            const id = req.params.id;

            const [result] = await feedback.update({
                id,
                user_id,
                bus_id,
                comment,
                rating
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({msg: 'Feedback not found'});
            }

            res.status(200).json({msg: 'Feedback updated successfully!'});

        } catch (error) {
            res.status(500).json({
                msg: 'Internal Server Error',
                error: error.message
            });
        }
    },

    deleteFeedback: async (req, res) => {
        try {
            const [result] = await feedback.delete(req.params.id);

            if (result.affectedRows === 0) {
                return res.status(404).json({msg: 'Feedback not found'});
            }

            res.status(200).json({msg: 'Feedback deleted successfully'});

        } catch (error) {
            res.status(500).json({
                msg: 'Internal Server Error',
                error: error.message
            });
        }
    }
};

module.exports = feedbacks;
