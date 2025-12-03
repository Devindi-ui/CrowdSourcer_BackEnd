const express = require('express');
const buses = require('../controllers/bus_controller');
const router = express.Router();

router.post('/create', buses.createBus);
router.get('/all', buses.getAllBuses);

module.exports = router;