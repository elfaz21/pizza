const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  toppings: { type: [String], default: [] },
  pizzaPhoto: { type: String, default: null },
  restaurantName: {
    type: String,
    default: null,
  },
  imageUrl: { type: String, default: null },
  userId: { type: String, default: null },
  restaurantId: { type: String, default: null },
});

const Menu = mongoose.model("menu", menuSchema);

module.exports = Menu;
