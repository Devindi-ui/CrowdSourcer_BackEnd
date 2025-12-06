const express = require('express');
const notifications = require('../controllers/notification_controller');
const router = express.Router();

router.post('/create', notifications.createNotification);
router.get('/all', notifications.getAllNotifications);
router.get('/find/:id', notifications.getNotificationById);
router.get('/search/:text', notifications.getNotificationByText);
router.put('/update/:id', notifications.updateNotification);

module.exports = router;