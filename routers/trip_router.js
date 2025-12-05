const express = require('express');
const trips = require('../controllers/trip_controller');
const router = express.Router();

router.post('/create', trips.createTrip);
router.get('/all', trips.getAllTrips);
router.get('/find/:id', trips.getTripById);
router.get('/search/:text', trips.getTripByText);
router.put('/update/:id', trips.updateTrip);
router.delete('/delete/:id', trips.deleteTrip);

module.exports = router;