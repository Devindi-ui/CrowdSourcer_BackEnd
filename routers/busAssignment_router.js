const express = require('express');
const busAssignments = require('../controllers/busAssignment_controller');
const router = express.Router();

router.post('/create', busAssignments.createBusAssignment);
router.get('/all', busAssignments.getAllBusAssignments);
router.get('/find/:id', busAssignments.getBusAssignmentById);
router.get('/search/:text', busAssignments.getBusAssignmentByText);
router.put('/update/:id', busAssignments.updateBusAssignment);
router.delete('/delete/:id', busAssignments.deleteBusAssignment);

module.exports = router;