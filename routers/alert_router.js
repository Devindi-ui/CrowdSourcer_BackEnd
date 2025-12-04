const express = require('express');
const alerts = require('../controllers/alert_controller');
const router = express.Router();

router.post('/create', alerts.createAlert);

module.exports = router;