const express = require('express');
const reportHistories = require('../controllers/reportHistory_controller');
const router = express.Router();

router.post('/create', reportHistories.createReportHistory);

module.exports = router;