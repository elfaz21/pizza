const Order = require("../models/ordersModel");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new order
exports.addOrder = async (req, res) => {
  const {
    name,
    customerPhoneNo,
    price,
    toppings,
    pizzaPhoto,
    userId,
    restaurantId,
    status,
    createdAt,
    quantity,
  } = req.body;

  const newOrder = new Order({
    name,
    customerPhoneNo,
    price,
    toppings,
    pizzaPhoto,
    userId,
    restaurantId,
    status,
    createdAt,
    quantity,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an order by ID
exports.editOrder = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
