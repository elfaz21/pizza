const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Get all pizzas
router.get("/menu", menuController.getAllPizzas);

// Add a new pizza
router.post("/menu", menuController.addPizza);

router.get("/menu/:id", menuController.getPizzaById);

router.get("/menu/:id", menuController.editPizza);
router.get("/menu/:id", menuController.deletePizza);

module.exports = router;
