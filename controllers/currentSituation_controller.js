const currentSituation = require("../models/currentSituation_model");

const currentSituations = {

    createCurrentSituation: async (req, res) => {
        try {
            const { bus_id, user_id, route_id, current_stop, avg_passengers } = req.body;

            const [result] = await currentSituation.save({
                bus_id,
                user_id,
                route_id,
                current_stop,
                avg_passengers,
                status: 1
            });

            res.status(201).json({
                msg: "Current Situation created successfully",
                data: result
            });

        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

    getAllCurrentSituations: async (req, res) => {
        try {
            const [result] = await currentSituation.findAll();
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

    getCurrentSituationById: async (req, res) => {
        try {
            const [result] = await currentSituation.findById(req.params.id);

            if (result.length === 0)
                return res.status(404).json({ msg: "Not found" });

            res.status(200).json({ data: result[0] });

        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

    getCurrentSituationByText: async (req, res) => {
        try {
            const [result] = await currentSituation.findByText(req.params.text);
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

    updateCurrentSituation: async (req, res) => {
        try {
            const { bus_id, user_id, route_id, current_stop, avg_passengers } = req.body;
            const cr_id = req.params.id;

            const [result] = await currentSituation.update({
                cr_id,
                bus_id,
                user_id,
                route_id,
                current_stop,
                avg_passengers
            });

            if (result.affectedRows === 0)
                return res.status(404).json({ msg: "Not found" });

            res.status(200).json({ msg: "Updated successfully" });

        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

    deleteCurrentSituation: async (req, res) => {
        try {
            const [result] = await currentSituation.delete(req.params.id);

            if (result.affectedRows === 0)
                return res.status(404).json({ msg: "Not found" });

            res.status(200).json({ msg: "Deleted successfully" });

        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    }
};

module.exports = currentSituations;
