const express = require('express');
const reportHistories = require('../controllers/reportHistory_controller');
const router = express.Router();

router.post('/create', reportHistories.createReportHistory);
router.get('/all', reportHistories.getAllReportHistories);
router.get('/find/:id', reportHistories.getReportHistoryById);

module.exports = router;