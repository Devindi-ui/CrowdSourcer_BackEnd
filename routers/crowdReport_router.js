const express = require('express');
const crowdReports = require('../controllers/crowdReport_controller');
const router = express.Router();

router.post('/create', crowdReports.createCrowdReport);

module.exports = router;