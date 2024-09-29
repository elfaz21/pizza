const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customerPhoneNo: { type: String, required: true },
  price: { type: Number, required: true },
  toppings: { type: [String], default: [] },
  pizzaPhoto: { type: String, default: null },
  userId: { type: String, default: null },
  restaurantId: { type: String, default: null },
  status: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now }, // Use Date type with default to now
});

const Order = mongoose.model("order", ordersSchema);

module.exports = Order;
