const express = require('express');
const busType = require('../controllers/busType_controller');
const router = express.Router();

router.post('/create', busType.createBusType);
router.get('/all', busType.getAllbusTypes);
router.get('/find/:id', busType.getbusTypeById);
router.get('/search/:text', busType.getbusTypeByText);
router.put('/update/:id', busType.updatebusType);
router.delete('/delete/:id', busType.deletebusType);

module.exports = router;