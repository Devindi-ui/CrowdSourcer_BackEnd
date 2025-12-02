const express = require('express');
const routeStop = require('../controllers/routeStop_controller');
const router = express.Router();

router.post('/create', routeStop.createRouteStop);
router.get('/all', routeStop.getAllRouteStops);
router.get('/find/:id', routeStop.getRouteStopById);
router.get('/search/:text', routeStop.getRouteStopByText);
router.put('/update/:id', routeStop.updateRouteStop);

module.exports = router;