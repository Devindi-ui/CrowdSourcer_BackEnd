const express = require('express');
const favouriteRoutes = require('../controllers/favouriteRoute_controller');
const router = express.Router();

router.post('/create', favouriteRoutes.createFavouriteRoute);

module.exports = router;