const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/booked", bookController.createAppointment);
router.get("/booked", bookController.getAllAppointments);
router.get("/booked/:id", bookController.getAppointment);
router.put("/booked/:id", bookController.updateAppointment);
router.delete("/booked/:id", bookController.deleteAppointment);

module.exports = router;
