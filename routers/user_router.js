const express = require('express');
const users = require('../controllers/user_controller');
const router = express.Router();

router.post('/', users.createUser);
router.get('/all', users.getAllUsers);
router.get('/find/:id', users.getUserById);
router.get('/search/:text', users.getUserByText);
router.put('/update/:id', users.updateUser);
router.delete('/delete/:id', users.deleteUser);
router.get("/count", users.getUserCount);

module.exports = router;         