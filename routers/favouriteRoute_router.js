const express = require('express');
const favouriteRoutes = require('../controllers/favouriteRoute_controller');
const router = express.Router();

router.post('/create', favouriteRoutes.createFavouriteRoute);
router.get('/all', favouriteRoutes.getAllFavouriteRoutes);
router.get('/find/:id', favouriteRoutes.getFavouriteRouteById);

module.exports = router;