const favouriteRoute = require('../models/favouriteRoute_model');

const favouriteRoutes = {

    // CREATE
    createFavouriteRoute: async (req, res) => {
        try {
            const { user_id, route_id } = req.body;

            if (!user_id || !route_id) {
                return res.status(400).json({
                    msg: "user_id and route_id are required"
                });
            }

            const [result] = await favouriteRoute.save({
                user_id,
                route_id,
                status: 1
            });

            // Return newly inserted row
            const [newRow] = await favouriteRoute.findById(result.insertId);

            res.status(201).json({
                msg: 'Favourite Route added successfully!',
                data: newRow[0]
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },

    // GET ALL
    getAllFavouriteRoutes: async (req, res) => {
        try {
            const [result] = await favouriteRoute.findAll();

            return res.status(200).json({
                data: result || []
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },

    // GET BY ID
    getFavouriteRouteById: async (req, res) => {
        try {
            const id = req.params.id;

            const [result] = await favouriteRoute.findById(id);

            if (result.length === 0) {
                return res.status(404).json({
                    msg: "Favourite Route not found"
                });
            }

            res.status(200).json({
                data: result[0]
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },

    // SEARCH BY TEXT (user_id OR user_name OR route_name)
    getFavouriteRouteByText: async (req, res) => {
        try {
            const text = req.params.text;

            const [result] = await favouriteRoute.findByText(text);

            return res.status(200).json({
                data: result || []
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },

    // UPDATE
    updateFavouriteRoute: async (req, res) => {
        try {
            const id = req.params.id;
            const { user_id, route_id } = req.body;

            if (!user_id || !route_id) {
                return res.status(400).json({
                    msg: "user_id and route_id are required"
                });
            }

            const [result] = await favouriteRoute.update({
                id,
                user_id,
                route_id
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "Favourite Route not found"
                });
            }

            // Return updated row
            const [updated] = await favouriteRoute.findById(id);

            res.status(200).json({
                msg: "Favourite Route updated successfully!",
                data: updated[0]
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },

    // SOFT DELETE
    deleteFavouriteRoute: async (req, res) => {
        try {
            const id = req.params.id;

            const [result] = await favouriteRoute.delete(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "Favourite Route not found"
                });
            }

            res.status(200).json({
                msg: "Favourite Route deleted successfully"
            });

        } catch (error) {
            res.status(500).json({
                message: 'Server Error',
                error: error.message
            });
        }
    }
};

module.exports = favouriteRoutes;
