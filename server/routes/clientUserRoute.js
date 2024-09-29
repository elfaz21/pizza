const express = require("express");
const clientUserController = require("../controllers/clientUserController");

const router = express.Router();

// Registration route
router.post("/clients", clientUserController.createUser);
router.post("/logins", clientUserController.loginUser);
router.get("/clients", clientUserController.getAllUsers);
router.get("/clients/:id", clientUserController.getUserById);

module.exports = router;
