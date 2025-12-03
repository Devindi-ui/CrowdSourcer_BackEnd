const express = require('express');
const route = require('../controllers/route_controller');
const router = express.Router();

router.post('/create', route.createRoute);
router.get('/all', route.getAllRoute);
router.get('/find/:id', route.getRouteById);
router.get('/search/:text', route.getRouteByText);
router.put('/update/:id', route.updateRoute);

module.exports = router;