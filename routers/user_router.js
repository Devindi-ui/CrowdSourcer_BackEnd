const express = require('express');
const users = require('../controllers/user_controller');
const router = express.Router();

router.post('/create', users.createUser);
router.get('/all', users.getAllUsers);
router.get('/find/:id', users.getUserById);
router.get('/search/:text', users.getUserByText);

module.exports = router;         