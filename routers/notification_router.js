const express = require('express');
const notifications = require('../controllers/notification_controller');
const router = express.Router();

router.post('/create', notifications.createNotification);

module.exports = router;