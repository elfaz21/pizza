const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordersController");

// Route to get all orders
router.get("/orders", orderController.getAllOrders);

// Route to add a new order
router.post("/orders", orderController.addOrder);

// Route to get a single order by ID
router.get("/orders/:id", orderController.getOrderById);

// Route to edit an order by ID
router.put("/orders/:id", orderController.editOrder);

// Route to delete an order by ID
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
