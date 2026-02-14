const busAssignment = require('../models/busAssignment_model');

const busAssignments = {

    /* 🔥 ACCEPT assigned_date FROM FRONTEND */
    createBusAssignment: async (req, res) => {
        try {
            const {
                bus_id,
                user_id,
                route_id,
                assigned_place,
                assigned_date,
                assigned_time
            } = req.body;

            const [result] = await busAssignment.save({
                bus_id,
                user_id,
                route_id,
                assigned_place,
                assigned_date,
                assigned_time,
                status: 1
            });

            res.status(201).json({
                msg: "Bus Assignment saved successfully!",
                data: result
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    getAllBusAssignments: async (req, res) => {
        try {
            const [result] = await busAssignment.findAll();

            if (result.length === 0) {
                return res.status(200).json({ data: [] });
            }

            res.status(200).json({ data: result });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    /* 🔥 RETURN SINGLE OBJECT */
    getBusAssignmentById: async (req, res) => {
        try {
            const [result] = await busAssignment.findById(req.params.id);

            if (result.length === 0) {
                return res.status(404).json({
                    msg: "Bus Assignment not found"
                });
            }

            res.status(200).json({
                data: result[0]
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    getBusAssignmentByText: async (req, res) => {
        try {
            const [result] = await busAssignment.findByText(req.params.text);

            res.status(200).json({
                data: result
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    updateBusAssignment: async (req, res) => {
        try {
            const {
                bus_id,
                user_id,
                route_id,
                assigned_place,
                assigned_date,
                assigned_time
            } = req.body;

            const id = req.params.id;

            const [result] = await busAssignment.update({
                id,
                bus_id,
                user_id,
                route_id,
                assigned_place,
                assigned_date,
                assigned_time
            });

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "Bus Assignment not found"
                });
            }

            res.status(200).json({
                msg: "Bus Assignment updated successfully!"
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    deleteBusAssignment: async (req, res) => {
        try {
            const [result] = await busAssignment.delete(req.params.id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "Bus Assignment not found"
                });
            }

            res.status(200).json({
                msg: "Bus Assignment deleted successfully"
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
};

module.exports = busAssignments;
