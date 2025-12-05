const express = require('express');
const crowdReports = require('../controllers/crowdReport_controller');
const router = express.Router();

router.post('/create', crowdReports.createCrowdReport);
router.get('/all', crowdReports.getAllCrowdReports);
router.get('/find/:id', crowdReports.getCrowdReportById);

module.exports = router;