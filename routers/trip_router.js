const express = require('express');
const trips = require('../controllers/trip_controller');
const router = express.Router();

router.post('/create', trips.createTrip);
router.get('/all', trips.getAllTrips);
router.get('/find/:id', trips.getTripById);
router.get('/search/:text', trips.getTripByText);

module.exports = router;