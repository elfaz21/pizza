const express = require("express");
const {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const router = express.Router();

// Create a new role
router.post("/role", createRole);

// Get all roles
router.get("/role", getRoles);

// Update a role
router.put("/role/:id", updateRole);

// Delete a role
router.delete("/role/:id", deleteRole);

module.exports = router;
