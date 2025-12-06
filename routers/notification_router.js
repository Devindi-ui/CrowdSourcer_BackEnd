const express = require('express');
const notifications = require('../controllers/notification_controller');
const router = express.Router();

router.post('/create', notifications.createNotification);
router.get('/all', notifications.getAllNotifications);

module.exports = router;