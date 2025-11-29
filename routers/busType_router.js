const express = require('express');
const busType = require('../controllers/busType_controller');
const router = express.Router();

router.post('/create', busType.createBusType);
router.get('/all', busType.getAllbusTypes);

module.exports = router;