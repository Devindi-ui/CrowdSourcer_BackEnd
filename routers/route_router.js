const express = require('express');
const route = require('../controllers/route_controller');
const router = express.Router();

router.post('/create', route.createRoute);
router.get('/all', route.getAllRoute);
router.get('/find/:id', route.getRouteById);

module.exports = router;