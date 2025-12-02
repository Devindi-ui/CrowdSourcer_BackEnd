const express = require('express');
const routeStop = require('../controllers/routeStop_controller');
const router = express.Router();

router.post('/create', routeStop.createRouteStop);
router.get('/all', routeStop.getAllRouteStops);

module.exports = router;