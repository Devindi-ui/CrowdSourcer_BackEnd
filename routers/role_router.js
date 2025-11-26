const express = require('express');
const roles = require('../controllers/role_controller');
const router = express.Router();

router.post('/create', roles.createRole);
router.get('/all', roles.getAllRoles);
router.get('/find/:id', roles.getRoleById);
router.get('/search/:text', roles.getRoleByText);

module.exports = router;