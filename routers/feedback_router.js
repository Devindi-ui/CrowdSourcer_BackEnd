const express = require('express');
const feedbacks = require('../controllers/feedback_controller');
const router = express.Router();

router.post('/create', feedbacks.createFeedback);
router.get('/all', feedbacks.getAllFeedbacks);
router.get('/find/:id', feedbacks.getFeedbackById);
router.get('/search/:text', feedbacks.getFeedbackByText);
router.put('/update/:id', feedbacks.updateFeedback);
router.delete('/delete/:id', feedbacks.deleteFeedback);

module.exports = router;