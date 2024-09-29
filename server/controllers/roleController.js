const Role = require("../models/roleModel");

// Create a new role
const createRole = async (req, res) => {
  try {
    const { roleName, permissions, restaurantId } = req.body;
    const newRole = new Role({ roleName, permissions, restaurantId });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { roleName, isActive, permissions } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { roleName, isActive, permissions },
      { new: true }
    );
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await Role.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export functions
module.exports = {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
};
