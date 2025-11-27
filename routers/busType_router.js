const express = require('express');
const busType = require('../controllers/busType_controller');
const router = express.Router();

router.post('/create', busType.createBusType);

module.exports = router;