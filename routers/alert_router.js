const express = require('express');
const alerts = require('../controllers/alert_controller');
const router = express.Router();

router.post('/create', alerts.createAlert);
router.get('/all', alerts.getAllAlerts);
router.get('/find/:id', alerts.getAlertById);
router.get('/search/:text', alerts.getAlertByText);
router.put('/update/:id', alerts.updateAlert);
router.delete('/delete/:id', alerts.deleteAlert);
// router.get('/count', alerts.getAlertCount);

module.exports = router;