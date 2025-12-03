const express = require('express');
const route = require('../controllers/route_controller');
const router = express.Router();

router.post('/create', route.createRoute);

module.exports = router;