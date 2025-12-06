const express = require('express');
const feedbacks = require('../controllers/feedback_controller');
const router = express.Router();

router.post('/create', feedbacks.createFeedback);
router.get('/all', feedbacks.getAllFeedbacks);

module.exports = router;