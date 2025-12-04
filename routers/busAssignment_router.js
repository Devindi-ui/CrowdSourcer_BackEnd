const express = require('express');
const busAssignments = require('../controllers/busAssignment_controller');
const router = express.Router();

router.post('/create', busAssignments.createBusAssignment);

module.exports = router;