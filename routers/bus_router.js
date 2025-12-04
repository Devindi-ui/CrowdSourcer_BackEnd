const express = require('express');
const buses = require('../controllers/bus_controller');
const router = express.Router();

router.post('/create', buses.createBus);
router.get('/all', buses.getAllBuses);
router.get('/find/:id', buses.getBusById);
router.get('/search/:text', buses.getBusByText);
router.put('/update/:id', buses.updateBus);

module.exports = router;