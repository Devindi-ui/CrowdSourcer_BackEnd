const express = require('express');
const auths = require('../controllers/auth_controller');
const router = express.Router();

router.post('/login', auths.createAuth);
router.get('/count', auths.getAuthCount);

module.exports = router;
