const express = require("express");
const router = express.Router();
const currentSituations = require("../controllers/currentSituation_controller");

router.post("/", currentSituations.createCurrentSituation);
router.get("/", currentSituations.getAllCurrentSituations);
router.get("/search/:text", currentSituations.getCurrentSituationByText);
router.get("/:id", currentSituations.getCurrentSituationById);
router.put("/:id", currentSituations.updateCurrentSituation);
router.delete("/:id", currentSituations.deleteCurrentSituation);

module.exports = router;
