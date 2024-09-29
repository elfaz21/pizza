const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  restaurantId: {
    type: String,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  permissions: {
    updateOrderStatus: { type: Boolean, default: false },
    seeCustomers: { type: Boolean, default: false },
    seeOrders: { type: Boolean, default: false },
    createRoles: { type: Boolean, default: false },
    addUsers: { type: Boolean, default: false },
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
